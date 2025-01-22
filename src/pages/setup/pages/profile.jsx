import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import SideModal from 'components/modal/SideModal';
import Button from 'components/button';
import ProfileInputItem from '../components/profileInputItem';
import InputField from 'components/inputField';
import userIcon from '../../../media/svgs/user.svg';
import SVG from 'components/renderSvg';
import UserNameInput from 'components/userNameInput';
import ButtonSelector from 'components/buttonSelector';
import { venderProfileSchema } from 'schema';
import logoPlaceholder from '../../../media/pngs/filenotupload.png';
import storeIcon from '../../../media/svgs/building-store.svg';
import pinIcon from '../../../media/svgs/pin.svg';
import gbIcon from '../../../media/svgs/GB.svg';
import mapIcon from '../../../media/svgs/map.svg';
import useCurrentUser from 'hooks/useCurrentUser';
import useDocument from 'hooks/useDocument';
import useUploadFile from 'hooks/useUploadFile';
import toast from 'react-hot-toast';
import DaysSelection from 'components/daysSelection';
import { useDispatch, useSelector } from 'react-redux';
import { storeVenderData } from 'store/slices/venderslice';
import { doc, Timestamp } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import useMerchant from 'hooks/useMerchant';
import { countiesCities } from 'utils/CitiesCounties';
import GooglePlacesAutocompleteInput from 'components/googlePlacesAutocompleteInput';

