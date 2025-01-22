import SideModal from 'components/modal/SideModal';
import { useEffect, useState } from 'react';
import Button from 'components/button';
import ProfileInputItem from '../components/profileInputItem';
import InputField from 'components/inputField';
import SVG from 'components/renderSvg';
import hashtagIcon from '../../../media/svgs/hashtag.svg';
import crowdIcon from '../../../media/svgs/crowd.svg';
import moneyIcon from '../../../media/svgs/currency.svg';
import personIcon from '../../../media/svgs/personsmall.svg';
import ButtonSelector from 'components/buttonSelector';
import DaysSelection from 'components/daysSelection';
import CustomSelect from 'components/customSelect';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addBatchSchema } from 'schema';
import useDocument from 'hooks/useDocument';
import useCurrentUser from 'hooks/useCurrentUser';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { storeVenderData } from 'store/slices/venderslice';
import useCoaches from 'hooks/useCoaches';
import useVendor from 'hooks/useVendor';
import { doc, Timestamp } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import useMerchant from 'hooks/useMerchant';

const Business = ({ isOpen, onClose, title }) => {
  const [loader, setLoader] = useState(false);
  const [services, setServices] = useState([]);
  const [allTrainers, setAllTrainers] = useState([]);
  const currentVenderData = useSelector(state => state.vender.venderData);

  const { createDocument } = useDocument(
    `countries/${currentVenderData?.country}/batchs`
  );

  const { fetchCoachesByVendorRef, error } = useCoaches();
  const dispatch = useDispatch();
  const { user } = useCurrentUser();

  const coachesCollectionRef = `countries/${currentVenderData?.code}/coaches`;

  useEffect(() => {
    const fetchData = async () => {
      const vendorRef = doc(
        db,
        `countries/${currentVenderData?.code}/vendors/${user?.uid}`
      );
      if (user) {
        try {
          const result = await fetchCoachesByVendorRef(
            vendorRef,
            coachesCollectionRef
          );
          if (result.success && result.data?.length) {
            setAllTrainers(
              result.data.map(item => ({
                label: item?.Fname + ' ' + item?.Lname,
                value: item?.id,
              }))
            );
          } else if (!result.success) {
            console.warn(result.message);
          }
        } catch (error) {
          console.error('Error fetching coaches:', error);
        }
      }
    };

    fetchData();
  }, [user]);

  const { fetchServicesByVendor } = useVendor(
    `countries/${currentVenderData?.code}/services`
  );

  useEffect(() => {
    if (user && currentVenderData?.code) {
      const vendorRef = doc(
        db,
        `countries/${currentVenderData?.code}/vendors/${user?.uid}`
      );
      const fetchData = async () => {
        const resp = await fetchServicesByVendor(vendorRef);
        if (resp?.success) {
          const options = resp?.data?.map(service => ({
            label: service?.name,
            value: service?.id,
          }));
          setServices(options);
        }
      };

      fetchData();
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addBatchSchema),
    defaultValues: {
      trainingDays: [
        { id: 1, day: 'Monday', isSelected: false },
        { id: 2, day: 'Tuesday', isSelected: false },
        { id: 3, day: 'Wednesday', isSelected: false },
        { id: 4, day: 'Thursday', isSelected: false },
        { id: 5, day: 'Friday', isSelected: false },
        { id: 6, day: 'Saturday', isSelected: false },
        { id: 7, day: 'Sunday', isSelected: false },
      ],
    },
  });

  const trainingDays = watch('trainingDays');
  const { updateMerchant } = useMerchant();

  const onSubmit = async data => {
    const { code, endingTime, name, price, startingTime, trainingDays } = data;
    const batch = {
      addedOn: Timestamp.now().toMillis(),
      coachId: data.trainer,
      coachRef: doc(
        db,
        `countries/${currentVenderData?.country}/coaches/${data.trainer}`
      ),
      days: trainingDays,
      endTiming: endingTime,
      isActive: true,
      nbreOfCandidates: data?.totalCandidates,
      nbreOfReserved: 0,
      serviceRef: doc(
        db,
        `countries/${currentVenderData?.country}/services/${data.service}`
      ),
      startTiming: startingTime,
      name,
      code,
      price: {
        price: price,
        currency: 'GBP',
        id: 'price_1P7DdyGT8HSWsWAue236oUXv',
        symbol: '£',
      },
      vendorRef: doc(
        db,
        `countries/${currentVenderData?.country}/vendors/${user.uid}`
      ),
    };

    setLoader(true);
    const response = await createDocument({
      ...batch,
    });
    if (response.success) {
      toast.success('Batch added successfully!');
      const updateResp = await updateMerchant(user.uid, {
        serviceCompleted: true,
      });
      if (updateResp?.success) {
        const updatedVenderData = {
          ...currentVenderData,
          addBatch: true,
        };
        dispatch(storeVenderData(updatedVenderData));
        onClose();
        setLoader(false);
      } else {
        toast.error('An error occure while adding batch!');
        setLoader(false);
      }
    } else {
      toast.error('An error occure while adding batch!');
      setLoader(false);
    }
  };

  return (
    <SideModal
      isOpen={isOpen}
      onClose={onClose}
      title={title ? title : 'Add Batches'}
      icon={crowdIcon}
      footer={
        <div className=' flex justify-center items-end'>
          <Button
            title='Save'
            variant={'success'}
            className=' w-full bg-black'
            form='addBatch'
            disabled={loader}
          ></Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} id='addBatch'>
        <div className=' flex flex-col gap-y-7'>
          <ProfileInputItem
            label={'Select Service'}
            desc='Selected service to manage'
          >
            <CustomSelect
              mb={false}
              options={services}
              name='service'
              register={register}
              setSelectedValues={e => setValue('service', e)}
              error={errors?.service?.message}
              isMulti={false}
            />
          </ProfileInputItem>

          <ProfileInputItem
            label={'Batch Name'}
            desc='Mention a suitable name for the batch'
          >
            <InputField
              type='text'
              name='name'
              placeholder='Ex: Morning Training'
              height='40px'
              error={errors?.name?.message}
              register={register}
              icon={<SVG icon={crowdIcon} />}
            />
          </ProfileInputItem>

          <ProfileInputItem
            label={'Service Code (SKU)'}
            desc='Mention a suitable name for the batch'
          >
            <InputField
              type='text'
              name='code'
              placeholder='# Ex: ABC001'
              height='40px'
              error={errors?.code?.message}
              register={register}
              icon={<SVG icon={hashtagIcon} />}
            />
          </ProfileInputItem>
          <ProfileInputItem label={'Price'} desc='Charges per candidate'>
            <InputField
              type='number'
              name='price'
              placeholder='0'
              height='40px'
              error={errors?.price?.message}
              register={register}
              icon={<SVG icon={moneyIcon} />}
            />
          </ProfileInputItem>

          <ProfileInputItem
            label={'Time Duration'}
            desc='Starting and finishing time of the training'
            error={errors?.startingTime?.message || errors?.endingTime?.message}
          >
            <div className='flex gap-3'>
              <ButtonSelector value='Starting'>
                <input
                  type='time'
                  className='border-none bg-transparent outline-none text-center'
                  onChange={e => setValue('startingTime', e.target.value)} // Handle time change
                />
              </ButtonSelector>

              <ButtonSelector value='Finishing'>
                <input
                  type='time'
                  className='border-none bg-transparent outline-none text-center'
                  onChange={e => setValue('endingTime', e.target.value)} // Handle time change
                />
              </ButtonSelector>
            </div>
          </ProfileInputItem>

          <ProfileInputItem
            label={'Candidates'}
            desc='How many candidates for a batch'
          >
            <InputField
              type='number'
              name='totalCandidates'
              placeholder='0'
              height='40px'
              error={errors?.totalCandidates?.message}
              register={register}
              icon={<SVG icon={personIcon} />}
            />
          </ProfileInputItem>

          <ProfileInputItem
            label={'Training Days'}
            desc='Open days for the training per week'
            error={errors?.trainingDays?.message}
          >
            <DaysSelection
              trainingDays={trainingDays}
              setTrainingDays={days => setValue('trainingDays', days)}
            />
          </ProfileInputItem>
          <ProfileInputItem
            label={'Trainer'}
            desc='The coach who will train the batch'
          >
            <CustomSelect
              mb={false}
              isMulti={false}
              error={errors?.trainer?.message}
              name={'trainer'}
              register={register}
              options={allTrainers}
              setSelectedValues={e => setValue('trainer', e)}
            />
          </ProfileInputItem>
        </div>
      </form>
    </SideModal>
  );
};

export default Business;
