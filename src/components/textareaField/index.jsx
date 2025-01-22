import React from 'react';

const TextareaField = ({
  name,
  value,
  label,
  error,
  register = () => {},
  onChange,
  placeholder,
  className = '',
  disable = false,
  height = '100px',
  maxLength = 200,
  alphabet = false,
  rows = 7,
  alphanumeric = false,
  ...props
}) => {
  const handleTextareaChange = e => {
    if (alphabet) {
      e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    }
    if (alphanumeric) {
      e.target.value = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '');
    }
    onChange && onChange(e);
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className='mb-[8px] block text-[16px] font-medium text-[#272A31]'>
          {label}
        </label>
      )}
      <div className='flex flex-col rounded-[12px] border border-[#B4B5BB] px-3'>
        <textarea
          rows={rows}
          {...props}
          value={value}
          disabled={disable}
          onChange={handleTextareaChange}
          maxLength={maxLength}
          {...register(name)}
          placeholder={placeholder}
          className={` my-2 flex-1 appearance-none border-none bg-transparent outline-none disabled:cursor-not-allowed disabled:opacity-30`}
          style={{
            height,
            MozAppearance: 'textfield',
            backgroundColor: 'transparent',
            resize: 'none',
          }}
        />
      </div>

      {error && (
        <p className='mt-2 text-sm text-red-600'>{error ? error : 'error'}</p>
      )}
    </div>
  );
};

export default TextareaField;
