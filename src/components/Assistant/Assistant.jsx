import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { answers, messages as copy, starters, INSTAGRAM_URL } from './answers.js';
import { createMatcher } from './matcher.js';
import './assistant.css';

const answerById = Object.fromEntries(answers.map((answer) => [answer.id, answer]));

// A beat before each reply so answers don't snap in mechanically.
const MIN_REPLY_DELAY_MS = 350;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function replyFor(decision) {
  if (decision.type === 'answer') {
    const answer = answerById[decision.id];
    return { role: 'bot', text: answer.answer, link: answer.link };
  }
  if (decision.type === 'clarify') {
    return { role: 'bot', text: copy.clarify, chips: decision.ids };
  }
  return { role: 'bot', text: copy.fallback, link: 'instagram', chips: starters };
}

const Assistant = () => {
  const [open, setOpen] = useState(false);
  const [thread, setThread] = useState([]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [warming, setWarming] = useState(false);
  const matcherRef = useRef(null);
  const panelRef = useRef(null);
  const threadRef = useRef(null);
  const inputRef = useRef(null);
  const launcherRef = useRef(null);

  useEffect(() => () => matcherRef.current?.dispose(), []);

  const openChat = () => {
    if (!matcherRef.current) {
      // Start downloading the model now, while the visitor reads the intro.
      matcherRef.current = createMatcher();
      matcherRef.current.start();
      setThread([{ role: 'bot', text: copy.intro, chips: starters }]);
    }
    setOpen(true);
  };

  const closeChat = () => {
    setOpen(false);
    launcherRef.current?.focus();
  };

  useEffect(() => {
    // the panel covers the slide dots, so hide them while it's open
    document.body.classList.toggle('assistant-open', open);
    if (!open) return undefined;
    // Don't pop the on-screen keyboard over the suggestions on phones.
    if (window.matchMedia('(pointer: fine)').matches) inputRef.current?.focus();
    else panelRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeChat();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    const list = threadRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [thread, busy]);

  const ask = async (text, answerId) => {
    const question = text.trim();
    if (!question || busy) return;
    setThread((current) => [...current, { role: 'user', text: question }]);
    setDraft('');
    setBusy(true);
    setWarming(!answerId && !matcherRef.current.isReady());

    const [decision] = await Promise.all([
      answerId ? { type: 'answer', id: answerId } : matcherRef.current.match(question),
      wait(MIN_REPLY_DELAY_MS),
    ]);

    setThread((current) => [...current, replyFor(decision)]);
    setBusy(false);
    setWarming(false);
  };

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        className={`assistant-launcher ${open ? 'is-open' : ''}`}
        aria-expanded={open}
        aria-controls="assistant-panel"
        onClick={open ? closeChat : openChat}
      >
        {open ? 'Close chat' : 'Ask Samyuktha'}
      </button>

      {open && (
        <section
          id="assistant-panel"
          ref={panelRef}
          className="assistant-panel"
          role="dialog"
          aria-labelledby="assistant-title"
          tabIndex={-1}
        >
          <header className="assistant-head">
            <div>
              <h2 id="assistant-title">
                Ask <em>Samyuktha</em>
              </h2>
              <p>Automated · answers she wrote herself</p>
            </div>
            <button
              type="button"
              className="assistant-close"
              aria-label="Close chat"
              onClick={closeChat}
            >
              ×
            </button>
          </header>

          <ol className="assistant-thread" ref={threadRef} aria-live="polite">
            {thread.map((message, index) => {
              const isLatest = index === thread.length - 1;
              return (
                <li key={index} className={`assistant-msg is-${message.role}`}>
                  <p>{message.text}</p>
                  {message.link === 'instagram' && (
                    <a
                      className="assistant-link"
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faInstagram} />
                      Message me on Instagram
                    </a>
                  )}
                  {message.chips && isLatest && !busy && (
                    <div className="assistant-chips">
                      {message.chips.map((id) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => ask(answerById[id].label, id)}
                        >
                          {answerById[id].label}
                        </button>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
            {busy && (
              <li className="assistant-msg is-bot is-typing" aria-hidden="true">
                <span className="assistant-dots">
                  <span />
                  <span />
                  <span />
                </span>
                {warming && <small>Getting ready, first time only…</small>}
              </li>
            )}
          </ol>

          <form
            className="assistant-form"
            onSubmit={(event) => {
              event.preventDefault();
              ask(draft);
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Ask a question…"
              aria-label="Your question"
              maxLength={300}
              autoComplete="off"
              enterKeyHint="send"
            />
            <button type="submit" disabled={!draft.trim() || busy}>
              Send
            </button>
          </form>
        </section>
      )}
    </>
  );
};

export default Assistant;
