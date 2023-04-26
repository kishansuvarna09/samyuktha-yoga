import React from 'react';
import { motion } from 'framer-motion';
import Logo from '/assets/logo-icon.png';
import './navbar.css';
import Divider from '@components/Common/Divider';

const Navbar = () => {
  return (
    <header id="header">
      <div className="fixed w-full bg-white px-20 z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center items-center py-2 text-[1.75rem] font-light">
            SAMYUKTHA
            <img src={Logo} alt="Logo" className="h-12 w-12" />
            YOGA
          </div>
        </motion.div>
        <Divider />
        <div className="italic text-center text-[#10a19d] h-full font-semibold">
          May 2023 batch
        </div>
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
