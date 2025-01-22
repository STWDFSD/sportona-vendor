import React, { useState } from 'react';
// @import components
import SVG from 'components/renderSvg';
// @import media
import leftShift from 'media/svgs/leftShift.svg';
import rightShift from 'media/svgs/rightShift.svg';

const ShiftList = ({ left, right, setRight, setLeft }) => {
  const [selectedLeftItems, setSelectedLeftItems] = useState([]);
  const [selectedRightItems, setSelectedRightItems] = useState([]);

  const handleLeftSelect = item => {
    if (selectedLeftItems?.includes(item)) {
      setSelectedLeftItems(selectedLeftItems?.filter(x => x !== item));
    } else {
      setSelectedLeftItems([...selectedLeftItems, item]);
    }
  };

  const handleRightSelect = item => {
    if (selectedRightItems?.includes(item)) {
      setSelectedRightItems(selectedRightItems?.filter(x => x !== item));
    } else {
      setSelectedRightItems([...selectedRightItems, item]);
    }
  };

  const handleMove = direction => {
    if (direction === 'right' && selectedLeftItems.length > 0) {
      setRight([...right, ...selectedLeftItems]);
      setLeft(left?.filter(item => !selectedLeftItems?.includes(item)));
      setSelectedLeftItems([]);
    } else if (direction === 'left' && selectedRightItems.length > 0) {
      setLeft([...left, ...selectedRightItems]);
      setRight(right?.filter(item => !selectedRightItems.includes(item)));
      setSelectedRightItems([]);
    }
  };

  return (
    <div className='mt-3 flex flex-col gap-3 xs:w-full  lg:w-3/5 xl:w-2/5'>
      <label htmlFor='' className='font-medium'>
        Select Rights
      </label>
      <section className='flex h-auto w-full  overflow-hidden rounded-[12px] border border-solid border-[#B4B5BB] p-4'>
        <div className='flex w-2/5 flex-col gap-y-2'>
          {left.map(item => (
            <span
              key={item?.rightId}
              title={item?.rightName} // Tooltip added here
              className={`cursor-pointer truncate text-[16px] font-normal ${
                selectedLeftItems?.includes(item)
                  ? 'rounded-md bg-primary p-2 text-white'
                  : 'rounded-md bg-inherit p-2'
              }`}
              onClick={() => handleLeftSelect(item)}
            >
              {item?.rightName || ''}
            </span>
          ))}
        </div>
        <div className='flex w-1/5 flex-col items-center justify-center gap-y-2'>
          <span onClick={() => handleMove('left')}>
            <SVG icon={leftShift} className='cursor-pointer' />
          </span>
          <span onClick={() => handleMove('right')}>
            <SVG icon={rightShift} className='cursor-pointer' />
          </span>
        </div>
        <div className='flex w-2/5 flex-col gap-y-2 text-end'>
          {right?.map(item => (
            <span
              key={item?.rightId}
              title={item?.rightName} // Tooltip added here
              className={`cursor-pointer truncate text-[16px] ${
                selectedRightItems?.includes(item)
                  ? 'rounded-md bg-primary p-2 text-white'
                  : 'rounded-md bg-inherit p-2'
              }`}
              onClick={() => handleRightSelect(item)}
            >
              {item?.rightName || ''}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ShiftList;
