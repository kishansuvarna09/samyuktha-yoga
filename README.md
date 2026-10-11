# Samyuktha Yoga

Portfolio website for **Samyuktha** — a 300hr certified yoga teacher based in
Dubai, teaching Hatha, Ashtanga and Vinyasa across seven studios and gyms
(UFC Gym, Veo Fitness, Fitness Terminal, Little Yogi, Anytime Fitness,
Fitness Together, Yogle) and online.

I maintain this repo to build, version and ship her website — a single-page,
slide-deck-style portfolio (React + Vite) that showcases her teaching, the
studios she works with, and life on and off the mat.

📷 Instagram: [@samyuktha.acharya](https://www.instagram.com/samyuktha.acharya)

## "Ask Samyuktha" chat

The chat answers only with replies Samyuktha wrote herself, in
`src/components/Assistant/answers.js`. A small language model (all-MiniLM-L6-v2,
~23 MB, cached after the first visit) runs in the visitor's browser and matches
their question to the closest answer. The question never leaves the browser
(the model comes from Hugging Face, its runtime from jsDelivr), and health
questions (injury, pain, pregnancy...) always get a fixed "check with your
doctor, then message me" reply.

To change or add answers:

1. Edit `answers.js`. Give each answer several `questions` written the way
   students really ask.
2. `npm run assistant:index` rebuilds the matching index (commit the updated
   `answers.index.json`; the build fails if it's out of date).
3. `npm run assistant:eval` checks the test questions in
   `scripts/eval-assistant.mjs` still land on the right answers.

If a real visitor question gets a wrong answer, `npm run assistant:why --
"their question"` shows which sample phrasing it matched. Usually the fix is
an answer for that topic, or a few more phrasings on the right one; then add
the question to the eval so it stays fixed.

`vercel.json` sets `ONNXRUNTIME_NODE_INSTALL=skip` on install: the Node build of
the model runtime (used only by the two scripts above) would otherwise download
hundreds of MB of CUDA libraries on Vercel's Linux build machines.
