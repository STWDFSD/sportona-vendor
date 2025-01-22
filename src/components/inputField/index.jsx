import React, { useState } from 'react';
import styles from './index.module.scss';
import SVG from 'components/renderSvg';
import EyeOffIcon from '../../media/svgs/eye-off.svg';
import EyeONIcon from '../../media/svgs/eye.svg';

const InputField = ({
  icon,
  name,
  value,
  label,
  error,
  register = () => {},
  onChange,
  placeholder,
  type = 'text',
  className = '',
  disable = false,
  height = '48px',
  autoComplete = 'off',
  maxLength = 50,
  alphabet = false,
  alphanumeric = false,
  mb = true,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = e => {
    if (alphabet) {
      e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    }
    if (alphanumeric) {
      e.target.value = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '');
    }
  };

  return (
    <div className={`${mb && 'mb-5'} w-full ${className}`}>
      {label && (
        <label className='mb-[8px] block text-[16px] font-medium text-[#272A31]'>
          {label}
        </label>
      )}
      <div className='flex items-center rounded-[12px] border border-[#B4B5BB] px-3'>
        {icon && <span className='mr-2'>{icon}</span>}

        <input
          {...props}
          type={type === 'password' && !showPassword ? 'password' : 'text'}
          value={value}
          disabled={disable}
          onChange={onChange}
          maxLength={maxLength}
          {...register(name)}
          placeholder={placeholder}
          autoComplete={type === 'password' ? 'new-password' : autoComplete}
          className={` ${styles.numberInput} flex-1 appearance-none border-none bg-transparent outline-none disabled:cursor-not-allowed disabled:opacity-30`}
          style={{
            height,
            MozAppearance: 'textfield',
            backgroundColor: 'transparent',
          }}
          onInput={handleInputChange}
        />

        {type === 'password' && (
          <span
            onClick={togglePasswordVisibility}
            className='cursor-pointer text-gray-500'
          >
            {showPassword ? (
              <SVG icon={EyeONIcon} />
            ) : (
              <SVG icon={EyeOffIcon} />
            )}
          </span>
        )}
      </div>

      {error && (
        <p className='mt-2 text-sm text-red-600'>{error ? error : 'error'}</p>
      )}
    </div>
  );
};

export default InputField;
