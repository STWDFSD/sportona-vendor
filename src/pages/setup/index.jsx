// @import components
import ProfileSectionItem from './components/profileSectionItem';

// @import Media
import welcome from '../../media/pngs/Welcome.png';

// @import Components
import { useState } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector
import Profile from './pages/profile';
import Services from './pages/services';
import Business from './pages/business';
import AddTrainer from './pages/addTrainer';
import AddTrainigHall from './pages/addTrainigHall';

const Setup = () => {
  const [open, setOpen] = useState('');

  // Get the vender data from Redux store
  const venderData = useSelector(state => state.vender.venderData);

  // Profile setup items with boolean status based on venderData
  const ProfileSetupItems = [
    {
      title: 'Business Setup',
      subTitle: 'Take a first step to setup your business profile',
      btnText: 'Setup Profile',
      handleClick: () => setOpen('profile'),
      status: venderData?.profileCompleted || false, // Boolean value
    },
    {
      title: 'Add Service',
      subTitle: 'Blur flows selection rotate scale undo distribute.',
      btnText: 'Add Service',
      handleClick: () => setOpen('service'),
      status: venderData?.serviceCompleted || false, // Boolean value
    },
    {
      title: 'Add Trainer',
      subTitle: 'Include images for better response from customers',
      btnText: 'Add Trainer',
      handleClick: () => setOpen('trainer'),
      status: venderData?.addTrainer || false, // Boolean value
    },
    {
      title: 'Add Batch',
      subTitle: 'Take a first step to setup your business profile',
      btnText: 'Setup Batch',
      handleClick: () => setOpen('business'),
      status: venderData?.addBatch || false, // Boolean value
    },
    // {
    //   title: 'Add Training Hall',
    //   subTitle: 'Add the hall where the practices will happen',
    //   btnText: 'Add Training Hall',
    //   handleClick: () => setOpen('trainingHall'),
    //   status: venderData?.addHall || false, // Boolean value
    // },
  ];

  const renderComponent = () => (
    <>
      <Profile isOpen={open === 'profile'} onClose={() => setOpen('')} />
      <Services isOpen={open === 'service'} onClose={() => setOpen('')} />
      {open === 'business' && (
        <Business isOpen={open === 'business'} onClose={() => setOpen('')} />
      )}
      <AddTrainer isOpen={open === 'trainer'} onClose={() => setOpen('')} />
    </>
  );

  return (
    <div className='my-5'>
      <div className='mx-auto sm:max-w-2xl w-full'>
        <img src={welcome} alt='welcome' width={160} height={165} />
        <h2 className='mt-4 text-dark font-medium text-2xl'>
          Get started by setting up your panel
        </h2>
        <p className='text-[#6c6c89]'>
          Complete these simple steps to get your services & batches up and
          running
        </p>
        <ul className='mt-10 space-y-8'>
          {ProfileSetupItems?.map((item, index) => (
            <ProfileSectionItem index={index} {...item} key={item.title} />
          ))}
        </ul>
      </div>
      {renderComponent()}
    </div>
  );
};

export default Setup;
