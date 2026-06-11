import React from 'react';

// Decorative line-art mandala, used as a faint background ornament.
const Mandala = ({ className = '' }) => {
  const petals = 24;
  const ticks = 48;
  return (
    <svg
      viewBox="0 0 400 400"
      className={`mandala ${className}`}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="200" cy="200" r="196" strokeWidth="0.6" />
      <circle cx="200" cy="200" r="168" strokeWidth="0.6" />
      <circle cx="200" cy="200" r="110" strokeWidth="0.6" />
      <circle cx="200" cy="200" r="36" strokeWidth="0.8" />
      {Array.from({ length: petals }, (_, i) => (
        <ellipse
          key={`p-${i}`}
          cx="200"
          cy="128"
          rx="22"
          ry="66"
          strokeWidth="0.6"
          transform={`rotate(${(i * 360) / petals} 200 200)`}
        />
      ))}
      {Array.from({ length: ticks }, (_, i) => {
        const a = ((i * 360) / ticks) * (Math.PI / 180);
        return (
          <line
            key={`t-${i}`}
            x1={200 + Math.cos(a) * 172}
            y1={200 + Math.sin(a) * 172}
            x2={200 + Math.cos(a) * 192}
            y2={200 + Math.sin(a) * 192}
            strokeWidth="0.6"
          />
        );
      })}
    </svg>
  );
};

export default Mandala;
