import React from 'react';
import './studios.css';
import UfcImage from '/assets/portfolio/teaching-ufc-gym.jpg';
import PuppyImage from '/assets/portfolio/teaching-puppy-yoga.jpg';

const studios = [
  'UFC Gym',
  'Veo Fitness',
  'Fitness Terminal',
  'Little Yogi',
  'Anytime Fitness',
  'Fitness Together',
  'Yogle',
];

const offerings = [
  {
    title: 'Studio & gym classes',
    detail: 'Group Hatha and Vinyasa flows at studios and gyms across Dubai',
  },
  {
    title: 'Kids yoga',
    detail: 'Playful first asanas, taught with patience and giggles',
  },
  {
    title: 'Private 1:1',
    detail: 'A practice built around your body, goals and schedule',
  },
  {
    title: 'Online classes',
    detail: 'Live virtual sessions, wherever your mat is',
  },
];

const Studios = () => {
  return (
    <section id="studios" className="studios-section">
      <div className="container studios-head">
        <span className="eyebrow">03 — Studios & classes</span>
        <p className="statement studios-statement">
          You'll find me on mats <em>all over the city.</em>
        </p>
      </div>

      <div className="studios-marquee" aria-label="Studios where Samyuktha teaches">
        <div className="marquee-track">
          {[...studios, ...studios].map((studio, index) => (
            <span className="marquee-item" key={`${studio}-${index}`}>
              {studio} <span className="marquee-star" aria-hidden="true">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="container studios-body">
        <div className="studios-photos">
          <figure className="studio-frame img-mono">
            <img src={UfcImage} alt="Samyuktha guiding a stretching session at UFC Gym" />
            <figcaption>UFC Gym · Dubai</figcaption>
          </figure>
          <figure className="studio-frame img-mono">
            <img src={PuppyImage} alt="Puppy yoga session — a labrador puppy resting on Samyuktha" />
            <figcaption>Puppy yoga, yes really</figcaption>
          </figure>
        </div>
        <div className="studios-offerings">
          {offerings.map((offer) => (
            <div className="offering" key={offer.title}>
              <h3>{offer.title}</h3>
              <p>{offer.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Studios;
