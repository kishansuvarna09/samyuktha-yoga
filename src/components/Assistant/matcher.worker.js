// Runs the embedding model off the main thread so the page stays smooth
// while it downloads (~23 MB, cached by the browser after the first visit).
import { env, pipeline } from '@huggingface/transformers';
import index from './answers.index.json';
import { MODEL_ID, MODEL_DTYPE, decodeIndex, rankByEmbedding } from './matching.js';

env.allowLocalModels = false;

// Use the CPU-only WASM runtime (~3 MB download) instead of the default
// WebGPU-capable build (~5.5 MB); a model this small doesn't need the GPU.
const ortVersion = env.backends.onnx.versions?.web;
if (ortVersion) {
  const base = `https://cdn.jsdelivr.net/npm/onnxruntime-web@${ortVersion}/dist/ort-wasm-simd-threaded`;
  env.backends.onnx.wasm.wasmPaths = { mjs: `${base}.mjs`, wasm: `${base}.wasm` };
}

const decoded = decodeIndex(index);
let extractorPromise = null;

function loadExtractor() {
  extractorPromise ??= pipeline('feature-extraction', MODEL_ID, {
    dtype: MODEL_DTYPE,
    device: 'wasm',
  });
  return extractorPromise;
}

self.onmessage = async ({ data }) => {
  if (data.type === 'load') {
    try {
      await loadExtractor();
      self.postMessage({ type: 'ready' });
    } catch (error) {
      self.postMessage({ type: 'failed', message: String(error) });
    }
    return;
  }

  if (data.type === 'rank') {
    try {
      const extractor = await loadExtractor();
      const output = await extractor(data.text, { pooling: 'mean', normalize: true });
      const ranked = rankByEmbedding(output.data, decoded).slice(0, 5);
      self.postMessage({ type: 'ranked', id: data.id, ranked });
    } catch (error) {
      self.postMessage({ type: 'ranked', id: data.id, error: String(error) });
    }
  }
};
