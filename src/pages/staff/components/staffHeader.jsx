import Button from 'components/button';
import React, { useState } from 'react';
import sort from 'media/svgs/sort.svg';
import filter from 'media/svgs/filter.svg';
import SVG from 'components/renderSvg';
import AddTrainer from 'pages/setup/pages/addTrainer';

const StaffHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className='my-2 flex justify-between items-center px-2 flex-wrap'>
      <div className='flex space-x-2 items-center'>
        <Button
          title='Add Trainer'
          isplus
          variant='primary'
          onClick={() => setOpen(true)}
        />
      </div>
      <div className='flex items-center space-x-2 xs:mt-3 mt-0'>
        <div className='flex items-center justify-center space-x-2 border border-solid border-1 rounded-[10px] w-[93px] h-[32px]'>
          <p>Sort</p>
          <SVG icon={sort} />
        </div>

        <div className='flex items-center justify-center  space-x-2 border border-solid border-1 rounded-[10px] w-[93px] h-[32px]'>
          <p>Filter</p>
          <SVG icon={filter} />
        </div>
      </div>
      <AddTrainer isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default StaffHeader;
