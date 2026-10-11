// Question matching for the "Ask Samyuktha" chat. Shared by the browser
// worker and the Node scripts in /scripts, so the eval tests exactly what
// visitors get.

export const MODEL_ID = 'Xenova/all-MiniLM-L6-v2';
export const MODEL_DTYPE = 'q8';

// Cosine-similarity cut-offs, tuned with `npm run assistant:eval -- --sweep`.
// `margin`: if the runner-up is this close to the top answer, ask "did you
// mean..." instead of guessing between them.
export const EMBEDDING_THRESHOLDS = { answer: 0.55, clarify: 0.45, margin: 0.03 };
// Share of the visitor's words found in a phrasing; used only when the
// embedding model can't load (old browser, blocked network).
export const KEYWORD_THRESHOLDS = { answer: 0.6, clarify: 0.34, margin: 0.03 };

// Safety questions always get a fixed answer, whatever the similarity scores
// say. Pregnancy is checked first, so "pregnant with back pain" gets the
// pregnancy answer (which also says to ask a doctor first).
const PREGNANCY_PATTERNS = [
  /\bpregnan/,
  /\b(prenatal|antenatal|postnatal|postpartum)\b/,
  /\bgave birth\b/,
  /\b(c-?section|caesarean|cesarean)/,
  /\b(just had|recently had|expecting) a baby\b/,
  /\bafter (my )?delivery\b/,
];

const HEALTH_PATTERNS = [
  /\binjur/,
  /\bpain/,
  /\b(ache|aches|aching|headaches?|backache)\b/,
  /\bhurts?\b/,
  /\bsore\b/,
  /\b(surgery|operated)\b/,
  /\b(slipped|herniated|bulging) dis[ck]\b/,
  /\bsciatica\b/,
  /\barthritis\b/,
  /\bblood pressure\b/,
  /\bhypertension\b/,
  /\bheart (condition|problem|disease|attack)/,
  /\bdiabet/,
  /\basthma/,
  /\bepilep/,
  /\bscoliosis\b/,
  /\bosteopor/,
  /\bmedical\b/,
  /\bdoctor/,
  /\bmedication/,
  /\bvertigo\b/,
  /\bdizz/,
  /\bmigraine/,
  /\bmenstrua/,
  /\b(my|during|on|the) periods?\b/,
  /\b(fracture|sprain|torn)/,
  /\bbad (knee|back|hip|shoulder|neck|wrist)s?\b/,
  /\b(knee|back|hip|shoulder|neck|wrist|spine) (problem|issue|injury|condition)s?\b/,
];

/** The fixed safety answer this question must get, or null. */
export function forcedAnswerFor(text) {
  const t = text.toLowerCase();
  if (PREGNANCY_PATTERNS.some((pattern) => pattern.test(t))) return 'pregnancy';
  if (HEALTH_PATTERNS.some((pattern) => pattern.test(t))) return 'health';
  return null;
}

// ---------- index encoding (int8 keeps the shipped file ~10x smaller) ----------

function toBase64(bytes) {
  let binary = '';
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(binary);
}

function fromBase64(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

/** @param entries {id, text}[]  @param vectors normalized number[][] */
export function encodeIndex(entries, vectors) {
  const dims = vectors[0].length;
  const quantized = new Int8Array(vectors.length * dims);
  const scales = vectors.map((vector, row) => {
    const scale = Math.max(...vector.map(Math.abs)) / 127 || 1;
    vector.forEach((value, col) => {
      quantized[row * dims + col] = Math.round(value / scale);
    });
    return Number(scale.toPrecision(6));
  });
  return {
    model: MODEL_ID,
    dtype: MODEL_DTYPE,
    dims,
    entries,
    scales,
    vectors: toBase64(new Uint8Array(quantized.buffer)),
  };
}

export function decodeIndex(index) {
  const quantized = new Int8Array(fromBase64(index.vectors).buffer);
  const vectors = index.entries.map((_, row) => {
    const vector = new Float32Array(index.dims);
    let norm = 0;
    for (let col = 0; col < index.dims; col++) {
      vector[col] = quantized[row * index.dims + col] * index.scales[row];
      norm += vector[col] ** 2;
    }
    norm = Math.sqrt(norm);
    return vector.map((value) => value / norm);
  });
  return { entries: index.entries, vectors };
}

/** Phrasings the index was built from, in order, to detect a stale index. */
export function indexEntriesFor(answers) {
  return answers.flatMap((answer) =>
    answer.questions.map((text) => ({ id: answer.id, text }))
  );
}

export function isIndexStale(answers, index) {
  return (
    index.model !== MODEL_ID ||
    index.dtype !== MODEL_DTYPE ||
    JSON.stringify(indexEntriesFor(answers)) !== JSON.stringify(index.entries)
  );
}

// ---------- ranking ----------

function bestPerAnswer(scored) {
  const best = new Map();
  for (const { id, score } of scored) {
    if (!best.has(id) || best.get(id) < score) best.set(id, score);
  }
  return [...best.entries()]
    .map(([id, score]) => ({ id, score }))
    .sort((a, b) => b.score - a.score);
}

/** @param queryVector normalized Float32Array  @param decoded from decodeIndex */
export function rankByEmbedding(queryVector, decoded) {
  return bestPerAnswer(
    decoded.vectors.map((vector, i) => {
      let dot = 0;
      for (let d = 0; d < vector.length; d++) dot += vector[d] * queryVector[d];
      return { id: decoded.entries[i].id, score: dot };
    })
  );
}

// Filler words, plus "yoga", which appears in almost every question here.
const STOPWORDS = new Set(
  `a about also am an and any are as at be can cant come could do does dont for from get
  have how i if im in is it its ive just like me much my need of on or please really
  so some tell that the there this to want what whats when where which who will with
  would you your yours yoga`.split(/\s+/)
);

function keywords(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word && !STOPWORDS.has(word))
    .map(singular);
}

// classes -> class, mats -> mat, but leave "class" and "yes" alone
function singular(word) {
  if (word.length <= 3) return word;
  if (word.endsWith('sses')) return word.slice(0, -2);
  if (word.endsWith('s') && !word.endsWith('ss')) return word.slice(0, -1);
  return word;
}

/** Fallback ranking by shared words, for when the model is unavailable. */
export function rankByKeywords(text, answers) {
  const query = new Set(keywords(text));
  if (query.size === 0) return [];
  return bestPerAnswer(
    answers.flatMap((answer) =>
      answer.questions.map((question) => {
        const words = new Set(keywords(question));
        const shared = [...query].filter((word) => words.has(word)).length;
        return { id: answer.id, score: shared / Math.max(query.size, words.size) };
      })
    )
  );
}

/**
 * @returns {{type:'answer', id:string} | {type:'clarify', ids:string[]} | {type:'fallback'}}
 */
export function decide(text, ranked, thresholds) {
  const forced = forcedAnswerFor(text);
  if (forced) return { type: 'answer', id: forced };
  const [top, runnerUp] = ranked;
  const clearWinner = !runnerUp || top.score - runnerUp.score >= thresholds.margin;
  if (top && top.score >= thresholds.answer && clearWinner) {
    return { type: 'answer', id: top.id };
  }
  if (top && top.score >= thresholds.clarify) {
    const ids = ranked
      .filter((r) => r.score >= thresholds.clarify)
      .slice(0, 3)
      .map((r) => r.id);
    return { type: 'clarify', ids };
  }
  return { type: 'fallback' };
}
