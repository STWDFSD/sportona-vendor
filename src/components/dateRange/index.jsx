import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Main style file
import 'react-date-range/dist/theme/default.css'; // Theme CSS file

const DateRangeComponent = ({ onDateChange }) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const handleSelect = ranges => {
    setState([ranges.selection]);
    if (onDateChange) onDateChange(ranges.selection);
  };

  return (
    <div className='w-full'>
      <DateRangePicker
        ranges={state}
        onChange={handleSelect}
        months={1}
        showDateDisplay={false}
        direction='vertical'
        showPreview={false}
        moveRangeOnFirstSelection={true}
        rangeColors={['#3b82f6']}
        staticRanges={[]}
        inputRanges={[]}
      />
    </div>
  );
};

export default DateRangeComponent;
