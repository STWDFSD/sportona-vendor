import React, { useState } from 'react';

import InputField from 'components/inputField';
import { CiCalendar } from 'react-icons/ci';
import { CiLocationOn } from 'react-icons/ci';
import DateField from 'components/datepicker';
import Select from 'components/dropdown';
import ProfileInputItem from 'pages/setup/components/profileInputItem';
import ButtonSelector from 'components/buttonSelector';
const events = [
  {
    title: 'Kickboxing Event',
    date: '21 june to 22 june',
    time: '2am to 4pm',
    city: 'Bradford',
  },
  {
    title: 'Kickboxing Event',
    date: '21 june to 22 june',
    time: '2am to 4pm',
    city: 'Bradford',
  },
];
const AddEventsForm = ({ showEventForm }) => {
  const [date, setDate] = useState('');
  return (
    <>
      {showEventForm ? (
        <div className='flex flex-col space-y-4 mt-3'>
          <div className='flex flex-col space-y-2'>
            <p>Title</p>
            <p className='text-secondary'>Name of the Event</p>
            <InputField placeholder={'Title here'} text='text' />
          </div>
          <div className='flex flex-col space-y-2'>
            <p>Date</p>
            <p className='text-secondary'>Date of the event</p>
            <div className='flex items-center space-x-3'>
              <DateField
                className='border border-1 border-solid rounded-[12px]'
                placeholder={'Select'}
                onChange={date => setDate(date)}
                value={date}
                onClear={() => setDate('')}
                type='date'
                name='startDate'
              />
              <p>To</p>
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

            <ProfileInputItem label={'Time'} desc='Set the time of Event'>
              <div className='flex gap-3'>
                <ButtonSelector value='Starting'>
                  <input
                    type='time'
                    className='border-none bg-transparent outline-none text-center'
                    onChange={e => {
                      console.log(e);
                    }} // Handle time change
                  />
                </ButtonSelector>

                <ButtonSelector value='Finishing'>
                  <input
                    type='time'
                    className='border-none bg-transparent outline-none text-center'
                    onChange={e => {
                      console.log(e);
                    }} // Handle time change
                  />
                </ButtonSelector>
              </div>
            </ProfileInputItem>
          </div>
          <div className='flex flex-col space-y-2'>
            <p>City</p>
            <p className='text-secondary'>Location of the Event</p>
            <Select
              className='border border-1 border-solid rounded-[12px]'
              placeholder={'Select  City'}
              onChange={() => {}}
              value={'Bradford'}
            />
          </div>
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-3 mt-4'>
          {events.map(data => (
            <div className='border border-solid border-1 p-3 rounded-[8px] col-span-1 '>
              <p className='text-[16px] text-primary font-medium'>
                {data?.title}
              </p>
              <div className='flex items-center space-x-3 p-1 mt-2'>
                <CiCalendar />
                <p className='text-[14px] flex space-x-5 items-center w-full'>
                  <span> {data?.date}</span>
                  <span>{data?.time}</span>
                </p>
              </div>
              <div className='flex items-center space-x-3 p-1'>
                <CiLocationOn />
                <p className='text-[14px]'>{data?.city}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AddEventsForm;
