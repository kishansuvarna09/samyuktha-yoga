import React from 'react';
import { motion } from 'framer-motion';
import Logo from '/assets/logo-icon.png';
import './navbar.css';
import Divider from '@components/Common/Divider';

const Navbar = () => {
  return (
    <header id="header">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="logo-container title">
            SAMYUKTHA
            <img src={Logo} alt="Logo" />
            YOGA
          </div>
        </motion.div>
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
