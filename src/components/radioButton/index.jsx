import React from 'react';
// @import styles
import styles from './index.module.scss';

const RadioButtonGroup = ({
  label,
  error,
  register,
  name,
  options,
  disable = false,
  className = '',
}) => {
  return (
    <div
      className={`${styles.radioWrapper} mb-5 flex w-full flex-col space-y-2 ${className}`}
    >
      <label className='text-[16px] font-medium text-[#272A31]'>{label}</label>
      <div className=' flex items-center gap-10'>
        {options.map(option => (
          <label
            key={option.value}
            className='flex items-center text-[16px] font-medium text-[#272A31]'
          >
            <input
              type='radio'
              name={name}
              disabled={disable}
              className='hidden'
              {...register(name)}
              value={option?.value}
            />
            <span
              className={`${styles.radioInput} form-radio flex-no-shrink relative mr-2 inline-block size-4 cursor-pointer rounded-full border-2 border-gray-300 bg-white`}
            ></span>
            {option.label}
          </label>
        ))}
      </div>

      {error && (
        <p className='mt-2 text-sm text-red-600'>{error ? error : 'error'}</p>
      )}
    </div>
  );
};

export default RadioButtonGroup;
