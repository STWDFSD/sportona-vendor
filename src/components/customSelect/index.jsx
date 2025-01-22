import React from 'react';
import Select from 'react-select';

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: '8px',
    borderColor: state.isFocused ? '#ccc' : '#ccc',
    padding: '0 8px',
    boxShadow: state.isFocused ? 'none' : 'none',
    border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
    outline: 'none',
    minHeight: '40px',
    height: '40px',
    lineHeight: '1.2',
    fontSize: '14px',
  }),
  valueContainer: provided => ({
    ...provided,
    padding: '0',
    height: '40px',
  }),
  input: provided => ({
    ...provided,
    margin: '0',
    padding: '0',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#6b7280' : '#fff',
    color: state.isSelected ? '#fff' : '#333',
    ':hover': {
      backgroundColor: '#6b7280',
      color: '#fff',
    },
  }),
  singleValue: provided => ({
    ...provided,
    padding: '0',
  }),
  menu: provided => ({
    ...provided,
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  }),
  multiValue: provided => ({
    ...provided,
    backgroundColor: '#6b7280',
    color: '#fff',
  }),
  multiValueLabel: provided => ({
    ...provided,
    color: '#fff',
  }),
  multiValueRemove: provided => ({
    ...provided,
    color: '#fff',
    ':hover': {
      backgroundColor: '#4b5563',
      color: '#fff',
    },
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: provided => ({
    ...provided,
    padding: '4px',
  }),
};

const CustomSelect = ({
  label,
  error,
  options,
  value,
  setSelectedValues,
  register = () => {},
  name,
  isDisabled = false,
  className = '',
  mb = true,
  isMulti = true,
  loading,
  ...props
}) => {
  const handleChange = selectedOption => {
    if (!isMulti) {
      setSelectedValues(selectedOption.value);
      return;
    }
    setSelectedValues(
      selectedOption ? selectedOption.map(option => option.value) : []
    );
  };

  return (
    <div className={`${mb && 'mb-5'} w-full ${className}`}>
      {label && (
        <label className='mb-[8px] block text-[16px] font-medium text-[#272A31]'>
          {label}
        </label>
      )}

      <Select
        options={options}
        isMulti={isMulti}
        value={value}
        onChange={handleChange}
        isDisabled={isDisabled}
        styles={customStyles}
        isLoading={loading}
        className='flex-1 border-none bg-transparent outline-none disabled:cursor-not-allowed disabled:opacity-30'
        {...props}
      />
      <input
        type='hidden'
        value={
          isMulti
            ? value?.map(option => option).join(',') // For multi-select
            : value?.value || '' // For single-select, use value's value or an empty string
        }
        {...register(name)}
      />

      {error && <p className='mt-2 text-sm text-red-600'>{error}</p>}
    </div>
  );
};

export default CustomSelect;
