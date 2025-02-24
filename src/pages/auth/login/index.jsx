import React, { useState } from 'react';
import logo from 'media/pngs/logo.png';
import SVG from 'components/renderSvg';

import InputField from 'components/inputField';
import Button from 'components/button';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import emailIcon from '../../../media/svgs/email.svg';
import passwordIcon from '../../../media/svgs/password.svg';
import useAuth from 'hooks/useAuth';
import useDocument from 'hooks/useDocument';
import { storeVenderData } from 'store/slices/venderslice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { loginValidationSchema } from 'schema';
import useVendor from 'hooks/useVendor';

const LoginPage = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { fetchUserById } = useDocument(`merchants`);
  const { fetchVenderById } = useVendor();

  const onSubmit = async data => {
    setLoader(true);
    const response = await loginUser(data);
    if (response?.status) {
      localStorage.setItem('loginTime', Date.now());
      const res = await fetchUserById(response?.id);
      if (res?.data?.profileCompleted) {
        const venderData = await fetchVenderById(
          `countries/${res?.data?.code}/vendors`,
          res?.data?.id
        );
        dispatch(storeVenderData({ ...res?.data, ...venderData }));
        navigate('/');
        setLoader(false);
        return;
      }
      dispatch(storeVenderData({ ...res?.data }));
      navigate('/');
      setLoader(false);
    } else {
      setLoader(false);
    }
  };
  return (
    <div className='flex justify-center items-center h-screen flex-col gap-6 bg-[#f7f7f8] '>
      <div className='flex flex-col items-center gap-10'>
        <img src={logo} alt='logo' srcset='' />
        <div className='flex flex-col gap-1 items-center'>
          <p className='text-primary font-medium text-[24px]'>Sportona Login</p>
          <p className='text-[#3f3f50] font-normal text-[16px]'>
            Welcome back! Manage your complete <br />
            business at ease within Sportona Platform.
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
          placeholder='Your email here'
          error={errors?.email?.message}
          register={register}
          icon={<SVG icon={emailIcon} />}
        />

        <InputField
          type='password'
          label='Password'
          name='password'
          placeholder='Enter your created password'
          error={errors?.password?.message}
          register={register}
          icon={<SVG icon={passwordIcon} />}
        />

        <Button
          title='Login'
          variant='primary'
          className='w-full mt-5'
          disabled={loader}
        />
        <div className='flex flex-col items-center gap-2 my-4'>
          <span
            className=' font-medium text-[#7047EB] text-lg underline cursor-pointer'
            onClick={() => navigate('/forgot-password')}
          >
            Forgot Password?
          </span>
          <span
            className=' font-medium text-[#7047EB] text-lg underline cursor-pointer'
            onClick={() => navigate('/register')}
          >
            Create an account?
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
