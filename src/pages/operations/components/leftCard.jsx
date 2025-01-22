import Button from 'components/button';
import React from 'react';

const LeftCard = ({ title, subTitle, note = false, onClick }) => {
  return (
    <div className='border border-1 border-solid rounded-lg px-3 py-[15px] flex justify-between items-center shadow-md'>
      <div className='flex flex-col space-y-3'>
        <p className='text-primary font-medium text-[18px]'>{title}</p>
        <p className='text-secondary  text-[16px]'>{subTitle}</p>
      </div>
      <div>
        {note ? (
          <Button
            title={subTitle ? 'Edit' : 'Add'}
            className='bg-[#F7F7F8]'
            onClick={() => onClick(subTitle)}
          />
        ) : (
          <Button title='Close Early' className='bg-[#FEF0F4] text-red-500' />
        )}
      </div>
    </div>
  );
};

export default LeftCard;
