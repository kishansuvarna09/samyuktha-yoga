import React from 'react';
import './path.css';

const stages = [
  {
    numeral: 'I',
    title: 'Begin',
    subtitle: 'Your first breath on the mat',
    points: [
      'Breath before posture — learning to actually exhale',
      'Standing poses, gentle folds, your first Surya Namaskar',
      'Alignment that protects, not punishes',
      'A small home practice you can keep',
    ],
  },
  {
    numeral: 'II',
    title: 'Deepen',
    subtitle: 'When the poses start to flow',
    points: [
      'Vinyasa transitions — moving on the breath',
      'Strength and openness, built honestly',
      'Longer holds, steadier focus',
      'The eight limbs beyond the asana',
    ],
  },
  {
    numeral: 'III',
    title: 'Refine',
    subtitle: 'The discipline of Ashtanga',
    points: [
      'Arm balances and inversions, step by step',
      'Pranayama and stillness work',
      'A personal daily practice with structure',
      'Teaching your body to teach you',
    ],
  },
];

const Path = () => {
  return (
    <section id="path" className="path-section">
      <div className="container">
        <span className="eyebrow">02 — The practice</span>
        <p className="statement path-statement">
          Whether it is your first breath on the mat or your hundredth
          inversion — <em>there is a next step, and we will find it.</em>
        </p>
        <div className="path-grid">
          {stages.map((stage) => (
            <div className="path-stage" key={stage.title}>
              <span className="path-numeral">{stage.numeral}</span>
              <h3>{stage.title}</h3>
              <p className="path-subtitle">{stage.subtitle}</p>
              <ul>
                {stage.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="path-footnote">
          Group classes, private 1:1, kids yoga and corporate sessions —
          in studio or online.
        </p>
      </div>
    </section>
  );
};

export default Path;
