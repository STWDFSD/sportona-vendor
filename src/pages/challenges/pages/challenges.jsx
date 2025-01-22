import React, { useState } from 'react';

import banner from 'media/pngs/banner.png';

import target from 'media/svgs/target-arrow.svg';
import ChallengeHeader from '../components/challengeHeader';
import CardSection from '../components/cardSection';
import SideModal from 'components/modal/SideModal';
import NewChallenge from '../components/newChallenge';

const AllChallenges = () => {
  const [modaldata, setModalData] = useState({
    isOpen: false,
    data: '',
  });
  const toggleModal = () => {
    setModalData({ isOpen: false, data: '' });
  };
  return (
    <>
      <div className='px-4'>
        <Banner />
        <ChallengeHeader setModalData={setModalData} />
        <div>
          <CardSection />
        </div>
      </div>
      <SideModal
        isOpen={modaldata.isOpen}
        onClose={toggleModal}
        title={'New Challenge'}
        icon={target}
      >
        <NewChallenge />
      </SideModal>
    </>
  );
};

export default AllChallenges;

const Banner = () => {
  return (
    <div className='flex w-full my-4 '>
      <img src={banner} alt='baner' className='w-full' />
    </div>
  );
};
