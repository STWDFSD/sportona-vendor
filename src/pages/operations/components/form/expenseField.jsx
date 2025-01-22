import SVG from 'components/renderSvg';
import React, { useState } from 'react';
import wrap from 'media/svgs/Wrap.svg';

const ExpenseField = () => {
  const [value, setValue] = useState(0);

  const handleIncrement = () => {
    setValue(prevValue => prevValue + 1);
  };

  const handleDecrement = () => {
    setValue(prevValue => Math.max(0, prevValue - 1));
  };

  return (
    <div className='flex items-center border border-gray-300  rounded-md'>
      <SVG icon={wrap} className='ml-4' />
      <input
        type='number'
        value={value}
        onChange={e => setValue(Number(e.target.value))}
        className='w-16 flex-1 ml-4 border-none outline-none'
      />
      <div className='flex  ml-2'>
        <button
          onClick={handleDecrement}
          className='py-2 px-4 border border-gray-300 text-[#8A8AA3] text-xl  bg-white hover:bg-gray-100'
        >
          -
        </button>
        <button
          onClick={handleIncrement}
          className='py-2 px-4 border border-gray-300 text-[#8A8AA  bg-white hover:bg-gray-100'
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ExpenseField;
