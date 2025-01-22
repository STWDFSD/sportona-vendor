import React from 'react';
// @import components
import SVG from 'components/renderSvg';
// @import media
import downIcon from 'media/svgs/dropdown.svg';

const Select = ({
  name,
  label,
  error,
  register = () => {},
  className = '',
  disable = false,
  height = '48px',
  onChange,
  options = [],
  ...props
}) => {
  return (
    <div className={`${className}`}>
      {label && (
        <label className='mb-2 block text-[16px] font-medium text-[#272A31]'>
          {label}
        </label>
      )}
      <div className='relative rounded-[12px] border border-gray-300 px-3 '>
        <select
          name={name}
          onChange={onChange}
          disabled={disable}
          {...register(name)}
          className={` block  w-full cursor-pointer appearance-none border-none bg-transparent focus:outline-none disabled:cursor-not-allowed`}
          {...props}
          style={{
            height,
          }}
        >
          <option value=''>Please Select</option>
          {options?.map(option => (
            <option
              key={option.value}
              value={option.value}
              className='cursor-pointer bg-white hover:bg-gray-100'
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className='pointer-events-none absolute inset-y-0 right-1 flex items-center px-2 text-gray-700'>
          <SVG icon={downIcon} />
        </div>
      </div>
      {/* Error message */}
      {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
    </div>
  );
};

export default Select;
