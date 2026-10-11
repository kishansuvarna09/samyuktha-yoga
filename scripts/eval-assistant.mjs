// Checks how the "Ask Samyuktha" chat answers questions worded differently
// from the phrasings in answers.js. Run after rebuilding the index:
//   npm run assistant:eval
// Add a case here whenever a real visitor question lands on the wrong answer.

import { readFile } from 'node:fs/promises';
import { answers } from '../src/components/Assistant/answers.js';
import {
  MODEL_ID,
  MODEL_DTYPE,
  EMBEDDING_THRESHOLDS,
  KEYWORD_THRESHOLDS,
  decide,
  decodeIndex,
  isIndexStale,
  rankByEmbedding,
  rankByKeywords,
} from '../src/components/Assistant/matching.js';

// expect: an answer id, a list of acceptable ids, or 'fallback' (not covered).
const CASES = [
  ['Hiya!', 'greeting'],
  ['Can a complete newbie come to your class?', 'beginners'],
  ["I've never stepped on a yoga mat", 'beginners'],
  ['My hamstrings are super tight, is yoga for me?', 'flexibility'],
  ["I'm 55, is it too late to start?", 'flexibility'],
  ['Which gym can I find you at?', 'where'],
  ['Do you teach at UFC gym?', 'where'],
  ['What days do you run classes?', 'schedule'],
  ['Are there evening sessions?', 'schedule'],
  ["What's the price for a session?", 'pricing'],
  ['Is it expensive?', 'pricing'],
  ['How do I get in touch?', 'book'],
  ["I'd like to join a class, what do I do?", 'book'],
  ['Do you offer personal sessions just for me?', 'private'],
  ['Can I take your class from London over video?', 'online'],
  ['Is there yoga for my 7 year old?', 'kids'],
  ['Could you do a session for our team at work?', 'corporate'],
  ['Is puppy yoga actually a thing?', 'puppy'],
  ['What do I need to wear?', 'bring'],
  ['Do I need to bring a yoga mat?', 'bring'],
  ['How long does each session last?', 'length'],
  ['I want to be able to do a handstand', 'progress'],
  ['How can I practice on my own at home?', 'home'],
  ['Teach me some breathing techniques', 'breath'],
  ['Will yoga help my anxiety?', 'stress'],
  ['I hurt my lower back last month', 'health'],
  ["I'm 5 months pregnant, can I come?", 'pregnancy'],
  ['Is it safe after a c-section?', 'pregnancy'],
  ['My baby is 3 months old, when can I start again?', 'pregnancy'],
  ['I have high blood pressure', 'health'],
  ['My knees hurt when I kneel', 'health'],
  ['Do you have male students?', 'men'],
  ['I want to drop a few kilos', 'weight'],
  ['Is it bad to practise late at night?', 'best-time'],
  ['I want to surprise my sister with a class', 'gift'],
  ['My mum only speaks Malayalam, can she join?', 'languages'],
  ['Can you teach at my villa?', 'private'],
  ['We are a team of 25, can you come to us?', 'corporate'],
  ['Do studios give you a mat?', 'bring'],
  ['Can we book puppy yoga for a birthday party?', 'puppy'],
  ['What age does my child need to be?', 'kids'],
  ["What's the difference between ashtanga and hatha?", 'which-style'],
  ['What exactly is vinyasa?', 'vinyasa'],
  ['Tell me about hatha', 'hatha'],
  ['Is ashtanga good for a beginner?', ['which-style', 'ashtanga']],
  ['What kind of yoga are you teaching?', 'styles'],
  ['Are you a real person or a robot?', 'human'],
  ['Is this ChatGPT?', 'human'],
  ['Thanks so much!', 'thanks'],
  ['How long have you been certified?', ['about', 'journey']],
  // Ambiguous: her qualifications, her own training routine, or what she offers.
  ["What's your yoga training?", ['about', 'journey', 'routine', 'styles']],
  // Questions about Sam herself; the model barely sees "you" vs "I", so these
  // guard against them landing on the visitor-facing beginner/home answers.
  ['How did you start yoga?', 'story'], // a real visitor question that misfired
  ['What made you fall in love with yoga?', 'story'],
  ['Why did you decide to teach?', 'journey'],
  ['How many years have you been a teacher?', 'journey'],
  ['Do you work out as well?', 'routine'],
  ['Is yoga part of your daily life?', 'routine'],
  ['How many days a week should I be doing yoga?', 'home'],
  // Styles she doesn't list, and guards that listed ones still land right.
  // the styles answer lists exactly what she teaches, which answers this too
  ['Any iyengar classes?', ['other-styles', 'styles', 'fallback']],
  ['Can you teach me restorative yoga?', ['other-styles', 'fallback']],
  ['Do you offer Ashtanga classes?', ['styles', 'ashtanga']],
  ['Can my kids join a class?', 'kids'],
  ['Do you speak Hindi in class?', 'languages'],
  ["What's the weather in Dubai tomorrow?", 'fallback'],
  ['Can you recommend a good restaurant?', 'fallback'],
  ['Write me a poem about the sea', 'fallback'],
  ["How do I fix my car's engine?", 'fallback'],
  ['What is the price of bitcoin?', 'fallback'],
  ['Who won the football match yesterday?', 'fallback'],
  // "Studios provide mats" and "anything else on your wishlist, message me"
  // are both fair replies here.
  ['Do you sell yoga mats?', ['fallback', 'bring', 'other-styles']],
  ["What's your favourite food?", 'fallback'],
];

