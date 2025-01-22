import SideModal from 'components/modal/SideModal';
import { useEffect, useState } from 'react';
import Button from 'components/button';
import ProfileInputItem from '../components/profileInputItem';
import serviceIcon from '../../../media/svgs/services.svg';
import TextareaField from 'components/textareaField';
import FileUpload from 'components/uploadFile';
import CustomSelect from 'components/customSelect';
import useDocument from 'hooks/useDocument';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { venderServiceSchema } from 'schema';
import toast from 'react-hot-toast';
import useUploadFile from 'hooks/useUploadFile';
import useCurrentUser from 'hooks/useCurrentUser';
import { useDispatch, useSelector } from 'react-redux';
import { storeVenderData } from 'store/slices/venderslice';
import TagsSelect from 'components/tagsSelect';
import { doc, Timestamp } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import useMerchant from 'hooks/useMerchant';

const Services = ({ isOpen, onClose }) => {
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(venderServiceSchema),
    defaultValues: {
      days: [
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

  const coverImg = watch('cover');
  const currentVender = useSelector(state => state?.vender?.venderData);
  const dispatch = useDispatch();
  const { updateMerchant } = useMerchant();

  const { fetchCollection, createDocument } = useDocument(
    `countries/${currentVender?.country}/services`
  );

  const { uploadFile } = useUploadFile();
  const { user } = useCurrentUser();

  const [allServices, setAllServices] = useState([]);

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

  const onSubmit = async data => {
    setLoader(true);
    const { cover, service, ...otherData } = data;
    let url = cover;

    if (cover && typeof cover !== 'string') {
      const uploadResp = await uploadFile(cover, 'services');
      url = uploadResp.url;
    }
    const endTiming = new Date(
      9 * 60 * 60 * 1000 + Math.random() * (8 * 60 * 60 * 1000)
    ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const startTiming = new Date(
      9 * 60 * 60 * 1000 + Math.random() * (8 * 60 * 60 * 1000)
    ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const serviceObj = {
      ...otherData,
      picture: url,
      name: selectedOption.label,
      activityRef: doc(db, `activities/${service}`),
      addedOn: Timestamp.now().toMillis(),
      currency: currentVender?.currency ?? '£',
      endTiming,
      startTiming,
      highestPrice: 0,
      isActive: true,
      lowestPrice: 0,
      nbreOfCandidates: 0,
      nbreOfView: 0,
      featurePeriodEndDate: Timestamp.fromDate(
        new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
      ),
      totalReview: 0,
      totalSubscribers: 0,
      vendorRef: doc(
        db,
        `countries/${currentVender?.code}/vendors/${user.uid}`
      ),
    };

    const createResp = await createDocument(serviceObj);
    if (createResp.success) {
      await updateMerchant(user.uid, {
        serviceCompleted: true,
      });
      toast.success('Service created successfully!');
      dispatch(storeVenderData({ ...currentVender, serviceCompleted: true }));
      onClose();
    } else {
      toast.error('Error: An error occurred while adding the service.');
    }

    setLoader(false);
  };

  const currentService = watch('service');

  const options = allServices?.map(service => ({
    label: service.nameEn,
    value: service.id,
  }));

  const selectedOption = options?.find(
    option => option.value === currentService
  );

  const handleclear = () => {
    setValue('cover', '');
  };

  return (
    <SideModal
      isOpen={isOpen}
      onClose={onClose}
      title='Add Service'
      icon={serviceIcon}
      footer={
        <div className='flex justify-center items-end'>
          <Button
            title='Add Service'
            variant={'success'}
            className='w-full bg-black'
            type='submit'
            form='venderServices'
            disabled={loader}
          />
        </div>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} id='venderServices'>
        <div className='flex flex-col gap-y-7'>
          <ProfileInputItem label={'Service'} desc='Select a service to add'>
            <CustomSelect
              options={options}
              name='service'
              value={selectedOption || null}
              register={register}
              setSelectedValues={e => setValue('service', e)}
              error={errors?.service?.message}
              isMulti={false}
            />
          </ProfileInputItem>
          <div className='relative'>
            {coverImg && (coverImg.name || typeof coverImg === 'string') && (
              <span
                className='bg-red-500 rounded-full absolute top-1 right-1 w-[25px] h-[25px] cursor-pointer text-center text-white'
                onClick={handleclear}
              >
                X
              </span>
            )}

            {coverImg && (coverImg.name || typeof coverImg === 'string') && (
              <img
                src={
                  typeof coverImg === 'string'
                    ? coverImg
                    : coverImg instanceof File || coverImg instanceof Blob
                      ? URL.createObjectURL(coverImg)
                      : ''
                }
                alt='coverImg'
                className='w-full h-[200px]'
              />
            )}

            <FileUpload
              width='full'
              name='cover'
              register={register}
              coverImg={coverImg}
              accept='image/png, image/jpeg, image/jpg, image/gif'
              setValue={e => {
                const file = e?.target?.files[0];
                setValue('cover', file);
              }}
              hidden={!!coverImg}
            />

            <div className='flex justify-between items-center mt-4'>
              <div>
                <p className='text-dark font-medium text-lg'>Cover Image</p>
                <p className='text-[#6c6c89] text-sm'>
                  Maximum dimension 853px x 480px and size 1Mb
                </p>
              </div>
              <Button
                title='Browse'
                variant={'outline'}
                type='reset'
                onClick={() => document?.getElementById('file-input')?.click()}
              />
            </div>
            <hr />
            {errors && (
              <p className='mt-2 text-sm text-red-600'>
                {errors?.cover?.message}
              </p>
            )}
          </div>

          <ProfileInputItem
            label={'Description'}
            desc='Give it some more details'
          >
            <TextareaField
              placeholder='Max 200 words...'
              name={'descriptionEn'}
              register={register}
              error={errors?.descriptionEn?.message}
            />
          </ProfileInputItem>
          <ProfileInputItem
            label={'Tags'}
            desc='Add some related keywords to service'
            isLast={true}
          >
            <TagsSelect
              name='tags'
              register={register}
              setSelectedValues={e => setValue('tags', e)}
            />
          </ProfileInputItem>
        </div>
      </form>
    </SideModal>
  );
};

export default Services;
