import React from 'react';
// @import dependencies
import DatePicker from 'react-datepicker';
// @import components
import SVG from 'components/renderSvg';
// @import media
import calendar from 'media/svgs/calendar.svg';
import crossIcon from 'media/svgs/crossicon.svg';
//@import styles
import 'react-datepicker/dist/react-datepicker.css';

const DateField = ({
  name,
  value,
  label,
  error,
  onClear,
  showtime = false,
  register = () => {},
  onChange,
  placeholder,
  className = '',
  disable = false,
  height = 'auto',
  minDate,
  autoComplete = 'off',
  ...props
}) => {
  const handleDateChange = date => {
    onChange(date);
  };

  return (
    <div className={`w-full  ${className}`}>
      {label && (
        <label className='mb-[8px] block text-[16px] font-medium text-[#272A31]'>
          {label}
        </label>
      )}
      <div
        style={{ height }}
        className='relative flex size-full items-center justify-center'
      >
        <DatePicker
          selected={value}
          onChange={handleDateChange}
          disabled={disable}
          {...register(name)}
          maxDate={new Date()}
          minDate={minDate}
          placeholderText={placeholder}
          showTimeSelect={showtime}
          dateFormat={showtime ? 'dd/MM/yyyy  h:mm aa' : 'dd/MM/yyyy'}
          autoComplete={autoComplete}
          className={`h-[48px] w-full flex-1 grow  border-none bg-transparent bg-none px-3 outline-none disabled:cursor-not-allowed disabled:opacity-30`}
          {...props}
        />

        {value ? (
          <span onClick={onClear}>
            <SVG
              icon={crossIcon}
              className='mr-2 size-6 cursor-pointer fill-[#8F919B]'
              fullSize
            />
          </span>
        ) : (
          <SVG
            icon={calendar}
            className='pointer-events-none absolute right-0 mr-2 h-[17px] w-[15px]'
            fullSize
          />
        )}
      </div>
      {error && (
        <p className='mt-2 text-sm text-red-600'>
          {error ? error?.message : 'error'}
        </p>
      )}
    </div>
  );
};

export default DateField;
