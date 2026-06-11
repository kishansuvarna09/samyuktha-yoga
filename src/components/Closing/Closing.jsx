import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import Mandala from '@components/Common/Mandala';
import './closing.css';

const Closing = () => {
  return (
    <section id="namaste" className="closing-section">
      <Mandala className="closing-mandala" />
      <div className="container">
        <div className="closing-body">
          <span className="eyebrow eyebrow-light">05 — Until the mat</span>
          <h2>
            Namaste <em>x</em>
          </h2>
          <p className="closing-note">
            Find me on a mat somewhere in Dubai — or say hello and follow
            the practice on Instagram.
          </p>
          <a
            href="https://www.instagram.com/samyuktha.acharya"
            className="closing-instagram"
            aria-label="Follow Samyuktha Yoga on Instagram"
          >
            <FontAwesomeIcon icon={faInstagram} />
            <span>@samyuktha.acharya</span>
          </a>
        </div>

        <footer className="site-footer">
          <div className="footer-brand">
            Samyuktha<span>yoga</span>
          </div>
          <div className="footer-meta">
            <span>Dubai · Online</span>
            <span>Hatha · Ashtanga · Vinyasa</span>
            <span>© {new Date().getFullYear()} Samyuktha Yoga</span>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Closing;