const index = JSON.parse(
  await readFile(new URL('../src/components/Assistant/answers.index.json', import.meta.url), 'utf8')
);
if (isIndexStale(answers, index)) {
  console.error('Index is out of date with answers.js. Run `npm run assistant:index` first.');
  process.exit(1);
}
const decoded = decodeIndex(index);
const knownIds = new Set(answers.map((answer) => answer.id));
for (const [, expect] of CASES) {
  for (const id of [expect].flat()) {
    if (id !== 'fallback' && !knownIds.has(id)) throw new Error(`Unknown answer id in CASES: ${id}`);
  }
}

const { pipeline } = await import('@huggingface/transformers');
const extractor = await pipeline('feature-extraction', MODEL_ID, { dtype: MODEL_DTYPE });
// One question at a time, as in the browser: batching pads inputs, which
// shifts scores slightly and can flip near-ties.
const embeddingRanks = [];
for (const [question] of CASES) {
  const output = await extractor(question, { pooling: 'mean', normalize: true });
  embeddingRanks.push(rankByEmbedding(output.data, decoded));
}
const keywordRanks = CASES.map(([question]) => rankByKeywords(question, answers));

// pass: right answer (or fallback when expected); clarify: a "did you mean"
// list that includes it; wrong: a confident wrong answer, the worst outcome;
// miss: fell back although an answer exists.
function grade(expect, decision) {
  const accepted = [expect].flat();
  if (decision.type === 'fallback') return accepted.includes('fallback') ? 'pass' : 'miss';
  if (decision.type === 'answer') return accepted.includes(decision.id) ? 'pass' : 'wrong';
  // a "did you mean" list is harmless for questions we can't answer anyway
  const helpful = decision.ids.some((id) => accepted.includes(id)) || accepted.includes('fallback');
  return helpful ? 'clarify' : 'wrong';
}

function score(ranks, thresholds) {
  const tally = { pass: 0, clarify: 0, wrong: 0, miss: 0 };
  const rows = CASES.map(([question, expect], i) => {
    const decision = decide(question, ranks[i], thresholds);
    const outcome = grade(expect, decision);
    tally[outcome]++;
    return { question, expect, decision, outcome, top: ranks[i].slice(0, 2) };
  });
  return { tally, rows };
}

function describe(decision) {
  if (decision.type === 'answer') return decision.id;
  if (decision.type === 'clarify') return `clarify[${decision.ids.join(',')}]`;
  return 'fallback';
}

function report(title, ranks, thresholds) {
  const { tally, rows } = score(ranks, thresholds);
  console.log(
    `\n${title}  answer>=${thresholds.answer} clarify>=${thresholds.clarify} margin>=${thresholds.margin}`
  );
  for (const row of rows) {
    if (row.outcome === 'pass') continue;
    const top = row.top.map((r) => `${r.id} ${r.score.toFixed(2)}`).join(', ');
    console.log(
      `  ${row.outcome.toUpperCase().padEnd(7)} "${row.question}" -> ${describe(row.decision)} (expected ${[row.expect].flat().join('|')}; top: ${top})`
    );
  }
  console.log(
    `  ${tally.pass}/${CASES.length} pass, ${tally.clarify} clarify, ${tally.wrong} wrong, ${tally.miss} missed`
  );
  return tally;
}

if (process.argv.includes('--sweep')) {
  console.log('Embedding threshold sweep (answer / clarify: pass clarify wrong miss)');
  const { margin } = EMBEDDING_THRESHOLDS;
  for (const answer of [0.5, 0.55, 0.6, 0.65, 0.7]) {
    const cells = [0.35, 0.4, 0.45, 0.5].map((clarify) => {
      const { tally } = score(embeddingRanks, { answer, clarify, margin });
      return `${clarify}: ${tally.pass} ${tally.clarify} ${tally.wrong} ${tally.miss}`;
    });
    console.log(`  ${answer}  |  ${cells.join('  |  ')}`);
  }
}

const embedding = report('Embedding matcher', embeddingRanks, EMBEDDING_THRESHOLDS);
report('Keyword fallback (model unavailable)', keywordRanks, KEYWORD_THRESHOLDS);

process.exit(embedding.wrong > 0 ? 1 : 0);
