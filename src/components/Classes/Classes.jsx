import React from 'react';
import Card from '@components/Common/Card';
import classes from '@data/classes';
import './classes.css';

const Classes = () => {
  return (
    <section id="classes">
      <div className="container">
        {classes.map(function (name, index) {
          return <Card key={index} data={name} />;
        })}
      </div>
    </section>
  );
};

export default Classes;
