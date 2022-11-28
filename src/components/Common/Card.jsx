import React from 'react';
import './styles.css';

const Card = ({ data }) => {
  return (
    <div className="card">
      <div className="image">
        <img src={data?.image} alt="image" />
      </div>
      <div className="details">
        <div className="title">{data?.title}</div>
        <div className="description">{data?.description}</div>
        <div className="timings">{data?.timings}</div>
      </div>
    </div>
  );
};

export default Card;
