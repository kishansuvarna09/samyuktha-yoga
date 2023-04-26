import React from 'react';
import { motion } from 'framer-motion';
import ContentImage from '/assets/content-image.jpg';
// import './content.css';

const Content = () => {
  return (
    <section id="content">
      <div className="min-h-screen relative">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="">
            <img
              src={ContentImage}
              alt="Cover"
              className="h-screen object-cover object-[75%] lg:object-[10px 20px]"
            />
          </div>
        </motion.div>
        <motion.div
          className="absolute top-0 w-full h-full grid place-items-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          <div className="text-5xl font-extralight w-[90%] md:w-[60%] lg:w-[40%] leading-[6rem] text-center">
            <mark>GUIDING YOU TOWARDS A STRONG MIND AND BODY</mark>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Content;
