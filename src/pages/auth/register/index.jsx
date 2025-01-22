import React, { useEffect, useState } from 'react';
import logo from 'media/pngs/logo.png';
import DynamicForm from 'components/dynamicForm';
import SVG from 'components/renderSvg';
import * as yup from 'yup';
import InputField from 'components/inputField';
import Button from 'components/button';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import emailIcon from '../../../media/svgs/email.svg';
import keyIcon from '../../../media/svgs/Key.svg';
import passwordIcon from '../../../media/svgs/password.svg';
import useAuth from 'hooks/useAuth';
import useDocument from 'hooks/useDocument';
import CustomSelect from 'components/customSelect';
import ProfileInputItem from 'pages/setup/components/profileInputItem';
import { registerSchema } from 'schema';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [countries, setCountries] = useState([]);
  const { fetchCollection, loading, error } = useDocument('countries');

  useEffect(() => {
    const getCountries = async () => {
      const response = await fetchCollection('countries');
      if (response.result) {
        setCountries(response.data);
      } else {
        setCountries([]);
      }
    };

    getCountries();
  }, []);

  const { registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm: '',
      country: '',
    },
  });

  const onSubmit = async data => {
    setLoader(true);
    const response = await registerUser(data);
    if (response) {
      setLoader(false);
      navigate('/login');
      localStorage.setItem('loginTime', Date.now());
    } else {
      setLoader(false);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen flex-col bg-[#f7f7f8]'>
      <div className='flex flex-col items-center gap-1'>
        <img src={logo} alt='logo' />
        <div className='flex flex-col gap-1 items-center'>
          <p className='text-primary font-medium text-[24px]'>Create Account</p>
          <p className='text-[#3f3f50] font-normal text-[16px] text-center'>
            You’ve been invited to join the Sportona <br />
            Platform. Prepare to be amazed.
          </p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='md:w-[500px] xs:w-full sm:w-full bg-white shadow-sm p-6 rounded-[16px] mt-4'
      >
        <InputField
          type='email'
          name='email'
          label='Email'
          placeholder='Enter Email'
          error={errors?.email?.message}
          register={register}
          icon={<SVG icon={emailIcon} />}
        />
        <ProfileInputItem label='Country'>
          <CustomSelect
            loading={loading}
            options={countries?.map(country => ({
              label: country.nameEn,
              value: country.id,
            }))}
            name='country'
            isMulti={false}
            setSelectedValues={selectedCountry => {
              setValue('country', selectedCountry);
            }}
            error={errors?.country?.message}
          />
        </ProfileInputItem>
        <InputField
          type='password'
          label='Password'
          name='password'
          placeholder='Must be 8 digits long'
          error={errors?.password?.message}
          register={register}
          icon={<SVG icon={passwordIcon} />}
        />
        <InputField
          type='password'
          label='Confirm Password'
          name='confirm'
          placeholder='Must be 8 digits long'
          error={errors?.confirm?.message}
          register={register}
          icon={<SVG icon={keyIcon} />}
        />
        <div className='flex items-center gap-4'>
          <input
            type='checkbox'
            name='terms'
            className='size-4'
            {...register('terms')}
          />
          <label
            htmlFor='terms'
            className={errors?.terms ? 'text-red-500' : 'text-[#121217]'}
          >
            You must agree on our
          </label>
          <Button
            title='Terms & Conditions'
            className='text-[#6C6C89] border-[1.5px] border-dashed border-[#D1D1DB]'
            type='button'
            onClick={() =>
              window.open('https://sportona.com/terms-of-use', '_blank')
            }
          >
            Terms & Conditions
          </Button>
        </div>
        <Button
          title='Complete Registration'
          variant='success'
          className='w-full mt-5'
          disabled={loader}
        />

        <div className='flex flex-col items-center gap-2 my-4'>
          <span
            className=' font-medium text-[#7047EB] text-lg underline cursor-pointer'
            onClick={() => navigate('/login')}
          >
            Already have account?
          </span>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
