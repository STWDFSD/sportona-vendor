'use client';
import React from 'react';
// @import dependency
import { useSelector } from 'react-redux';
// @Import style
import styles from './index.module.scss';

export function PageLoader() {
  return (
    <div className={`${styles.loaderWrapper}`}>
      <div className={styles.loader}>
        <div
          className={`z-50 size-6 animate-spin rounded-full border-y-2 border-solid   border-gray-900`}
        ></div>
      </div>
    </div>
  );
}

function Loader() {
  const { isLoading } = useSelector(state => state.loader);
  return isLoading ? <PageLoader /> : null;
}

export default Loader;
