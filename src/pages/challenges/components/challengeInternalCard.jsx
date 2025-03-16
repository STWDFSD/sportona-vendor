import Button from 'components/button';
import SVG from 'components/renderSvg';
import React, { useState } from 'react';
import { SlLocationPin } from 'react-icons/sl';
import { BsClock } from 'react-icons/bs';
import { CiCalendar } from 'react-icons/ci';
import participantIcon from 'media/svgs/crowd.svg';
import right from 'media/svgs/caret-right.svg';
import down from 'media/svgs/caret-down.svg';
const ChallengeInternalCard = ({
  icon,
  clubName,
  inviteStatus,
  internalOrExternal,
  service,
  level,
  location,
  date,
  time,
  participant,
}) => {
  const [isShow, setIsShow] = useState(false);
  const showDetails = () => {
    setIsShow(prev => !prev);
  };
  return (
    <div className='border border-1 border-solid rounded-lg p-4'>
      <AvatarUi />
      <div className='py-4 flex items-center space-x-3'>
        <div className='px-2 py-1 bg-[#F7F7F8] rounded-lg'>
          {internalOrExternal || 'External'}
        </div>
        <div className='px-2 py-1 bg-[#FFF9EB] rounded-lg'>
          {service || 'Football'}
        </div>
        <div className='px-2 py-1 bg-[#FEECFB] rounded-lg'>
          {level || 'Legend'}
        </div>
      </div>
      <div className='my-2 flex  space-y-4 flex-col'>
        <div className='flex space-x-3 items-center'>
          <SlLocationPin className='size-5' color='#7047EB' />
          <p>{location || '1901 Thornridge Cir. Shiloh, Hawaii 81063'}</p>
        </div>
        <div className='flex items-center space-x-3'>
          <CiCalendar className='size-6' color='#7047EB' />
          <p>{date || '21 june to 22 june'}</p>
          <BsClock className='size-5' color='#7047EB' />
          <p>{time || '6pm - 7pm'}</p>
        </div>
        <div className='flex items-center space-x-3'>
          <SVG icon={participantIcon} className='size-6' color='#7047EB' />
          <p>{participant || '05 Participants'}</p>
        </div>
      </div>
      <hr className='my-2' />
      <Button
        className='text-[#4316CA] my-3 w-full bg-[#F4F1FD]'
        title='Schedule'
      />
      <hr className='my-2' />
      <div
        className='my-2 flex cursor-pointer justify-between items-center relative'
        onClick={showDetails}
      >
        <p className='text-secondary'>Participants Details</p>
        <SVG icon={isShow ? down : right} className='cursor-pointer' />
      </div>
      {isShow && (
        <div className='grid grid-cols-2 gap-2 px-2'>
          <div className='col-span-1 flex-flex-col'>
            <p>Yours</p>
            {Array.from({ length: 5 }).map(x => (
              <div className='flex items-center space-x-2 mt-3'>
                <div className='w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-xl font-bold'>
                  B
                </div>
                <p> Steve Smith</p>
              </div>
            ))}
          </div>
          <div className='col-span-1'>
            <p>Opponents</p>
            {Array.from({ length: 5 }).map(x => (
              <div className='flex items-center space-x-2 mt-3'>
                <div className='w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center text-xl font-bold'>
                  Z
                </div>
                <p>David Warner</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeInternalCard;

const AvatarUi = () => {
  return (
    <div className='flex items-center justify-start space-x-10'>
      {/* Team A */}
      <div className='relative flex flex-1'>
        {/* First Avatar */}
        <div className='w-12 h-12 rounded-full border-4 border-white bg-gray-300'>
          <div className='w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center text-xl font-bold'>
            B
          </div>
        </div>
        {/* Second Avatar */}
        <div className='w-12 h-12 rounded-full border-4 border-white bg-gray-300 absolute left-8 top-0'>
          <div className='w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center text-xl font-bold'>
            B
          </div>
        </div>
        {/* Third Avatar */}
        <div className='w-12 h-12 rounded-full border-4 border-white bg-gray-300 absolute left-16 top-0'>
          <div className='w-12 h-12 rounded-full bg-gray-700 opacity-50 text-white flex items-center justify-center text-xl font-bold'>
            +2
          </div>
        </div>
      </div>

      {/* VS Text */}
      <div className='text-[16px] font-bold text-primary'>VS</div>

      {/* Team B */}
      <div className='relative flex flex-1'>
        {/* First Avatar */}
        <div className='w-12 h-12 rounded-full border-4 border-white bg-gray-300'>
          <div className='w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center text-xl font-bold'>
            B
          </div>
        </div>
        {/* Second Avatar */}
        <div className='w-12 h-12 rounded-full border-4 border-white bg-gray-300 absolute left-8 top-0'>
          <div className='w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center text-xl font-bold'>
            B
          </div>
        </div>
        {/* Third Avatar */}
        <div className='w-12 h-12 rounded-full border-4 border-white bg-gray-300 absolute left-16 top-0'>
          <div className='w-12 h-12 rounded-full bg-gray-700 opacity-50 text-white flex items-center justify-center text-xl font-bold'>
            +2
          </div>
        </div>
      </div>
    </div>
  );
};
