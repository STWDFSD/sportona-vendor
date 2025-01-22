import React from 'react';
import ChallengeExternalCard from './ChallengeExternalCard';
import { useSelector } from 'react-redux';
import ChallengeInternalCard from './challengeInternalCard';

const CardSection = () => {
  const { status } = useSelector(state => state.challenges);

  return (
    <div className='grid xs:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 my-3'>
      <div className='col-span-1  flex flex-col space-y-4'>
        {status === 'External Only' ? (
          <ChallengeExternalCard />
        ) : (
          <ChallengeInternalCard />
        )}
        {status === 'External Only' ? (
          <ChallengeExternalCard />
        ) : (
          <ChallengeInternalCard />
        )}
      </div>
      <div className='col-span-1 flex flex-col space-y-4'>
        {status === 'External Only' ? (
          <ChallengeExternalCard />
        ) : (
          <ChallengeInternalCard />
        )}
        {status === 'External Only' ? (
          <ChallengeExternalCard />
        ) : (
          <ChallengeInternalCard />
        )}
        {status === 'External Only' ? (
          <ChallengeExternalCard />
        ) : (
          <ChallengeInternalCard />
        )}
      </div>
      <div className='col-span-1  flex flex-col space-y-4'>
        {status === 'External Only' ? (
          <ChallengeExternalCard />
        ) : (
          <ChallengeInternalCard />
        )}
        {status === 'External Only' ? (
          <ChallengeExternalCard />
        ) : (
          <ChallengeInternalCard />
        )}
      </div>
    </div>
  );
};

export default CardSection;
