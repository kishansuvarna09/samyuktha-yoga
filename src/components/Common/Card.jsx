import React from 'react';
import './styles.css';

const Card = ({ data }) => {
  return (
    <div className="card">
      <div className="image">
        <img
          src={data?.image}
          alt="image"
          className={
            data?.title === 'Weekend Workshop' &&
            `object-[0_-7rem] md:object-[0_-2rem]`
          }
        />
      </div>
      <div className="details">
        <div className="title">{data?.title}</div>
        <div className="grid place-items-center">
          {data?.subtitle}
        </div>
        <div className="description">{data?.description}</div>
        <div className="">
          {data?.timings &&
            data?.timings.map((item, index) => {
              return (
                <div key={index} className="timings italic">
                  {item}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Card;
