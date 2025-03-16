import React from 'react';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa'; // Import caret icons

const SelectButton = ({
  options,
  selectedIndex,
  setSelectedIndex,
  width = '110px',
}) => {
  // Default is 'Monthly'

  const handleDecrement = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleIncrement = () => {
    if (selectedIndex < options.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  return (
    <button
      className='flex relative items-center justify-between border border-gray-300 text-gray-700 rounded-lg w-28 px-2 py-1'
      style={{ width: width }} // Set fixed width
    >
      {/* Text Display */}
      <span className='text-start flex-grow text-primary font-medium mx-2 overflow-hidden'>
        {options[selectedIndex]}
      </span>

      <div className='flex flex-col content-around'>
        <span onClick={handleDecrement} className='cursor-pointer'>
          <FaCaretDown size={12} />
        </span>

        <span onClick={handleIncrement} className='cursor-pointer'>
          <FaCaretUp size={12} />
        </span>
      </div>
    </button>
  );
};

export default SelectButton;
