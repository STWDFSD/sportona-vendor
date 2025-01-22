const DaysSelection = ({ trainingDays, setTrainingDays }) => {
  const daysList = [
    { id: 1, day: 'Monday', isSelected: false },
    { id: 2, day: 'Tuesday', isSelected: false },
    { id: 3, day: 'Wednesday', isSelected: false },
    { id: 4, day: 'Thursday', isSelected: false },
    { id: 5, day: 'Friday', isSelected: false },
    { id: 6, day: 'Saturday', isSelected: false },
    { id: 7, day: 'Sunday', isSelected: false },
  ];

  const toggleDay = id => {
    const updatedDays = trainingDays.map(day =>
      day.id === id ? { ...day, isSelected: !day.isSelected } : day
    );
    setTrainingDays(updatedDays);
  };

  return (
    <div className='flex justify-between mx-2'>
      {daysList.map(day => (
        <button
          type='button'
          key={day.id}
          onClick={() => toggleDay(day.id)}
          className={`rounded-md px-3 py-1 border ${
            trainingDays?.find(d => d.id === day.id)?.isSelected
              ? 'text-[#4316ca] shadow-lg'
              : 'bg-[#F7F7F8] text-[#6C6C89]'
          }`}
        >
          {day.day.charAt(0)}
        </button>
      ))}
    </div>
  );
};

export default DaysSelection;
