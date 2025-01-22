import SVG from 'components/renderSvg';
import React from 'react';
import event from 'media/svgs/events.svg';
import { CiCalendar } from 'react-icons/ci';
import { CiLocationOn } from 'react-icons/ci';
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

const Events = ({ setIsOpen2 }) => {
  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex items-center space-x-5'>
          <SVG icon={event} />
          <p>Events</p>
        </div>
        <div
          className='bg-[#F7F7F8] p-2 rounded-lg cursor-pointer'
          onClick={() => setIsOpen2({ open: true, data: 'event' })}
        >
          Manage
        </div>
      </div>
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
    </div>
  );
};

export default Events;
