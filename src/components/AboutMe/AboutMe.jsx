import React from 'react';
import './aboutMe.css';
import content from '@data';
import AboutMeImage from '/assets/about-me-image.jpg';

const AboutMe = () => {
  return (
    <section id="aboutMe">
      <div className="container">
        <div className="image">
          <img
            src={AboutMeImage}
            alt="Me"
            className="object-cover object-right"
          />
        </div>
        <div className="description">
          <div
            className="about-me"
            dangerouslySetInnerHTML={{ __html: content.contentIntro }}
          />
          <div className="button-container">
            <a href="#contactMe" className="btn">
              Practice with me
            </a>
          </div>
        </div>
        {/* <div className="heading">{content.contentQuote}</div>
        <div className="sub-heading">{content.contentIntro}</div>
        <div className="button-container">
          <a href="#practiceWithMe" className="btn btn-primary">
            Practice with me
          </a>
        </div> */}
      </div>
    </section>
  );
};

export default AboutMe;
