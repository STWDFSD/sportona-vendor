import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import SideModal from 'components/modal/SideModal';
import Button from 'components/button';
import ProfileInputItem from '../components/profileInputItem';
import InputField from 'components/inputField';
import hallIcon from '../../../media/svgs/hall.svg';
import SVG from 'components/renderSvg';
import { addHallSchema, addTrainerSchema } from 'schema';
import userIcon from '../../../media/svgs/user.svg';
import feetIcon from '../../../media/svgs/feet.svg';
import personIcon from '../../../media/svgs/personsmall.svg';
import toast from 'react-hot-toast';
import useCurrentUser from 'hooks/useCurrentUser';
import useDocument from 'hooks/useDocument';
import { useDispatch, useSelector } from 'react-redux';
import { storeVenderData } from 'store/slices/venderslice';
import { useState } from 'react';
import { db } from 'firebaseConfig';
import { doc } from 'firebase/firestore';
import useMerchant from 'hooks/useMerchant';

const AddTrainigHall = ({ isOpen, onClose }) => {
  const [loader, setLoader] = useState(false);
  const { user } = useCurrentUser();
  const dispatch = useDispatch();
  const currentVenderData = useSelector(state => state.vender.venderData);
  const { loading, error, createDocument } = useDocument(
    `countries/${currentVenderData?.country}/rooms`
  );
  const { updateMerchant } = useMerchant();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addHallSchema),
  });

  const onSubmit = async data => {
    setLoader(true);
    const roomData = {
      ...data,
      vendorRef: doc(
        db,
        `countries/${currentVenderData?.country}/vendors/${user.uid}`
      ),
    };

    const resp = await createDocument(roomData);
    onClose();

    if (resp.success) {
      updateMerchant(user.uid, {
        addHall: true,
      });

      if (resp?.success) {
        const updatedVenderData = {
          ...currentVenderData,
          addHall: true,
        };
        dispatch(storeVenderData(updatedVenderData));
        toast.success('Hall added successfully!');
        setLoader(false);
        onClose();
      } else {
        toast.error('An error occure while adding hall!');
        setLoader(false);
      }
    } else {
      toast.error('An error occure while adding hall!');
      setLoader(false);
    }
  };

  return (
    <SideModal
      isOpen={isOpen}
      onClose={onClose}
      title='New Training Hall'
      icon={hallIcon}
      footer={
        <div className='flex justify-center items-end'>
          <Button
            title='Save'
            variant='success'
            className='w-full'
            form='trainingHall'
            type='submit'
            disabled={loader}
          />
        </div>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} id='trainingHall'>
        <div className='flex flex-col gap-y-7 divide-y-2'>
          {/* Trainer Name */}
          <ProfileInputItem
            label='Title'
            desc='Unique name of the training hall'
          >
            <InputField
              type='text'
              name='title'
              placeholder='Title here'
              height='40px'
              error={errors?.title?.message}
              register={register}
              icon={<SVG icon={userIcon} />}
            />
          </ProfileInputItem>

          {/* Room Size */}
          <ProfileInputItem
            label={'Room Size'}
            desc='The area of the training hall'
          >
            <InputField
              type='number'
              name='size'
              placeholder='0'
              height='40px'
              error={errors?.size?.message}
              register={register}
              icon={<SVG icon={feetIcon} />}
            />
          </ProfileInputItem>

          {/* Occupancy */}
          <ProfileInputItem
            label={'Occupancy'}
            desc='How many candidates can fit there.'
          >
            <InputField
              type='number'
              name='totalCandidates'
              placeholder='Number of candidates'
              height='40px'
              error={errors?.totalCandidates?.message}
              register={register}
              icon={<SVG icon={personIcon} />}
            />
          </ProfileInputItem>
        </div>
      </form>
    </SideModal>
  );
};

export default AddTrainigHall;
