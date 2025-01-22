import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import SideModal from 'components/modal/SideModal';
import Button from 'components/button';
import ProfileInputItem from '../components/profileInputItem';
import InputField from 'components/inputField';
import trainerIcon from '../../../media/svgs/trainer.svg';
import SVG from 'components/renderSvg';
import ButtonSelector from 'components/buttonSelector';
import { addTrainerSchema } from 'schema';
import logoPlaceholder from '../../../media/pngs/filenotupload.png';
import useCurrentUser from 'hooks/useCurrentUser';
import useDocument from 'hooks/useDocument';
import useUploadFile from 'hooks/useUploadFile';
import toast from 'react-hot-toast';
import DaysSelection from 'components/daysSelection';
import CustomSelect from 'components/customSelect';
import moneyIcon from '../../../media/svgs/currency.svg';
import userIcon from '../../../media/svgs/user.svg';
import { useDispatch, useSelector } from 'react-redux';
import { storeVenderData } from 'store/slices/venderslice';
import { doc } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import useMerchant from 'hooks/useMerchant';

const AddTrainer = ({ isOpen, onClose }) => {
  const [loader, setLoader] = useState(false);
  const { user } = useCurrentUser();
  const currentVenderData = useSelector(state => state.vender.venderData);
  const { fetchCollection, loading, error } = useDocument('services');
  const { createDocument } = useDocument(
    `countries/${currentVenderData?.country}/coaches`
  );
  const { updateMerchant } = useMerchant();

  const { uploadFile } = useUploadFile();
  const [allServices, setAllServices] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const getServices = async () => {
      const response = await fetchCollection('activities');
      if (response.result) {
        setAllServices(response.data);
      } else {
        setAllServices([]);
      }
    };

    getServices();
  }, []);

  const fileInputRef = useRef();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addTrainerSchema),
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

  console.log('errors', errors);

  const trainingDays = watch('trainingDays');
  const selectedFile = watch('avatar');

  const imagePreview = selectedFile
    ? URL.createObjectURL(selectedFile)
    : logoPlaceholder;

  const onSubmit = async data => {
    setLoader(true);
    const { avatar, ...rest } = data;
    const { url } = await uploadFile(selectedFile, 'trainers');
    const resp = await createDocument({
      ...rest,
      avatar: url,
      name: data?.Fname + data?.Lname,
      vendorRef: doc(
        db,
        `countries/${currentVenderData?.country}/vendors/${user.uid}`
      ),
    });
    if (resp.success) {
      const updateResp = await updateMerchant(user.uid, {
        addTrainer: true,
      });

      if (updateResp?.success) {
        const updatedVenderData = {
          ...currentVenderData,
          addTrainer: true,
        };
        dispatch(storeVenderData(updatedVenderData));
        toast.success('Success:Trainer  saved successfully!');
        onClose();
        setLoader(false);
      } else {
        toast.error('Error:an error occure!');
        setLoader(false);
      }
    } else {
      toast.error('Error:an error occure!');
      setLoader(false);
    }
  };

  return (
    <SideModal
      isOpen={isOpen}
      onClose={onClose}
      title='Create Trainer'
      icon={trainerIcon}
      footer={
        <div className='flex justify-center items-end'>
          <Button
            title='Save'
            variant='success'
            className='w-full'
            form='trainer'
            type='submit'
            disabled={loader}
          />
        </div>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} id='trainer'>
        <div className='space-y-3 mb-5'>
          <div className='flex items-center justify-between'>
            <div className='size-16 rounded-full bg-gray-200 flex justify-center items-center'>
              <img
                src={imagePreview}
                alt='file'
                onLoad={() => URL.revokeObjectURL(imagePreview)}
              />
            </div>
            <input
              type='file'
              className='hidden'
              accept='image/*'
              {...register('avatar', { required: true })}
              ref={e => {
                fileInputRef.current = e;
              }}
              onChange={e => {
                setValue('avatar', e.target.files[0]);
              }}
            />
            <div className='flex gap-x-2'>
              <Button
                title='Browse'
                variant='outline'
                type='button'
                onClick={() => fileInputRef.current.click()}
              />
              <Button title='Guide' variant='outline' />
            </div>
          </div>
          <div>
            <p className='text-dark font-medium text-lg'>Trainer Profile</p>
            <p className='text-[#6c6c89] text-sm'>
              Maximum dimension 400px x 400px and size 1Mb
            </p>
          </div>
          {errors?.avatar && (
            <p className='text-red-500'>{errors?.avatar.message}</p>
          )}
          <hr />
        </div>

        <div className='flex flex-col gap-y-7 divide-y-2'>
          <ProfileInputItem
            label='Trainer Name'
            desc='Official name of the trainer.'
          >
            <div className='flex gap-2'>
              <InputField
                type='text'
                name='Fname'
                placeholder='First name'
                height='40px'
                error={errors?.Fname?.message}
                register={register}
                icon={<SVG icon={userIcon} />}
                className='w-2/5'
              />
              <InputField
                type='text'
                name='Lname'
                placeholder='Last name'
                height='40px'
                error={errors?.Lname?.message}
                register={register}
                icon={<SVG icon={userIcon} />}
                className='w-2/5'
              />
            </div>
          </ProfileInputItem>

          <ProfileInputItem
            label={'Trainer’s Services'}
            desc='In which service trainer is going to perform.'
          >
            <CustomSelect
              loading={loading}
              options={allServices.map(service => ({
                label: service.nameEn,
                value: service.nameEn,
              }))}
              name='services'
              setSelectedValues={selectedServices => {
                setValue('services', selectedServices);
              }}
              error={errors?.services?.message}
            />
          </ProfileInputItem>

          <ProfileInputItem label={'Cost'} desc='Charges per candidate'>
            <InputField
              type='number'
              name='cost'
              placeholder='0'
              height='40px'
              error={errors?.cost?.message}
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
                  onChange={e => setValue('startingTime', e.target.value)}
                />
              </ButtonSelector>

              <ButtonSelector value='Finishing'>
                <input
                  type='time'
                  className='border-none bg-transparent outline-none text-center'
                  onChange={e => setValue('endingTime', e.target.value)}
                />
              </ButtonSelector>
            </div>
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
        </div>
      </form>
    </SideModal>
  );
};

export default AddTrainer;
