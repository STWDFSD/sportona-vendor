import React, { useState } from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa6';
const MonthNavigator = () => {
  const [date, setDate] = useState(new Date());

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const handlePrevMonth = () => {
    setDate(
      prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setDate(
      prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1)
    );
  };

  return (
    <div className='flex items-center'>
      <button
        onClick={handlePrevMonth}
        className='p-2 bg-[#F7F7F8] rounded-md hover:bg-gray-300'
      >
        <FaArrowLeft />
      </button>
      <span className='mx-4 font-semibold'>
        {months[date.getMonth()]} {date.getFullYear()}
      </span>
      <button
        onClick={handleNextMonth}
        className='p-2 bg-[#F7F7F8]  rounded-md hover:bg-gray-300'
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default MonthNavigator;
