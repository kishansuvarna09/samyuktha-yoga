import React, { useEffect, useRef, useState } from 'react';
import './slideDeck.css';

const SlideDeck = ({ slides }) => {
  const [active, setActive] = useState(0);
  const deckRef = useRef(null);
  const slideRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number(entry.target.dataset.index));
          }
        });
      },
      { root: deckRef.current, threshold: 0.55 }
    );
    slideRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [slides.length]);

  // Native hash navigation doesn't reliably scroll a nested snap
  // container, so route in-page anchor clicks through scrollIntoView.
  useEffect(() => {
    const onClick = (event) => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // invert fixed chrome (navbar, dots, counter) over dark slides
  useEffect(() => {
    document.body.classList.toggle(
      'deck-dark',
      slides[active]?.theme === 'dark'
    );
    return () => document.body.classList.remove('deck-dark');
  }, [active, slides]);

  const goTo = (index) => {
    slideRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <main className="deck" ref={deckRef}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            data-index={index}
            ref={(el) => (slideRefs.current[index] = el)}
            className={`deck-slide ${index === active ? 'is-active' : ''}`}
          >
            {slide.content}
          </div>
        ))}
      </main>
      <nav className="deck-dots" aria-label="Slides">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={index === active ? 'is-active' : ''}
            aria-label={`Go to ${slide.label}`}
            aria-current={index === active ? 'true' : undefined}
            onClick={() => goTo(index)}
          />
        ))}
      </nav>
      <div className="deck-counter" aria-hidden="true">
        {String(active + 1).padStart(2, '0')} /{' '}
        {String(slides.length).padStart(2, '0')}
      </div>
    </>
  );
};

export default SlideDeck;
