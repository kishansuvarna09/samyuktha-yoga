import React from 'react';
import ContentImage from '../../assets/content-image.jpg';
import './content.css';
import content from '../../data';

const Content = () => {
  return (
    <section id="content">
      <div className="image position-relative">
        <img src={ContentImage} alt="Cover" />
        <div className="overlay">
          <div className="text">
            GUIDING YOU TOWARDS A STRONG MIND AND BODY
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
