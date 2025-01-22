import React, { useEffect, useState } from 'react';
import SideModal from 'components/modal/SideModal';
import Button from 'components/button';
import ProfileInputItem from '../components/profileInputItem';
import serviceIcon from '../../../media/svgs/services.svg';
import TextareaField from 'components/textareaField';
import FileUpload from 'components/uploadFile';
import CustomSelect from 'components/customSelect';
import TagsSelect from 'components/tagsSelect';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { venderServiceSchema } from 'schema';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { storeVenderData } from 'store/slices/venderslice';
import { doc, Timestamp } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import useDocument from 'hooks/useDocument';
import useUploadFile from 'hooks/useUploadFile';
import useCurrentUser from 'hooks/useCurrentUser';
import useMerchant from 'hooks/useMerchant';

const EditService = ({ isOpen, onClose, serviceId, existingService }) => {
  const [loader, setLoader] = useState(false);
  const [allServices, setAllServices] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(venderServiceSchema),
  });

  useEffect(() => {
    if (existingService) {
      reset({
        service: existingService.name,
        cover: existingService.picture,
        descriptionEn: existingService.descriptionEn,
        tags: existingService.tags || [],
      });
    }
  }, [existingService, reset]);

  const coverImg = watch('cover');
  const currentVender = useSelector(state => state?.vender?.venderData);
  const dispatch = useDispatch();
  const { updateMerchant } = useMerchant();
  const { fetchCollection, updateDocument } = useDocument(
    `countries/${currentVender?.country}/services`
  );
  const { uploadFile } = useUploadFile();
  const { user } = useCurrentUser();

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

    const serviceObj = {
      ...otherData,
      picture: url,
      name: service,
      activityRef: doc(db, `activities/${service}`),
      updatedOn: Timestamp.now().toMillis(),
    };

    const updateResp = await updateDocument(serviceId, serviceObj);

    if (updateResp.success) {
      toast.success('Service updated successfully!');
      const updatedVenderData = {
        ...currentVender,
        serviceCompleted: true,
      };
      dispatch(storeVenderData(updatedVenderData));
      onClose();
    } else {
      toast.error('Error: Could not update the service.');
    }

    setLoader(false);
  };

  const options = allServices.map(service => ({
    label: service.nameEn,
    value: service.id,
  }));

  const selectedOption = options.find(
    option => option.value === watch('service')
  );

  const handleClear = () => {
    setValue('cover', '');
  };

  return (
    <SideModal
      isOpen={isOpen}
      onClose={onClose}
      title='Edit Service'
      icon={serviceIcon}
      footer={
        <div className='flex justify-center items-end'>
          <Button
            title='Update Service'
            variant='success'
            className='w-full bg-black'
            type='submit'
            form='editServiceForm'
            disabled={loader}
          />
        </div>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} id='editServiceForm'>
        <div className='flex flex-col gap-y-7'>
          <ProfileInputItem
            label='Current Service'
            desc='Selected service to manage'
          >
            <CustomSelect
              options={options}
              name='service'
              value={selectedOption || null}
              register={register}
              setSelectedValues={e => setValue('service', e)}
              error={errors?.service?.message}
              isMulti={false}
              isDisabled={true}
            />
          </ProfileInputItem>

          <div className='relative'>
            {coverImg && (
              <>
                <span
                  className='bg-red-500 rounded-full absolute top-1 right-1 w-[25px] h-[25px] cursor-pointer text-center text-white'
                  onClick={handleClear}
                >
                  X
                </span>
                <img
                  src={
                    typeof coverImg === 'string'
                      ? coverImg
                      : coverImg instanceof File || coverImg instanceof Blob
                        ? URL.createObjectURL(coverImg)
                        : ''
                  }
                  alt='Cover'
                  className='w-full h-[200px]'
                />
              </>
            )}

            <FileUpload
              width='full'
              name='cover'
              register={register}
              coverImg={coverImg}
              accept='image/png, image/jpeg, image/jpg, image/gif'
              setValue={e => setValue('cover', e.target.files[0])}
              hidden={!!coverImg}
            />

            {errors?.cover && (
              <p className='mt-2 text-sm text-red-600'>
                {errors?.cover?.message}
              </p>
            )}
          </div>

          <ProfileInputItem
            label='Description'
            desc='Give it some more details'
          >
            <TextareaField
              placeholder='Max 200 words...'
              name='descriptionEn'
              register={register}
              error={errors?.descriptionEn?.message}
            />
          </ProfileInputItem>

          <ProfileInputItem
            label='Tags'
            desc='Add some related keywords to service'
            isLast
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

export default EditService;
