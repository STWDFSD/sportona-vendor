import ButtonSelector from 'components/buttonSelector';
import ProfileInputItem from 'pages/setup/components/profileInputItem';
import React, { useState } from 'react';
import gbIcon from '../../../media/svgs/GB.svg';
import mapIcon from '../../../media/svgs/map.svg';
import InputField from 'components/inputField';
import pinIcon from '../../../media/svgs/pin.svg';
import SVG from 'components/renderSvg';
import clockIcon from '../../../media/svgs/clocksmall.svg';
import DaysSelection from 'components/daysSelection';

const EditDetails = () => {
  const [selectedDays, setSelectedDays] = useState([]);

  return (
    <form className=' divide-y divide-[#eaeaee] flex flex-col gap-y-6'>
      <ProfileInputItem
        label={'Country and County'}
        desc='To locate your services'
      >
        <div className='flex gap-3'>
          <ButtonSelector value={'United Kingdom'} icon={gbIcon} />
          <ButtonSelector value={'West Yorkshire'} icon={mapIcon} />
        </div>
      </ProfileInputItem>
      <ProfileInputItem
        label={'Street Address'}
        desc='First line street address of your venue'
      >
        <InputField
          type='text'
          placeholder='Street address here'
          height='40px'
          name='address'
          mb={false}
          // error={errors?.address?.message}
          // register={register}
          icon={<SVG icon={pinIcon} />}
        />
      </ProfileInputItem>

      <ProfileInputItem
        label={'City and Post Code'}
        desc='City / Town name along with your post code'
        isLast={true}
      >
        <div className='flex gap-3 items-center'>
          <ButtonSelector value={'Select City'} icon={mapIcon} />
          <div className='flex items-center rounded-[12px] border border-[#B4B5BB] px-3'>
            <SVG icon={pinIcon} />
            <input
              type='text'
              placeholder='Post code here'
              className={`flex-1 appearance-none border-none bg-transparent outline-none disabled:cursor-not-allowed disabled:opacity-30 h-10`}
              name='postcode'
              // error={errors?.postcode?.message}
              // register={register}
            />
          </div>
        </div>
      </ProfileInputItem>
      <ProfileInputItem
        label={'Time Duration'}
        desc='Starting and finishing time of the training'
      >
        <div className='flex gap-3'>
          <ButtonSelector value='Starting'>
            <input
              type='time'
              className='border-none bg-transparent outline-none text-center'
              onChange={e => console.log(e.target.value)} // Handle time change
            />
          </ButtonSelector>

          <ButtonSelector value='Finishing'>
            <input
              type='time'
              className='border-none bg-transparent outline-none text-center'
              onChange={e => console.log(e.target.value)} // Handle time change
            />
          </ButtonSelector>
        </div>
      </ProfileInputItem>

      <ProfileInputItem
        label={'Training Days'}
        desc='Open days for the training per week'
      >
        <DaysSelection
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
        />
      </ProfileInputItem>
    </form>
  );
};

export default EditDetails;
