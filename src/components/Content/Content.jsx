import React from 'react';
import { motion } from 'framer-motion';
import ContentImage from '/assets/content-image.jpg';
import './content.css';

const Content = () => {
  return (
    <section id="content">
      <motion.div
        className="image position-relative"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img src={ContentImage} alt="Cover" />
      </motion.div>
      <motion.div
        className="overlay"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="text">
          <mark>GUIDING YOU TOWARDS A STRONG MIND AND BODY</mark>
        </div>
      </motion.div>
    </section>
  );
};

export default Content;
