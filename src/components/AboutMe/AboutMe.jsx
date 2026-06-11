import React from 'react';
import './aboutMe.css';
import PortraitImage from '/assets/portfolio/portrait-evening-smile.jpg';

const stats = [
  { value: '300', unit: 'hr', label: 'Certified teacher' },
  { value: '7', unit: 'studios', label: 'Across Dubai' },
  { value: '3', unit: 'styles', label: 'Hatha · Ashtanga · Vinyasa' },
  { value: '60', unit: 'min', label: 'Breath-led flows' },
];

const AboutMe = () => {
  return (
    <section id="aboutMe" className="about-section">
      <div className="container">
        <div className="about-grid">
          <figure className="about-portrait img-mono">
            <img
              src={PortraitImage}
              alt="Samyuktha smiling at golden hour in Dubai"
            />
            <figcaption>Samyuktha · Dubai</figcaption>
          </figure>
          <div className="about-copy">
            <span className="eyebrow">01 — The teacher</span>
            <p className="statement about-statement">
              Hi! I'm <em>Samyuktha</em> — a 300hr certified teacher who
              carried her mat from Bangalore to Dubai, and her conviction
              everywhere: <em>yoga is for every body.</em>
            </p>
            <p className="about-note">
              I teach Hatha, Ashtanga and Vinyasa across Dubai's studios and gyms,
              and online wherever you are. My classes are rooted in breath,
              honest alignment, and quiet consistency — strong enough to
              challenge you, gentle enough to keep you coming back.
            </p>
          </div>
        </div>

        <div className="about-stats" aria-label="Teaching highlights">
          {stats.map((stat) => (
            <div className="about-stat" key={stat.label}>
              <span className="stat-value">
                {stat.value}
                <em>{stat.unit}</em>
              </span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
