import React from 'react';
import Card from '@components/Common/Card';
import classes from '@data/classes';
import './classes.css';

const Classes = () => {
  return (
    <section id="classes">
      <div className="container">
        {classes.map(function (_class, index) {
          return <Card key={index} data={_class} />;
        })}
      </div>
    </section>
  );
};

export default Classes;
