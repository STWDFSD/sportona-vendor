import React, { useCallback, useEffect } from 'react';
// @import dependencies
import { useDispatch, useSelector } from 'react-redux';
// @import slices
import { closeAlert } from 'store/slices/alertSlice';
// @import media
import Close from 'media/svgs/close-circle-white.svg';
// @import styles
import styles from './index.module.scss';

function Alerts() {
  const { isAlertOpen, message, time, alertType } = useSelector(
    state => state.alert
  );

  const dispatch = useDispatch();

  const handelCloseAlert = useCallback(() => {
    dispatch(closeAlert());
  }, [dispatch]);

  useEffect(() => {
    let timerId = null;
    if (isAlertOpen) {
      timerId = setTimeout(() => handelCloseAlert(), time);
    }
    return () => clearTimeout(timerId);
  }, [isAlertOpen, handelCloseAlert, time]);

  if (!isAlertOpen) return null;

  return (
    <div className={`${styles.alert} ${styles[alertType]}`}>
      <span>{message}</span>{' '}
      <img src={Close} alt='close icon' onClick={handelCloseAlert} />
    </div>
  );
}

export default Alerts;