const Profile = ({ isOpen, onClose }) => {
  const [showCountryList, setShowCountryList] = useState(false);
  const [showCountyList, setShowCountyList] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showCitiesList, setShowCitiesList] = useState(false);
  const [selectedCounty, setSelectedCounty] = useState();
  const [selectedCity, setSelectedCity] = useState('');
  const counties = countiesCities?.map(item => item.county) || [];

  const cities = selectedCounty
    ? countiesCities.find(item => item.county === selectedCounty)?.cities || []
    : countiesCities?.flatMap(item => item.cities) || [];

  const { user } = useCurrentUser();

  const { uploadFile } = useUploadFile();
  const dispatch = useDispatch();

  const currentVenderData = useSelector(state => state?.vender?.venderData);
  const { createDocument } = useDocument(
    `countries/${currentVenderData?.code}/vendors`
  );

  const { updateMerchant } = useMerchant();

  const handleCountyClick = () => {
    setShowCountyList(!showCountyList);
    setShowCountryList(false);
    setShowCitiesList(false); // Close city list if open
  };

  const handleCityClick = () => {
    setShowCitiesList(!showCitiesList);
    setShowCountyList(false);
    setShowCountryList(false);
  };

  const selectCounty = county => {
    setSelectedCounty(county);
    setShowCountyList(false);
  };

  const selectCity = city => {
    setSelectedCity(city);
    setShowCitiesList(false);
    setSelectedCounty('');
  };

  const fileInputRef = useRef();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(venderProfileSchema),
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
  const selectedFile = watch('logo');
  const startTime = watch('endingTime');
  const endTime = watch('startingTime');
  const address = watch('address');
  const imagePreview =
    selectedFile && selectedFile.length
      ? URL.createObjectURL(selectedFile[0])
      : logoPlaceholder;

  const onSubmit = async data => {
    const profile = {
      addedOn: Timestamp.now().toMillis(),
      country: currentVenderData?.code,
      countryCode: data?.countryCode,
      countryISOCode: data.countryISOCode,
      latitude: data?.latitude,
      longitude: data?.longitude,
      location: data.address,
      vendorName: data.name,
      description: '',
      email: currentVenderData?.email,
      id: user.uid,
      lastUpdated: Timestamp.now().toMillis(),
      location: data.address,
      isActive: true,
      nbreOfReview: 0,
      phone: '',
      phoneCC: '',
      phoneNumber: '',
      token: '',
      totalReview: 0,
      totalSubscribers: 0,
      username: data.username,
      postcode: data.postcode,
      selectedCounty: selectedCounty,
      selectedCity: selectedCity,
      days: trainingDays,
      starttime: startTime,
      endtime: endTime,
      userRef: doc(db, `merchants/${currentVenderData?.uid}`),
    };
    setLoader(true);
    const { url } = await uploadFile(selectedFile[0], 'venders');
    const resp = await createDocument(
      {
        ...profile,
        photoURL: url,
      },
      user.uid
    );
    if (resp.success) {
      const updatedVenderData = {
        ...currentVenderData,
        ...profile,
        profileCompleted: true,
        photoURL: url,
      };
      await updateMerchant(user.uid, {
        profileCompleted: true,
      });
      dispatch(storeVenderData(updatedVenderData));
      onClose();
      setLoader(false);
      toast.success('Success:Profile saved successfully!');
    } else {
      setLoader(false);
      toast.error('Error:an error occure!');
    }
  };
  const setTime = e => {
    const [hours, minutes] = e.target.value.split(':');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  return (
    <SideModal
      isOpen={isOpen}
      onClose={onClose}
      title='Setup Profile'
      icon={userIcon}
      footer={
        <div className='flex justify-center items-end'>
          <Button
            title='Save'
            variant='success'
            className='w-full'
            form='vendersProfile'
            disabled={loader}
          />
        </div>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} id='vendersProfile'>
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
              {...register('logo')}
              ref={e => {
                fileInputRef.current = e;
              }}
              onChange={e => {
                setValue('logo', e.target.files);
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
            <p className='text-dark font-medium text-lg'>Vendor Logo</p>
            <p className='text-[#6c6c89] text-sm'>
              Maximum dimension 400px x 400px and size 1Mb
            </p>
          </div>
          {errors.logo && <p className='text-red-500'>{errors.logo.message}</p>}
          <hr />
        </div>

        {/* Other form fields */}
        <div className='flex flex-col gap-y-7 divide-y-2'>
          {/* Vendor Name */}
          <ProfileInputItem
            label='Vendor Name'
            desc='Official and registered vendor name'
          >
            <InputField
              type='text'
              name='name'
              placeholder='Enter name here'
              height='40px'
              error={errors?.name?.message}
              register={register}
              icon={<SVG icon={storeIcon} />}
            />
          </ProfileInputItem>

          {/* Username */}
          <ProfileInputItem
            label='Username'
            desc='A unique username to define your identity'
          >
            <UserNameInput
              register={register}
              name='username'
              error={errors?.username?.message}
            />
          </ProfileInputItem>
          <ProfileInputItem
            label='County and City'
            desc='County / and city in County'
            isLast
          >
            <div className='flex gap-3 items-center'>
              {/* County Selector */}
              <div className='relative w-1/2'>
                <ButtonSelector
                  value={selectedCounty || 'Select County'}
                  icon={mapIcon}
                  onClick={handleCountyClick}
                />
                {showCountyList && (
                  <div
                    className='dropdown absolute top-full right-0 mt-2 bg-white shadow-md p-2 max-h-[30vh] overflow-y-auto'
                    style={{ zIndex: 999999 }}
                  >
                    {counties.map(county => (
                      <div
                        key={county}
                        onClick={() => selectCounty(county)}
                        className='cursor-pointer hover:bg-gray-100 p-1'
                      >
                        {county}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* City Selector */}
              <div className='relative w-1/2'>
                <ButtonSelector
                  value={selectedCity || 'Select City'}
                  icon={mapIcon}
                  onClick={handleCityClick}
                />
                {showCitiesList && (
                  <div
                    className='dropdown absolute top-full right-0 mt-2 bg-white shadow-md p-2 max-h-[30vh] overflow-y-auto'
                    style={{ zIndex: 999999 }}
                  >
                    {cities.map(city => (
                      <div
                        key={city}
                        onClick={() => selectCity(city)}
                        className='cursor-pointer hover:bg-gray-100 p-1'
                      >
                        {city}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </ProfileInputItem>

          <ProfileInputItem
            label='Street Address'
            desc='First line street address of your venue'
          >
            <GooglePlacesAutocompleteInput
              name='address'
              register={register}
              errors={errors}
              address={address}
              setValue={setValue}
              getValues={getValues}
            />
          </ProfileInputItem>

          <ProfileInputItem label='Post Code' desc='Your post code' isLast>
            <div className='flex gap-3 items-center'>
              <div className='flex w-full  items-center rounded-[12px] border border-[#B4B5BB] px-3'>
                <SVG icon={pinIcon} />
                <input
                  type='text'
                  placeholder='Post code here'
                  className='flex-1 appearance-none border-none bg-transparent outline-none disabled:cursor-not-allowed disabled:opacity-30 h-10'
                  name='postcode'
                  {...register('postcode')}
                />
              </div>
            </div>
            {errors?.postcode && (
              <p className='mt-2 text-sm text-red-600'>
                {errors.postcode.message}
              </p>
            )}
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
            label={'Time Duration'}
            desc='Starting and finishing time of the training'
            error={errors?.startingTime?.message || errors?.endingTime?.message}
          >
            <div className='flex gap-3'>
              <ButtonSelector value='Starting'>
                <input
                  type='time'
                  className='border-none bg-transparent outline-none text-center'
                  onChange={e => {
                    const time = setTime(e);
                    setValue('startingTime', time);
                  }} // Handle time change
                />
              </ButtonSelector>

              <ButtonSelector value='Finishing'>
                <input
                  type='time'
                  className='border-none bg-transparent outline-none text-center'
                  onChange={e => {
                    const time = setTime(e);
                    setValue('endingTime', time);
                  }} // Handle time change
                />
              </ButtonSelector>
            </div>
          </ProfileInputItem>
        </div>
      </form>
    </SideModal>
  );
};

export default Profile;
