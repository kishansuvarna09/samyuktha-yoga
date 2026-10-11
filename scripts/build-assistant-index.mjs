// Builds src/components/Assistant/answers.index.json: an embedding for every
// phrasing in answers.js, so the browser only has to embed the visitor's
// question. Run after editing answers.js:  npm run assistant:index
//
// --check: exit non-zero if the index is out of date (runs before `npm run
// build`, so a stale index fails the deploy instead of silently mismatching).

import { readFile, writeFile } from 'node:fs/promises';
import { answers } from '../src/components/Assistant/answers.js';
import {
  MODEL_ID,
  MODEL_DTYPE,
  encodeIndex,
  indexEntriesFor,
  isIndexStale,
} from '../src/components/Assistant/matching.js';

const INDEX_PATH = new URL('../src/components/Assistant/answers.index.json', import.meta.url);

if (process.argv.includes('--check')) {
  let index = null;
  try {
    index = JSON.parse(await readFile(INDEX_PATH, 'utf8'));
  } catch {
    // missing or unreadable: treated as stale below
  }
  if (!index || isIndexStale(answers, index)) {
    console.error(
      'Assistant index is out of date with answers.js. Run `npm run assistant:index` and commit the result.'
    );
    process.exit(1);
  }
  console.log('Assistant index is up to date.');
  process.exit(0);
}

const ids = answers.map((answer) => answer.id);
const duplicate = ids.find((id, i) => ids.indexOf(id) !== i);
if (duplicate) throw new Error(`Duplicate answer id: ${duplicate}`);

const { pipeline } = await import('@huggingface/transformers');
const extractor = await pipeline('feature-extraction', MODEL_ID, { dtype: MODEL_DTYPE });

const entries = indexEntriesFor(answers);
const output = await extractor(
  entries.map((entry) => entry.text),
  { pooling: 'mean', normalize: true }
);
const index = encodeIndex(entries, output.tolist());

await writeFile(INDEX_PATH, JSON.stringify(index) + '\n');
console.log(`Indexed ${entries.length} phrasings across ${answers.length} answers.`);
