import React from 'react';
import { ReactSVG } from 'react-svg';
import styles from './index.module.scss';

const SVG = ({ icon, className = '', fullSize = false, onClick }) => {
  return (
    <ReactSVG
      src={icon}
      className={`${className} ${fullSize ? styles.svgWrapper : ''}`}
      onClick={onClick}
    />
  );
};

export default SVG;
