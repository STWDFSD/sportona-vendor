import BarChart from 'components/chart/barchart';
import LineChart from 'components/chart/linechart';
import React from 'react';

const Finance = () => {
  return (
    <div className='p-2'>
      <BarChart />
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 my-4'>
        <div className='col-span-1 border border-1 border-solid rounded-md'>
          <div className='p-4 flex flex-col '>
            <p className='text-primary font-medium'>Total Cost</p>
            <div className='flex items-center space-x-4 py-2'>
              <p className='text-[24px]'>£0</p>
              <div className='bg-green-200 rounded-md p-1 size-10 flex justify-center items-center'>
                0%
              </div>
            </div>
            <p className='text-secondary'>vs £0 last period</p>
          </div>
          <LineChart />
        </div>
        <div className='col-span-1 border border-1 border-solid rounded-md'>
          <div className='p-4 flex flex-col '>
            <p className='text-primary font-medium'>Total Revenue</p>
            <div className='flex items-center space-x-4 py-2'>
              <p className='text-[24px]'>£0</p>
              <div className='bg-green-200 rounded-md p-1 size-10 flex justify-center items-center'>
                0%
              </div>
            </div>
            <p className='text-secondary'>vs £0 last period</p>
          </div>
          <LineChart />
        </div>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 mt-4'>
        <div className='col-span-1 border border-1 border-solid rounded-md'>
          <div className='p-4 flex flex-col '>
            <p className='text-primary font-medium'>Cost Report</p>
            <div className='flex items-center space-x-4 py-2'>
              <p className='text-[24px]'>£0</p>
              <div className='bg-green-200 rounded-md p-1 size-10 flex justify-center items-center'>
                0%
              </div>
            </div>
            <p className='text-secondary'>vs £0 last period</p>
          </div>
          <LineChart />
        </div>
        <div className='col-span-1 border border-1 border-solid rounded-md'>
          <div className='p-4 flex flex-col '>
            <p className='text-primary font-medium'>Profit</p>
            <div className='flex items-center space-x-4 py-2'>
              <p className='text-[24px]'>£0</p>
              <div className='bg-green-200 rounded-md p-1 size-10 flex justify-center items-center'>
                0%
              </div>
            </div>
            <p className='text-secondary'>vs £0 last period</p>
          </div>
          <LineChart />
        </div>
      </div>
    </div>
  );
};

export default Finance;
