import React from 'react';
import ContentImage from '/assets/content-image.jpg';
import './content.css';

const Content = () => {
  return (
    <section id="content">
      <div className="image position-relative">
        <img src={ContentImage} alt="Cover" />
        <div className="overlay">
          <div className="text">
            <mark>GUIDING YOU TOWARDS A STRONG MIND AND BODY</mark>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
