import React from 'react';

export default function WaveBackground({ fillColor = 'currentColor' }) {
  return (
   
    <div className="absolute inset-x-0 bottom-0 pointer-events-none z-20"> 
      <svg
        className="w-full h-auto"
        viewBox="0 0 1440 100" 
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 0 100 L 0 0 C 400 85, 1000 85, 1440 0 L 1440 100 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
}