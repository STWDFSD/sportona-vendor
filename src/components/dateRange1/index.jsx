import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Required styles for the calendar

const DateRangeComponent = ({ days }) => {
  const [highlightedDates, setHighlightedDates] = useState([]);

  // Set highlighted dates based on the `days` prop
  useEffect(() => {
    const selectedDates = days
      .filter(day => day.isSelected) // Only include selected days
      .map(day => {
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), day.id); // Create Date objects
      });

    setHighlightedDates(selectedDates);
  }, [days]);

  // Determine tile class for each date
  const getTileClassName = ({ date }) => {
    const isHighlighted = highlightedDates.some(
      highlightedDate =>
        highlightedDate.getFullYear() === date.getFullYear() &&
        highlightedDate.getMonth() === date.getMonth() &&
        highlightedDate.getDate() === date.getDate()
    );

    return isHighlighted ? 'bg-green-500 text-white rounded-full' : '';
  };

  return (
    <div className='p-4 border rounded-lg shadow-lg'>
      <Calendar
        tileClassName={getTileClassName}
        calendarType='iso8601' // Adjust based on your preference
        className='w-full'
      />
    </div>
  );
};

export default DateRangeComponent;
