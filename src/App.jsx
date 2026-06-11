import React from 'react';
import {
  Navbar,
  Content,
  AboutMe,
  Path,
  Studios,
  Life,
  Closing,
  SlideDeck,
} from './components';

const slides = [
  { id: 'slide-home', label: 'Welcome', content: <Content /> },
  { id: 'slide-teacher', label: 'The teacher', content: <AboutMe /> },
  { id: 'slide-path', label: 'The practice', content: <Path /> },
  { id: 'slide-studios', label: 'Studios and classes', content: <Studios /> },
  { id: 'slide-life', label: 'Off the mat', content: <Life /> },
  { id: 'slide-namaste', label: 'Namaste', theme: 'dark', content: <Closing /> },
];

const App = () => {
  return (
    <>
      <Navbar />
      <SlideDeck slides={slides} />
    </>
  );
};

export default App;
