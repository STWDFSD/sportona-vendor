import SVG from 'components/renderSvg';
import React from 'react';

const InfoSection = ({ icon, count = '', text = '' }) => {
  return (
    <div className='border  border-solid rounded-[10px] h-[100px] flex space-x-5 px-6 py-8 items-center'>
      <div className='flex justify-center w-14'>
        <SVG icon={icon} />
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-[25px] text-primary'>{count}</p>
        <p className='text-[20px] text-[#6C6C89]'>{text}</p>
      </div>
    </div>
  );
};

export default InfoSection;
