import React from 'react';

const SVG = ({ icon, className = '', onClick }) => {
  return (
    <img
      src={icon}
      alt="icon"
      className={className}
      onClick={onClick}
    />
  );
};

export default SVG;
