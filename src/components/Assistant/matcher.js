import { answers } from './answers.js';
import {
  EMBEDDING_THRESHOLDS,
  KEYWORD_THRESHOLDS,
  decide,
  rankByKeywords,
} from './matching.js';

// How long a question waits for the model (e.g. still downloading on a slow
// connection) before it's answered by keyword matching instead. The model
// keeps loading in the background for the next question.
const MODEL_WAIT_MS = 15000;

export function createMatcher() {
  let worker = null;
  let ready = false;
  let failed = typeof Worker === 'undefined';
  let nextId = 0;
  const pending = new Map();

  const giveUp = () => {
    failed = true;
    pending.forEach((resolve) => resolve(null));
    pending.clear();
    worker?.terminate();
  };

  function start() {
    if (worker || failed) return;
    try {
      worker = new Worker(new URL('./matcher.worker.js', import.meta.url), {
        type: 'module',
      });
    } catch {
      failed = true;
      return;
    }
    worker.onmessage = ({ data }) => {
      if (data.type === 'ready') ready = true;
      if (data.type === 'failed') giveUp();
      if (data.type === 'ranked') {
        const resolve = pending.get(data.id);
        pending.delete(data.id);
        resolve?.(data.error ? null : data.ranked);
      }
    };
    worker.onerror = giveUp;
    worker.postMessage({ type: 'load' });
  }

  function rankWithModel(text) {
    start();
    if (failed) return Promise.resolve(null);
    const id = nextId++;
    return new Promise((resolve) => {
      pending.set(id, resolve);
      worker.postMessage({ type: 'rank', id, text });
      setTimeout(() => {
        if (pending.delete(id)) resolve(null);
      }, MODEL_WAIT_MS);
    });
  }

  async function match(text) {
    const ranked = await rankWithModel(text);
    return ranked
      ? decide(text, ranked, EMBEDDING_THRESHOLDS)
      : decide(text, rankByKeywords(text, answers), KEYWORD_THRESHOLDS);
  }

  return {
    start,
    match,
    isReady: () => ready || failed,
    dispose: () => worker?.terminate(),
  };
}
