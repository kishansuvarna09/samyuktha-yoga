import React from 'react';
import './life.css';
import DesertImage from '/assets/portfolio/life-desert-drive.jpg';
import CoconutImage from '/assets/portfolio/life-coconut-break.jpg';
import KartingImage from '/assets/portfolio/life-karting-dubai.jpg';
import DogImage from '/assets/portfolio/life-with-dog.jpg';
import MatchaImage from '/assets/portfolio/life-matcha-cafe.jpg';
import StretchImage from '/assets/portfolio/practice-city-stretch.jpg';

const moments = [
  {
    image: StretchImage,
    alt: 'Samyuktha stretching playfully on a ledge under palm trees in Dubai',
    caption: 'Yoga everywhere',
    size: 'tall',
  },
  {
    image: DesertImage,
    alt: 'Samyuktha relaxing in a car with the desert at sunset behind',
    caption: 'Desert drives',
    size: 'tall',
  },
  {
    image: CoconutImage,
    alt: 'Coconut water break in the car, henna on hands',
    caption: 'Coconut breaks',
    size: 'small',
  },
  {
    image: KartingImage,
    alt: 'Samyuktha in a racing suit at Dubai Kartdrome',
    caption: 'Race days',
    size: 'small',
  },
  {
    image: DogImage,
    alt: 'Samyuktha hugging her dog in a green garden',
    caption: 'Dog cuddles',
    size: 'small',
  },
  {
    image: MatchaImage,
    alt: 'Matcha at a quiet cafe',
    caption: 'Matcha rituals',
    size: 'small',
  },
];

const Life = () => {
  return (
    <section id="life" className="life-section">
      <div className="container">
        <span className="eyebrow">04 — Off the mat</span>
        <p className="statement life-statement">
          The practice doesn't end <em>when the mat rolls up.</em>
        </p>
        <div className="life-collage">
          {moments.map((moment) => (
            <figure
              className={`life-frame img-mono is-${moment.size}`}
              key={moment.image}
            >
              <img src={moment.image} alt={moment.alt} />
              <figcaption>{moment.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Life;
