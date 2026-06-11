import React from 'react';
import HeroImage from '/assets/portfolio/portrait-with-mat.jpg';
import './content.css';

// Row of moon-phase shapes flanking a circular photograph,
// echoing the eclipse motif of the design reference.
const MoonPhases = () => (
  <svg
    viewBox="0 0 1200 400"
    className="moon-phases"
    aria-label="Samyuktha with her yoga mat, framed by moon phases"
    role="img"
  >
    <defs>
      <clipPath id="hero-photo-clip">
        <circle cx="600" cy="200" r="168" />
      </clipPath>
      <clipPath id="phase-left-outer">
        <circle cx="150" cy="200" r="92" />
      </clipPath>
      <clipPath id="phase-right-outer">
        <circle cx="1050" cy="200" r="92" />
      </clipPath>
    </defs>

    {/* waning crescent — far left */}
    <g clipPath="url(#phase-left-outer)">
      <circle cx="150" cy="200" r="92" fill="var(--color-ink-deep)" />
      <circle cx="116" cy="200" r="88" fill="var(--color-bg)" />
    </g>

    {/* half moon — left */}
    <circle cx="375" cy="200" r="104" fill="var(--color-ink-deep)" />
    <rect x="271" y="96" width="104" height="208" fill="var(--color-bg)" />

    {/* full moon — the photograph */}
    <circle cx="600" cy="200" r="174" fill="var(--color-ink-deep)" />
    <image
      href={HeroImage}
      x="408"
      y="-20"
      width="384"
      height="440"
      preserveAspectRatio="xMidYMid slice"
      clipPath="url(#hero-photo-clip)"
    />

    {/* half moon — right (mirrored) */}
    <circle cx="825" cy="200" r="104" fill="var(--color-ink-deep)" />
    <rect x="825" y="96" width="104" height="208" fill="var(--color-bg)" />

    {/* waxing crescent — far right */}
    <g clipPath="url(#phase-right-outer)">
      <circle cx="1050" cy="200" r="92" fill="var(--color-ink-deep)" />
      <circle cx="1084" cy="200" r="88" fill="var(--color-bg)" />
    </g>
  </svg>
);

const Content = () => {
  return (
    <section id="content" className="hero-section">
      <div className="hero-shell">
        <div className="hero-masthead">
          <div className="hero-flanks" aria-hidden="true">
            <span>Dubai</span>
            <span>Hatha · Ashtanga · Vinyasa</span>
          </div>
          <h1>
            Samyuktha<span className="hero-yoga">yoga</span>
          </h1>
          <p className="hero-tagline">
            300 hrs. Three styles. <em>One breath at a time.</em>
          </p>
          <a href="#aboutMe" className="btn">
            Meet the teacher
          </a>
        </div>
        <MoonPhases />
        <p className="hero-hint" aria-hidden="true">
          Scroll
        </p>
      </div>
    </section>
  );
};

export default Content;
