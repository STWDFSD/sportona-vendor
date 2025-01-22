import SideModal from 'components/modal/SideModal';
import Button from 'components/button';
import SVG from 'components/renderSvg';
import calendarIcon from '../../media/svgs/calendar.svg';
import flagIcon from '../../media/svgs/flag.svg';
import batchIcon from '../../media/svgs/beach.svg';
import hashTag from '../../media/svgs/hashtag.svg';
import roomIcon from '../../media/svgs/hall.svg';
import moneyIcon from '../../media/svgs/money.svg';
import userIcon from '../../media/svgs/user.svg';
import union from '../../media/svgs/Union.svg';
import union1 from '../../media/svgs/Union1.svg';
import union2 from '../../media/svgs/Union2.svg';
import DateRangeComponent from 'components/dateRange1';
import { useEffect, useState } from 'react';
import useDocument from 'hooks/useDocument';
import { doc } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import useBatch from 'hooks/useBatch';

const BatchInfo = ({ batch, onClose, isOpen, currentVenderData }) => {
  const { code, price, nbreOfCandidates, nbreOfReserved, days, coachRef, id } =
    batch;
  const [coaches, setCoaches] = useState();
  const [trainees, setRrainees] = useState([]);

  const baseRef = `countries/${currentVenderData?.code}`;
  const batchRef = doc(db, `${baseRef}/batchs/${id}`);
  const traineesRef = `${baseRef}/purchasedServices`;

  const { getDocByRef } = useDocument();
  const { fetchByTraineesByBatch } = useBatch();

  useEffect(() => {
    const fetch = async () => {
      const resp = await getDocByRef(coachRef);
      setCoaches(resp);
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetchTrainees = async () => {
      try {
        const trainees = await fetchByTraineesByBatch(batchRef, traineesRef);
        setRrainees([...trainees]);
      } catch (error) {
        console.error('Error fetching trainees:', error);
      }
    };

    fetchTrainees();
  }, []);

  return (
    <SideModal
      isOpen={isOpen}
      onClose={onClose}
      title='Batch Info'
      icon={calendarIcon}
      footer={
        <div className='mt-6 flex  gap-5'>
          <Button title='Edit' variant='outline' className='w-1/3' />
          <Button title='Freeze' variant='outline' className='w-1/3' />
          <Button title='Kick Out' variant='danger' className='w-1/3' />
        </div>
      }
    >
      <div className='space-y-10'>
        <Item
          label='Start Date'
          value={'15 Dec 2024'}
          icon={<SVG icon={flagIcon} />}
        />
        <Item
          label='End Date'
          value={'14 Mar 2025'}
          icon={<SVG icon={flagIcon} />}
        />
        <Item
          label='Batch Size'
          value={nbreOfCandidates}
          icon={<SVG icon={batchIcon} />}
        />
        <Item
          label='Training Hall'
          value={'Main Hall'}
          icon={<SVG icon={roomIcon} />}
        />
        <Item label='Batch SKU' value={code} icon={<SVG icon={hashTag} />} />
        <Item
          label='Proposed Cost'
          value={
            <span className='flex items-center space-x-2'>
              <span>{price?.price}</span>
            </span>
          }
          icon={<SVG icon={moneyIcon} />}
        />
      </div>

      {/* Trainers */}
      <div className='mt-6'>
        <p className='text-[16px] font-medium text-[#121217]'>Trainers</p>
        <span className='text-[16px]  text-[##6C6C89]'>
          Trainers assigned to this batch
        </span>
        <div className='flex my-4 gap-2'>
          <img
            src={coaches?.avatar}
            alt={coaches?.name}
            className=' size-10 rounded-full'
          />
        </div>
      </div>
      <hr className=' my-5' />

      <div className='mt-6'>
        <div className=' my-2 flex gap-3'>
          <div className=' flex gap-2 items-center'>
            <SVG icon={union} />
            <span className=' text-[#6C6C89] font-medium'>Schedule</span>
          </div>
          <div className=' flex gap-2 items-center'>
            <SVG icon={union1} />
            <span className=' text-[#6C6C89] font-medium'>Holiday</span>
          </div>
          <div className=' flex gap-2 items-center'>
            <SVG icon={union2} />
            <span className=' text-[#6C6C89] font-medium'>No training</span>
          </div>
        </div>
        <DateRangeComponent
          days={[
            { day: '2024-02-07', isSelected: true },
            { day: '2024-02-14', isSelected: true },
            { day: '2024-02-28', isSelected: false, status: 'Holiday' },
          ]}
        />
      </div>

      <div className='my-6 border rounded-md p-3'>
        <div className=' text-sm font-medium text-[#121217]'>
          Trainees ({trainees?.length})
        </div>
        <div className='flex flex-wrap mt-2 gap-2'>
          {trainees.map(trainee => (
            <img
              key={trainee?.userData?.id}
              src={trainee?.userData?.photoURL}
              alt={trainee?.userData?.name || 'User'}
              className='size-10 rounded-full'
            />
          ))}
        </div>
      </div>
      <p
        className='mt-2  text-[#6C6C89]
       flex items-center gap-3 text-base font-medium'
      >
        <SVG icon={userIcon} />
        Available Spots: {nbreOfCandidates - nbreOfReserved}
      </p>
    </SideModal>
  );
};

export default BatchInfo;

const Item = ({ icon, label, value }) => {
  return (
    <div className='flex justify-between items-center space-x-4'>
      <div className='flex items-center space-x-2'>
        {icon && <span>{icon}</span>}
        <span className='text-[#6C6C89] text-[16px] font-medium'>{label}</span>
      </div>
      <span className='text-[16px] text-black font-medium'>{value}</span>
    </div>
  );
};
