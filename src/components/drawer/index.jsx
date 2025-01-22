import React from 'react';

const Drawer = ({ isOpen, toggleDrawer, children }) => {
  return (
    <>
      <div
        className={` bg-primary   transition-opacity ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={toggleDrawer}
      ></div>

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary shadow-lg transition-transform duration-500${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className=''>{children}</div>
      </div>
    </>
  );
};

export default Drawer;
