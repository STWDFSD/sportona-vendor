import React from 'react';
import { SlLocationPin } from 'react-icons/sl';
import { BsClock } from 'react-icons/bs';
import { CiCalendar } from 'react-icons/ci';
import { useMemo } from 'react';

const daysList = [
  { label: 'M', value: 'monday' },
  { label: 'T', value: 'tuesday' },
  { label: 'W', value: 'wednesday' },
  { label: 'T', value: 'thursday' },
  { label: 'F', value: 'friday' },
  { label: 'S', value: 'saturday' },
  { label: 'S', value: 'sunday' },
];

const DetailCard = ({ setIsOpen, data }) => {
  const days = useMemo(() => {
    if (data?.trainingDays?.length) {
      return daysList?.filter(x => data?.trainingDays?.includes(x?.value));
    } else {
      return daysList;
    }
  }, [data]);

  return (
    <div className='border border-1 shadow-md border-solid rounded-lg p-3'>
      <div className='flex justify-between items-center'>
        <p className='text-primary text-[18px] font-medium'>{data?.name}</p>
        <span
          className='bg-[#F7F7F8] p-2 rounded-[12px] cursor-pointer'
          onClick={() => setIsOpen({ open: true, data: 'editdetails' })}
        >
          Edit
        </span>
      </div>
      <div className='flex flex-col space-y-5 py-5'>
        <div className='flex items-center space-x-3'>
          <SlLocationPin className='size-4' color='#7047EB' />
          <p className='text-primary text-[16px] font-medium'>
            {data?.address}
          </p>
        </div>
        <div className='flex items-center space-x-3'>
          <BsClock className='size-4' color='#7047EB' />
          <p className='text-primary text-[16px] font-medium'>
            {data?.availableTime?.starttime} - {data?.availableTime?.endtime}
          </p>
        </div>
        <div className='flex items-center space-x-3'>
          <CiCalendar className='size-5' color='#7047EB' />
          <div className='flex items-center space-x-4'>
            {days.map(x => (
              <p className='bg-[#F7F7F8] rounded-lg px-3 text-center'>
                {x?.label}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCard;
