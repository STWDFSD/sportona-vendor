import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';

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
  // ... (other styles remain unchanged)
};

const TagsSelect = ({
  label,
  error,
  options = [],
  value = [],
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
  const [selectOptions, setSelectOptions] = useState(options);

  const handleChange = selectedOption => {
    const selectedValues = selectedOption
      ? selectedOption.map(option => option.value)
      : [];
    setSelectedValues(selectedValues);
  };

  const handleCreate = inputValue => {
    // Create a new option object
    const newOption = { label: inputValue, value: inputValue };

    // Add the new option to the list of options and select it
    setSelectOptions(prevOptions => [...prevOptions, newOption]);
    setSelectedValues([...value, inputValue]);
  };

  return (
    <div className={`${mb && 'mb-5'} w-full ${className}`}>
      {label && (
        <label className='mb-[8px] block text-[16px] font-medium text-[#272A31]'>
          {label}
        </label>
      )}

      <CreatableSelect
        options={selectOptions}
        isMulti={isMulti}
        value={selectOptions.filter(opt => value.includes(opt.value))}
        onChange={handleChange}
        onCreateOption={handleCreate}
        isDisabled={isDisabled}
        styles={customStyles}
        isLoading={loading}
        className='flex-1 border-none bg-transparent outline-none disabled:cursor-not-allowed disabled:opacity-30'
        {...props}
      />
      <input type='hidden' value={value.join(',')} {...register(name)} />

      {error && <p className='mt-2 text-sm text-red-600'>{error}</p>}
    </div>
  );
};

export default TagsSelect;
