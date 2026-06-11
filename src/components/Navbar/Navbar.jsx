import React from 'react';
import './navbar.css';

const Navbar = () => {
  return (
    <header id="header" className="site-header">
      <div className="nav-shell">
        <a href="#content" className="nav-brand" aria-label="Samyuktha Yoga home">
          Samyuktha<span>yoga</span>
        </a>
        <div className="nav-note">Hatha · Ashtanga · Vinyasa</div>
        <a
          href="https://www.instagram.com/samyuktha.acharya"
          className="btn nav-book"
        >
          Instagram
        </a>
      </div>
    </header>
  );
};

export default Navbar;
