// Shows why the chat answered a question the way it did: the decision, the
// top three answers, and which sample phrasing each one matched.
//   npm run assistant:why -- "how did you start yoga?" "another question"
import { readFile } from 'node:fs/promises';
import { pipeline } from '@huggingface/transformers';
import {
  MODEL_ID, MODEL_DTYPE, EMBEDDING_THRESHOLDS, decide, decodeIndex, rankByEmbedding,
} from '../src/components/Assistant/matching.js';

const index = JSON.parse(await readFile(new URL('../src/components/Assistant/answers.index.json', import.meta.url), 'utf8'));
const decoded = decodeIndex(index);
const extractor = await pipeline('feature-extraction', MODEL_ID, { dtype: MODEL_DTYPE });

for (const question of process.argv.slice(2)) {
  const out = await extractor(question, { pooling: 'mean', normalize: true });
  const q = out.data;
  const ranked = rankByEmbedding(q, decoded);
  // best-matching phrasing for the top 3 answers
  const detail = ranked.slice(0, 3).map(({ id, score }) => {
    let best = '';
    let bestScore = -1;
    decoded.entries.forEach((entry, i) => {
      if (entry.id !== id) return;
      const s = decoded.vectors[i].reduce((sum, x, d) => sum + x * q[d], 0);
      if (s > bestScore) [best, bestScore] = [entry.text, s];
    });
    return `${id} ${score.toFixed(2)} ("${best}")`;
  });
  console.log(`${question}\n  -> ${JSON.stringify(decide(question, ranked, EMBEDDING_THRESHOLDS))}\n  top: ${detail.join(' | ')}`);
}
