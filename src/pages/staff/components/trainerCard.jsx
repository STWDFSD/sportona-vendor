import Button from 'components/button';
import SVG from 'components/renderSvg';
import calender from 'media/svgs/calendar.svg';
import bookhours from 'media/svgs/bookhours.svg';
import candidates from 'media/svgs/candiates.svg';
import dots from 'media/svgs/dots.svg';
import React, { useState } from 'react';
import EditTrainer from 'pages/setup/pages/EditTrainer';

const TrainerCard = trainer => {
  const {
    name,
    services,
    trainingDays,
    startingTime,
    endingTime,
    toggle,
    avatar,
    setUserFeedback,
  } = trainer;
  const [editTrainer, setEditTrainer] = useState(false);
  const selectedDays = trainingDays
    ?.filter(day => day.isSelected)
    .map(day => day.day)
    .join(', ');

  const handleFeedback = () => {
    const userObj = {
      name,
      avatar,
      services,
      trainingDays,
      startingTime,
      endingTime,
    };

    setUserFeedback({
      show: true,
      data: userObj,
    });
  };

  return (
    <div className='col-span-1 border h-[270px] border-gray-400 rounded-lg py-2 px-4 shadow-md w-full'>
      {editTrainer && (
        <EditTrainer
          isOpen={editTrainer}
          onClose={() => setEditTrainer(false)}
          trainerData={trainer}
        />
      )}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <img
            src={avatar}
            alt={`${name} logo`}
            className='w-10 h-10 rounded-full'
          />
          <h2 className='text-lg font-bold mb-1'>{name}</h2>
        </div>
        <div className='flex flex-col'>
          {/* <Button
            title='Edit'
            variant='outline'
            onClick={() => setEditTrainer(true)}
          /> */}
        </div>
      </div>

      <div className='flex items-center flex-wrap space-x-3'>
        {services?.map((service, index) => (
          <p
            key={index}
            className='text-gray-600 mb-2 bg-[#FFF9EB] rounded-[5px] my-3 p-1'
          >
            {service}
          </p>
        ))}
      </div>

      <div className='my-4 flex items-center space-x-3'>
        <SVG icon={calender} />
        <p className='text-gray-600'>{selectedDays || 'No training days'}</p>
      </div>

      <div className='my-4 flex items-center space-x-3'>
        <SVG icon={bookhours} />
        <p className='text-gray-600'>
          {startingTime} - {endingTime}
        </p>
      </div>

      <div className='flex items-center space-x-2 justify-center w-full mt-4'>
        <Button
          title='Details'
          variant='outline'
          className='flex-1'
          onClick={toggle}
        />
        <Button
          title='Feedback'
          variant='outline'
          className='flex-1'
          onClick={handleFeedback}
        />
      </div>
    </div>
  );
};

export default TrainerCard;
