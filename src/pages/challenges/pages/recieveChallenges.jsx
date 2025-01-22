import React from 'react';
import back from 'media/svgs/back.svg';
import { useNavigate } from 'react-router-dom';
import SVG from 'components/renderSvg';
import ChallengesRecieved from '../components/recievedChallenges';

const GoBack = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className='flex items-center space-x-3'>
        <SVG
          icon={back}
          className='cursor-pointer'
          onClick={() => navigate(-1)}
        />
        <p className='font-medium text-xl'>Challenges Recieved</p>
      </div>
    </>
  );
};

const RecieveChallenges = () => {
  return (
    <div>
      <GoBack />

      <ChallengesRecieved />
    </div>
  );
};

export default RecieveChallenges;
