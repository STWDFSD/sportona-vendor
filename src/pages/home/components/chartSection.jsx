import LineChart from 'components/chart/linechart';
import SVG from 'components/renderSvg';
import React from 'react';
import { VscPerson } from 'react-icons/vsc';
import dollar from 'media/svgs/dollar.svg';
import incurred from 'media/svgs/incurred.svg';
import arrowup from 'media/svgs/arrowup.svg';

const ChartSection = () => {
  return (
    <div className='w-full grid grid-cols-12 gap-2 p-2'>
      <div className='xl:col-span-6 lg:col-span-12 border border-1 border-solid rounded-[12px]'>
        <div className='p-4 flex flex-col '>
          <div className='flex items-center space-x-2'>
            <VscPerson size={20} />
            <p className='text-primary font-medium'>Total Subscribers</p>
          </div>
          <div className='flex items-center space-x-4 py-2 flex-wrap'>
            <p className='text-[24px]'>$0</p>
            <div className='bg-[#EEFBF4] rounded-md p-2 w-16 size-10 flex items-center flex-wrap space-x-1'>
              <SVG icon={arrowup} />
              <span>0%</span>
            </div>
          </div>
          {/* <p className='text-secondary'>vs 179 last period</p> */}
        </div>
        <LineChart />
      </div>
      <div className='xl:col-span-3  xs:col-span-12 border border-1 border-solid rounded-[12px]'>
        <div className='p-4 flex flex-col '>
          <div className='flex items-center space-x-2'>
            <SVG icon={dollar} />
            <p className='text-primary font-medium'>Revenue</p>
          </div>
          <div className='flex items-center space-x-4 py-2 flex-wrap'>
            <p className='text-[24px]'>$0</p>
            <div className='bg-[#EEFBF4] rounded-md p-2 w-16 size-10 flex items-center  space-x-1'>
              <SVG icon={arrowup} />
              <span>0%</span>
            </div>
          </div>
          {/* <p className='text-secondary'>vs £14,155.24 last period</p> */}
        </div>
        <LineChart />
      </div>
      <div className='xl:col-span-3 xs:col-span-12 border border-1 border-solid rounded-[12px]'>
        <div className='p-4 flex flex-col '>
          <div className='flex items-center space-x-2'>
            <SVG icon={incurred} />
            <p className='text-primary font-medium'>Cost Incurred</p>
          </div>
          <div className='flex items-center space-x-4 py-2 flex-wrap '>
            <p className='text-[24px]'>$0</p>
            <div className='bg-[#EEFBF4] rounded-md p-2 w-16 size-10 flex items-center  space-x-1'>
              <SVG icon={arrowup} />
              <span>0%</span>
            </div>
          </div>
          {/* <p className='text-secondary'>vs £14,155.24 last period</p> */}
        </div>
        <LineChart />
      </div>
    </div>
  );
};

export default ChartSection;
