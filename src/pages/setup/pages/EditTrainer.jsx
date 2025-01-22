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
import { useSelector } from 'react-redux';
import FileUpload from 'components/uploadFile';

const EditTrainer = ({ isOpen, onClose, trainerData }) => {
  const [loader, setLoader] = useState(false);
  const { user } = useCurrentUser();
  const currentVenderData = useSelector(state => state.vender.venderData);
  const { updateDocument } = useDocument(
    `countries/${currentVenderData?.country}/coaches`
  );
  const { uploadFile } = useUploadFile();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addTrainerSchema),
    defaultValues: trainerData,
  });

  useEffect(() => {
    reset({
      ...trainerData,
      trainingDays: trainerData?.trainingDays || [
        { id: 1, day: 'Monday', isSelected: false },
        { id: 2, day: 'Tuesday', isSelected: false },
        { id: 3, day: 'Wednesday', isSelected: false },
        { id: 4, day: 'Thursday', isSelected: false },
        { id: 5, day: 'Friday', isSelected: false },
        { id: 6, day: 'Saturday', isSelected: false },
        { id: 7, day: 'Sunday', isSelected: false },
      ],
    });
  }, [trainerData, reset]);

  const avatar = watch('avatar');
  const trainingDays = watch('trainingDays');
  const imagePreview =
    typeof avatar === 'string'
      ? avatar
      : avatar instanceof File
        ? URL.createObjectURL(avatar)
        : trainerData?.avatar || logoPlaceholder;

  const handleClearImage = () => {
    setValue('avatar', '');
  };

  const onSubmit = async data => {
    setLoader(true);
    const { avatar, ...rest } = data;
    let avatarUrl = trainerData.avatar;

    if (avatar && typeof avatar !== 'string') {
      const uploadResp = await uploadFile(avatar, 'trainers');
      avatarUrl = uploadResp.url;
    }

    const updatedTrainer = {
      ...rest,
      avatar: avatarUrl,
      name: `${data.Fname} ${data.Lname}`,
    };

    const resp = await updateDocument(trainerData.id, updatedTrainer);

    if (resp.success) {
      toast.success('Trainer updated successfully!');
      onClose();
    } else {
      toast.error('Error: Could not update trainer!');
    }

    setLoader(false);
  };

  return (
    <SideModal
      isOpen={isOpen}
      onClose={onClose}
      title='Edit Trainer'
      icon={trainerIcon}
      footer={
        <div className='flex justify-center items-end'>
          <Button
            title='Update'
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
          <div className='relative'>
            {imagePreview && (
              <>
                <span
                  className='absolute top-1 right-1 bg-red-500 text-white rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer'
                  onClick={handleClearImage}
                >
                  X
                </span>
                <img
                  src={imagePreview}
                  alt='Avatar'
                  className='w-full h-[200px] object-cover'
                />
              </>
            )}
            <FileUpload
              width='full'
              name='avatar'
              register={register}
              coverImg={avatar}
              accept='image/png, image/jpeg, image/jpg, image/gif'
              setValue={e => setValue('avatar', e.target.files[0])}
              hidden={!!avatar}
            />

            {errors?.avatar && (
              <p className='text-red-600 text-sm mt-2'>
                {errors.avatar.message}
              </p>
            )}
          </div>
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
            label='Trainer’s Services'
            desc='In which service trainer is going to perform.'
          >
            <CustomSelect
              options={trainerData.services.map(service => ({
                label: service,
                value: service,
              }))}
              name='services'
              setSelectedValues={selectedServices => {
                setValue('services', selectedServices);
              }}
              error={errors?.services?.message}
            />
          </ProfileInputItem>

          <ProfileInputItem label='Cost' desc='Charges per candidate'>
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
            label='Time Duration'
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
            label='Training Days'
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

export default EditTrainer;
