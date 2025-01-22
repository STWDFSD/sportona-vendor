import React, { useRef, useState } from 'react';
import SVG from 'components/renderSvg';
import edit from 'media/svgs/editholiday.svg';
import deleteicon from 'media/svgs/redDelete.svg';
import InputField from 'components/inputField';

import DateField from 'components/datepicker';

const AddHolidayForm = ({ showform }) => {
  const [date, setDate] = useState('');

  return (
    <>
      {showform ? (
        <div className='flex flex-col space-y-4 mt-3'>
          <div className='flex flex-col space-y-2'>
            <p>Title</p>
            <p className='text-secondary'>
              Name of the holiday you want to set
            </p>
            <InputField placeholder={'Title here'} text='text' />
          </div>
          <div className='flex flex-col space-y-2'>
            <p>Date</p>
            <p className='text-secondary'>Set a date of the holiday</p>
            <DateField
              className='border border-1 border-solid rounded-[12px]'
              placeholder={'Select'}
              onChange={date => setDate(date)}
              value={date}
              onClear={() => setDate('')}
              type='date'
              name='startDate'
            />
          </div>
        </div>
      ) : (
        <div>
          <div>
            <p className='text-secondary'>Manual Holidays</p>
            <div className='grid grid-cols-1 gap-3 mt-4 '>
              {Array.from({ length: 1 }).map(() => (
                <div className='col-span-1 border-1 border border-solid p-2 rounded-lg'>
                  <div className='flex items-center justify-between '>
                    <div className='flex items-center  space-x-4'>
                      <p className='bg-[#F7F7F8] p-2 rounded-lg'>
                        15 <br /> Sep
                      </p>
                      <div className='flex flex-col space-y-1'>
                        <p className='text-primary font-medium'>Eid Milads</p>
                        <p className='text-secondary'>in 2 days</p>
                      </div>
                    </div>
                    <div className='flex items-center space-x-4 pr-3'>
                      <SVG icon={edit} />
                      <SVG icon={deleteicon} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='mt-4'>
            <p className='text-secondary'>Automatic Holidays </p>
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
        </div>
      )}
    </>
  );
};

export default AddHolidayForm;
