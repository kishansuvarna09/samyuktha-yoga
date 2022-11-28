import React from 'react';
import Instagram from '../Icons/Instagram';
import Logo from '../../assets/logo-icon.png';
import './navbar.css';
import Divider from '../Common/Divider';

const Navbar = () => {
  return (
    <header id="header">
      <div className="container">
        <div className="logo-container title">
          SAMYUKTHA
          <img src={Logo} alt="Logo" />
          YOGA
        </div>
        <Divider />
      </div>
      {/* <div className="nav-links-container">
        <div className="grid-center nav-link">
          <span>HOME</span>
        </div>
        <div className="grid-center nav-link">
          <span>ABOUT ME</span>
        </div>
        <div className="grid-center nav-link">
          <span>CLASSES</span>
        </div>
        <div className="grid-center nav-link social-icon">
          <Instagram />
        </div>
      </div> */}
    </header>
  );
};

export default Navbar;
