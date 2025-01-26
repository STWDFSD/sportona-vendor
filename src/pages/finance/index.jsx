import BarChart from 'components/chart/barchart';
import LineChart from 'components/chart/linechart';
import React, { useState } from 'react';

import SVG from 'components/renderSvg';

import first from '../../media/svgs/finance/first.svg';
import last from '../../media/svgs/finance/last.svg';

const Finance = () => {
  const [period, setPeriod] = useState('Monthly');
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };

  const handlePrevMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const handleDownload = () => {
    // Implement report download logic here
    console.log('Downloading report...');
  };

  return (
    <div className='p-2'>
      <div className='flex justify-between items-center w-[99%] mb-5'>
        <div className='flex items-center gap-2'>
          <select
            className='border rounded-md px-3 py-1'
            value={period}
            onChange={handlePeriodChange}
          >
            <option>Monthly</option>
            <option>Weekly</option>
            <option>Yearly</option>
          </select>
          <button className='p-2' onClick={handlePrevMonth}><span>←</span></button>
          <span>{formatDate(currentDate)}</span>
          <button className='p-2' onClick={handleNextMonth}><span>→</span></button>
        </div>
        <button
          className='flex items-center gap-2 border rounded-md px-3 py-1 ml-auto'
          onClick={handleDownload}
        >
          <span>Download Report</span>
          <span>↓</span>
        </button>
      </div>
      <BarChart />
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 my-4 w-[99%]'>
        <div className='col-span-1 border border-1 border-solid rounded-md'>
          <div className='p-4 flex flex-col'>
            <div className='flex justify-between items-center'>
              <p className='text-primary font-medium'>Total Cost</p>
              <div className='flex gap-4'>
                <div className='flex items-center gap-2'>
                  <span className='size-3 bg-black rounded-sm'>
                    <SVG icon={first} />
                  </span>
                  <span className='text-sm text-gray-600'>Fixed cost</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='size-3 bg-purple-400 rounded-sm'><SVG icon={last} /></span>
                  <span className='text-sm text-gray-600'>Variable cost</span>
                </div>
              </div>
            </div>
            <div className='flex items-center space-x-4 py-2'>
              <p className='text-[24px]'>£4,173.56</p>
              <div className='bg-green-200 rounded-md p-1 size-10 flex justify-center items-center'>
                23%
              </div>
            </div>
            <p className='text-secondary'>vs £3,213.64 last period</p>
          </div>
          <LineChart />
        </div>
        <div className='col-span-1 border border-1 border-solid rounded-md'>
          <div className='p-4 flex flex-col'>
            <div className='flex justify-between items-center'>
              <p className='text-primary font-medium'>Total Revenue</p>
              <div className='flex gap-4'>
                <div className='flex items-center gap-2'>
                  <span className='size-3 bg-black rounded-sm'><SVG icon={first} /></span>
                  <span className='text-sm text-gray-600'>Subscriptions</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='size-3 bg-purple-400 rounded-sm'><SVG icon={last} /></span>
                  <span className='text-sm text-gray-600'>Walk-in</span>
                </div>
              </div>
            </div>
            <div className='flex items-center space-x-4 py-2'>
              <p className='text-[24px]'>£4,173.56</p>
              <div className='bg-green-200 rounded-md p-1 size-10 flex justify-center items-center'>
                23%
              </div>
            </div>
            <p className='text-secondary'>vs £3,213.64 last period</p>
          </div>
          <LineChart />
        </div>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 mt-4 w-[99%]  '>
        <div className='col-span-1 border border-1 border-solid rounded-md'>
          <div className='p-4 flex flex-col'>
            <div className='flex justify-between items-center'>
              <p className='text-primary font-medium'>Cost Report</p>
              <div className='flex gap-4'>
                <div className='flex items-center gap-2'>
                  <span className='size-3 bg-black rounded-sm'><SVG icon={first} /></span>
                  <span className='text-sm text-gray-600'>Chosen period</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='size-3 bg-purple-400 rounded-sm'><SVG icon={last} /></span>
                  <span className='text-sm text-gray-600'>Last period</span>
                </div>
              </div>
            </div>
            <div className='flex items-center space-x-4 py-2'>
              <p className='text-[24px]'>£4,173.56</p>
              <div className='bg-green-200 rounded-md p-1 size-10 flex justify-center items-center'>
                23%
              </div>
            </div>
            <p className='text-secondary'>vs £3,213.64 last period</p>
          </div>
          <LineChart />
        </div>
        <div className='col-span-1 border border-1 border-solid rounded-md'>
          <div className='p-4 flex flex-col'>
            <div className='flex justify-between items-center'>
              <p className='text-primary font-medium'>Profit</p>
              <div className='flex gap-4'>
                <div className='flex items-center gap-2'>
                  <span className='size-3 bg-black rounded-sm'><SVG icon={first} /></span>
                  <span className='text-sm text-gray-600'>Chosen period</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='size-3 bg-purple-400 rounded-sm'><SVG icon={last} /></span>
                  <span className='text-sm text-gray-600'>Last period</span>
                </div>
              </div>
            </div>
            <div className='flex items-center space-x-4 py-2'>
              <p className='text-[24px]'>£4,173.56</p>
              <div className='bg-green-200 rounded-md p-1 size-10 flex justify-center items-center'>
                23%
              </div>
            </div>
            <p className='text-secondary'>vs £3,213.64 last period</p>
          </div>
          <LineChart />
        </div>
      </div>
    </div>
  );
};

export default Finance;

