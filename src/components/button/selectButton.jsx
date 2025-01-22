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
      className='flex items-center justify-between relative border border-gray-300 text-gray-700 rounded-lg w-28 px-2 py-1'
      style={{ width: width }} // Set fixed width
    >
      {/* Text Display */}
      <span className='text-start flex-grow text-primary font-medium px-2'>
        {options[selectedIndex]}
      </span>

      <span
        onClick={handleDecrement}
        className='cursor-pointer absolute top-[7px] right-2'
      >
        <FaCaretDown size={12} />
      </span>

      <span
        onClick={handleIncrement}
        className='cursor-pointer absolute top-[16px]  right-2'
      >
        <FaCaretUp size={12} />
      </span>
    </button>
  );
};

export default SelectButton;
