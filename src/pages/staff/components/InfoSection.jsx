import SVG from 'components/renderSvg';
import React from 'react';
import key from 'media/svgs/trainerInfo.svg';
import Button from 'components/button';
import DateRangeComponent from 'components/dateRange';
import vendorLogo from 'media/svgs/venderLogo.svg';
import paypal from 'media/svgs/paypal.svg';
import bankAccount from 'media/svgs/bankAccount.svg';

const InfoSection = ({ trainer }) => {
  return (
    <div className='p-6  overflow-auto h-[90vh]'>
      <div className='flex items-center space-x-4'>
        <SVG icon={key} />
        <p className='font-medium text-primary text-[18px]'>Trainer Info</p>
      </div>
      <UserInfo trainer={trainer} />

      <UserDetails trainer={trainer} />
      <hr />
      <TimeSection />
      <hr />
      <div className='py-6'>
        <p>Ongoing batches (01)</p>
        <BatchCard />
      </div>
    </div>
  );
};

export default InfoSection;

const UserInfo = ({ trainer }) => {
  return (
    <div className='my-8 flex justify-between items-center'>
      <div className='flex items-center space-x-6'>
        {trainer?.avatar ? (
          <img
            src={trainer?.avatar}
            alt='trainer'
            className='w-16 h-16 rounded-full'
          />
        ) : (
          <div className='w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold uppercase'>
            {trainer?.Fname[0]}
          </div>
        )}

        <div className='flex flex-col space-y-1'>
          <p className='text-primary text-[20px] font-medium'>
            {trainer?.Fname} {trainer?.Lname}
          </p>
          <p className='text-secondary text-[16px]'>@{trainer?.Fname}</p>
        </div>
      </div>
      <div className='flex items-center space-x-3'>
        <Button title='Edit' variant={'outline'} />
        <Button title='Freeze' variant={'outline'} />
        <Button
          title='Kick Out'
          variant={'outline'}
          className='bg-red-50 text-red-500'
        />
      </div>
    </div>
  );
};

const UserDetails = ({ trainer }) => {
  const addDate = trainer?.createdAt?.toDate
    ? trainer.createdAt.toDate()
    : null;

  // Format the date or fallback to 'N/A'
  // const addDate = createdAt ? format(createdAt, 'dd MMM yyyy') : 'N/A';
  return (
    <>
      <div className='grid grid-cols-3 gap-6'>
        <div className='col-span-1 flex justify-between items-center'>
          <div>
            <p className=' text-secondary'>Joining date</p>
          </div>
          {/* {trainer} */}
          <p className='text-primary font-medium'></p>
        </div>
        <div className='col-span-1'>
          <div className='col-span-1 flex justify-between items-center'>
            <div>
              <p className=' text-secondary '>Hours worked</p>
            </div>
            <p className='text-primary font-medium'>150</p>
          </div>
        </div>
        <div className='col-span-1'>
          <div className='col-span-1 flex justify-between items-center'>
            <div>
              <p className=' text-secondary '>Charges per hours </p>
            </div>
            <p className='text-primary font-medium'>$15</p>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-6 py-3'>
        <div className='col-span-1 flex justify-between items-center'>
          <div>
            <p className=' text-secondary'>monthly hours assing</p>
          </div>
          <p className='text-primary font-medium'>30</p>
        </div>
        <div className='col-span-1'>
          <div className='col-span-1 flex justify-between items-center'>
            <div>
              <p className=' text-secondary '>Contract type</p>
            </div>
            <p className='text-primary font-medium'>Exclusive</p>
          </div>
        </div>
        <div className='col-span-1'>
          <div className='col-span-1 flex justify-between items-center'>
            <div>
              <p className=' text-secondary '>Leave schedule </p>
            </div>
            <p className='text-primary font-medium'>1 a month</p>
          </div>
        </div>
      </div>
    </>
  );
};

const TimeSection = () => {
  return (
    <div className='grid grid-cols-2 gap-3 py-4'>
      <div className='col-span-1'>
        <DateRangeComponent />;
      </div>
      <div className='col-span-1'>
        <div className='flex items-center space-x-6'>
          <SVG icon={vendorLogo} />
          <div className='flex flex-col'>
            <p className='text-primary font-medium'>Recent feedback from You</p>
            <p className='text-secondary'>from You</p>
          </div>
        </div>
        <div className='bg-[#F7F7F8] p-2 rounded-[4px] my-6'>
          <p className='text-primary font-medium text-[14px]'>
            No Feedback found.
          </p>
          <p className='text-secondary text-[14px]'>5 day ago</p>
        </div>
        <div className='py-5 flex flex-col space-y-3 border border-1 border-solid p-4 rounded-md bg-white shadow-md'>
          <p>Preferred payment method</p>
          <div className='flex flex-col space-y-3'>
            <div className='flex items-center space-x-4'>
              <SVG icon={paypal} />
              <p>Paypal</p>
            </div>
            <div className='flex items-center space-x-4'>
              <SVG icon={bankAccount} />
              <p>Bank Account</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BatchCard = () => {
  return (
    <div className='w-full py-2 my-4 rounded-[8px] border border-solid border-1 shadow-sm grid grid-cols-2 gap-2'>
      <div className='col-span-1 p-2'>
        {/* <div className='flex'>
          <p className='bg-green-50 p-1 rounded-md flex'>BaseBall</p>
        </div>
        <div>
          <p className='text-pretty font-medium py-2'>Morning Trainings</p>
          <div className='flex items-center space-x-3'>
            <p>10:00 am - 1:00pm</p>
            <p>Monday - Friday</p>
          </div>
          <div className='flex items-center space-x-3 py-2'>
            <p>total 25 candidates</p>
            <p>$23 per candidates</p>
          </div>
        </div> */}
        No Batch found
      </div>
      <div className='col-span-1  border-l-2 border-solid p-2'>
        <p className='text-primary py-2 font-medium'>Candidates</p>
        <div className='flex flex-wrap gap-3 '>
          {/* {Array.from({ length: 14 }).map(x => (
            <div className='w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center text-xl font-bold'>
              B
            </div>
          ))} */}
          NO Candidates Found
        </div>
      </div>
    </div>
  );
};
