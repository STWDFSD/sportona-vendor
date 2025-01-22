import SVG from 'components/renderSvg';
import React from 'react';
import holiday from 'media/svgs/beach.svg';

const Holidays = ({ setIsOpen2 }) => {
  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex items-center space-x-5'>
          <SVG icon={holiday} />
          <p>Holidays</p>
        </div>
        <div
          className='bg-[#F7F7F8] p-2 rounded-lg cursor-pointer'
          onClick={() => setIsOpen2({ open: true, data: 'holiday' })}
        >
          Manage
        </div>
      </div>
      <div className='grid grid-cols-1 gap-3 mt-4 '>
        {Array.from({ length: 1 }).map(() => (
          <div className='col-span-1 border-1 border border-solid p-2 rounded-lg'>
            <div className='flex items-center space-x-4'>
              <p className='bg-[#F7F7F8] p-2 rounded-lg'>
                15 <br /> Sep
              </p>
              <div className='flex flex-col space-y-1'>
                <p className='text-primary font-medium'>Eid Milads</p>
                <p className='text-secondary'>in 2 days</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Holidays;
