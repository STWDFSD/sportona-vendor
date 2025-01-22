import React from 'react';

const PaperBlock = props => {
  const { title, children, height, downloadTableData } = props;
  return (
    <div
      key={location.pathname}
      className='flex  flex-col overflow-hidden rounded-[30px] border  bg-white xs:m-[15px] sm:mx-[40px] sm:mb-[30px]   sm:mt-[40px]'
      style={{ height }}
    >
      <div
        className={`flex min-h-[80px] items-center justify-between bg-white  px-[30px]`}
      >
        <span className='text-[28px] font-medium text-[#272A31]'>
          {title && title}
        </span>
      </div>
      <section className='flex w-full gap-2  px-[30px]'>
        {downloadTableData}
      </section>

      <section className='grow overflow-auto p-4'>{children}</section>
    </div>
  );
};

export default PaperBlock;
