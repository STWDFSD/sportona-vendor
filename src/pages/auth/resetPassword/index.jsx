import React, { useState } from 'react';
import logo from 'media/pngs/logo.png';
import SVG from 'components/renderSvg';
import InputField from 'components/inputField';
import Button from 'components/button';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import emailIcon from '../../../media/svgs/email.svg';
import keyIcon from '../../../media/svgs/Key.svg';
import passwordIcon from '../../../media/svgs/password.svg';
import useAuth from 'hooks/useAuth';
import * as yup from 'yup';
import { getFunctions, httpsCallable } from 'firebase/functions';
import toast from 'react-hot-toast';
const functions = getFunctions();
const sendOtp = httpsCallable(functions, 'sendOtp');
const verifyOtp = httpsCallable(functions, 'verifyOtp');
const resetPasswordWithOtp = httpsCallable(functions, 'resetPasswordWithOtp');

const requestOtpSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
});

const verifyOtpSchema = yup.object().shape({
  otp: yup
    .string()
    .length(6, 'OTP must be 6 digits')
    .required('OTP is required'),
});

const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});
const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { registerUser } = useAuth();
  const [loader, setLoader] = useState(false);
  const [otpEnabled, setOtpEnabled] = useState(false);
  const [passwordEnabled, setPasswordEnabled] = useState(false);

  const requestOtpForm = useForm({
    resolver: yupResolver(requestOtpSchema),
    defaultValues: { email: '' },
  });

  const verifyOtpForm = useForm({
    resolver: yupResolver(verifyOtpSchema),
    defaultValues: { otp: '' },
  });

  const resetPasswordForm = useForm({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: { password: '', confirm: '' },
  });

  const handleRequestOtp = async data => {
    setLoader(true);
    try {
      await sendOtp({ email: data.email });
      toast.success('OTP sent successfully!');
      setOtpEnabled(true);
    } catch (error) {
      toast.error(error.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoader(false);
    }
  };

  const handleVerifyOtp = async data => {
    setLoader(true);
    try {
      const email = requestOtpForm.watch('email');
      if (!email) {
        toast.success('Email is required to verify OTP.');
        return;
      }
      const result = await verifyOtp({ email, otp: data.otp });
      if (result.data.success) {
        toast.success('OTP Verified Successfully!');
        setPasswordEnabled(true);
      } else {
        toast.success('OTP Verification Failed. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.success(error.message || 'An error occurred while verifying OTP.');
    } finally {
      setLoader(false);
    }
  };

  const handleResetPassword = async data => {
    setLoader(true);
    try {
      const email = requestOtpForm.watch('email');
      if (!email) {
        toast.error('Email is required to reset the password.');
        return;
      }

      await resetPasswordWithOtp({ email, newPassword: data.password });
      toast.success('Password reset successfully!');
      navigate('/login');
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.error(error.message || 'Failed to reset password.');
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen flex-col bg-[#f7f7f8]'>
      <div className='flex flex-col items-center gap-1'>
        <img src={logo} alt='logo' />
        <p className='text-primary font-medium text-[24px]'>Reset Password</p>
        <p className='text-[#3f3f50] font-normal text-[16px] text-center'>
          Follow the steps below to reset your account’s password.
        </p>
      </div>
      <div className='bg-white shadow-sm p-6 rounded-[16px] mt-4'>
        <form
          onSubmit={requestOtpForm.handleSubmit(handleRequestOtp)}
          className='md:w-[500px] xs:w-full sm:w-full'
        >
          <div className='relative'>
            <button
              className='absolute right-2 top-[33px] border-l h-10 px-3 border-[#EBEBEF] text-sm text-[#121217]'
              type='submit'
            >
              Request OTP
            </button>
            <InputField
              type='email'
              name='email'
              label='Email'
              placeholder='Your registered email here'
              error={requestOtpForm.formState.errors?.email?.message}
              register={requestOtpForm.register}
              icon={<SVG icon={emailIcon} />}
              height='40px'
            />
          </div>
        </form>

        <form
          onSubmit={verifyOtpForm.handleSubmit(handleVerifyOtp)}
          className='md:w-[500px] xs:w-full sm:w-full'
        >
          <div className='relative'>
            <button
              className='absolute right-2 top-[33px] border-l h-10 px-3 border-[#EBEBEF] text-sm text-[#121217]'
              type='submit'
              disabled={!otpEnabled}
            >
              Verify
            </button>
            <InputField
              type='text'
              name='otp'
              label='OTP'
              placeholder='Enter OTP'
              error={verifyOtpForm.formState.errors?.otp?.message}
              register={verifyOtpForm.register}
              icon={<SVG icon={keyIcon} />}
              height='40px'
              disable={!otpEnabled}
            />
          </div>
        </form>

        <form
          onSubmit={resetPasswordForm.handleSubmit(handleResetPassword)}
          className='md:w-[500px] xs:w-full sm:w-full'
        >
          <InputField
            type='password'
            name='password'
            label='New Password'
            placeholder='Must be 8 characters long'
            error={resetPasswordForm.formState.errors?.password?.message}
            register={resetPasswordForm.register}
            icon={<SVG icon={passwordIcon} />}
            height='40px'
            disable={!passwordEnabled}
          />
          <InputField
            type='password'
            name='confirm'
            label='Confirm Password'
            placeholder='Must match the password above'
            error={resetPasswordForm.formState.errors?.confirm?.message}
            register={resetPasswordForm.register}
            icon={<SVG icon={keyIcon} />}
            height='40px'
            disable={!passwordEnabled}
          />
          <Button
            title='Reset Password'
            variant='success'
            className='w-full mt-5'
            disabled={!passwordEnabled || loader}
          />
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
