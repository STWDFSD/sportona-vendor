import SVG from 'components/renderSvg';
import React from 'react';

const SideModal = ({
  isOpen,
  onClose,
  children,
  title = '',
  icon = null,
  footer = null,
}) => {
  return (
    // Modal overlay
    <div
      className={`fixed inset-0  flex justify-end transition-opacity duration-300 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      style={{ zIndex: 999999 }}
    >
      {/* Modal backdrop */}
      <div
        className='fixed inset-0 bg-black bg-opacity-50 '
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div
        className={`bg-white xs:w-[80vw]  md:w-[70vw] lg:w-[60vw] xl:w-[35vw] h-[95vh] my-3 transition-transform duration-300 rounded-md ${
          isOpen ? 'translate-x-[-20px]' : 'translate-x-full'
        }`}
      >
        <div className='p-4 h-full flex flex-col'>
          {/* Modal header */}
          <div className='flex justify-between items-center'>
            <div className='flex items-center space-x-4 p-2 divide-x-2'>
              <SVG icon={icon} />
              <h2 className='text-lg font-bold pl-3'>{title}</h2>
            </div>
            <button
              className='bg-gray-50 text-2xl rounded-full text-gray-900'
              onClick={onClose}
            >
              &times;
            </button>
          </div>

          {/* Modal body */}
          <div className='mt-4 flex-grow overflow-auto'>{children}</div>
          {footer && <div className='mt-4 border-t pt-4'>{footer}</div>}
        </div>
      </div>
    </div>
  );
};

export default SideModal;
