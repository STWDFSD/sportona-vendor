import Button from 'components/button';
import DateRange from 'components/dateRange';
import React from 'react';

const formFields = [
  { label: 'Start Date', value: '2024-09-01' }, // Example date for Start Date
  { label: 'End Date', value: '2024-09-30' }, // Example date for End Date
  { label: 'Batch Size', value: 100 }, // Example batch size
  { label: 'Batch SKU', value: 'SKU12345' }, // Example SKU
  { label: 'Location', value: 'Warehouse A' }, // Example location
  { label: 'Proposed Cost', value: 5000.0 }, // Example proposed cost in currency
];

const BasicInfo = () => {
  return (
    <div className=' w-full'>
      {formFields.map(x => (
        <div className='flex justify-between items-centertext-[#6C6C89] space-y-6'>
          <p className='text-[#6C6C89] text-[16px]'>{x.label}</p>
          <p className='text-primary text-[16px] font-medium'>{x.value}</p>
        </div>
      ))}
    </div>
  );
};

const Trainers = () => {
  return (
    <div className='flex flex-col space-y-3'>
      <div className='flex flex-col space-y-1'>
        <p className='text-primary text-[16px] font-medium'>Trainers</p>
        <p className='text-[#6C6C89] text-[16px]'>
          Trainers assign to this batch
        </p>
      </div>

      <div className='flex space-x-3 items-center'>
        <div className='w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold'>
          A
        </div>
        <div className='w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center text-xl font-bold'>
          B
        </div>
        <div className='w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center text-xl font-bold'>
          C
        </div>
      </div>
    </div>
  );
};

const SideSection = () => {
  const handleChange = dates => {};
  return (
    <div className='p-3'>
      <BasicInfo />
      <Trainers />
      <DateRange onDateChange={handleChange} />
      <div className='mt-3'>
        <p className='font-medium text-primary py-2'>Trainees 24</p>
        <div className='flex flex-wrap gap-3 '>
          {Array.from({ length: 24 }).map(x => (
            <div className='w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center text-xl font-bold'>
              B
            </div>
          ))}
        </div>
      </div>
      <div className=' flex items-center space-x-3 mt-3'>
        <Button variant='outline' title='Edit' />
        <Button variant='outline' title='Freeze' />
        <Button variant='danger' title='Kick Out' />
      </div>
    </div>
  );
};

export default SideSection;
