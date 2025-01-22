import SVG from 'components/renderSvg';
import React, { useEffect } from 'react';

const Modal = ({
  isOpen,
  onClose,
  size = 'xl',
  children,
  isCancel,
  title = '',
  icon = null,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    xs: 'w-11/12 max-w-xs',
    sm: 'w-11/12 sm:w-3/4 max-w-sm',
    md: 'w-11/12 sm:w-3/4 md:w-1/2 max-w-md',
    lg: 'w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 max-w-lg',
    xl: 'w-[70%] h-[95vh]',
  };

  return (
    <div
      className='fixed inset-0 z-50 flex min-h-screen w-full min-w-full items-center justify-center'
      style={{ zIndex: 99999 }}
    >
      {/* Background overlay without onClick */}
      <div className='fixed inset-0 bg-black opacity-50'></div>
      <div
        className={`relative z-10 overflow-hidden rounded-lg bg-white p-4 shadow-lg ${sizeClasses[size]}`}
      >
        <button
          className='bg-gray-50 text-2xl absolute right-10 top-6 rounded-full text-gray-900'
          onClick={onClose}
        >
          &times;
        </button>
        <div className='flex items-center space-x-4'>
          {icon !== null && <SVG icon={icon} />}
          {title && (
            <p className='text-primary font-medium text-[20px]'>{title}</p>
          )}
        </div>

        <div className='overflow-y-auto p-4'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
