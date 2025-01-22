import Button from 'components/button';
import React, { useState } from 'react';
import MonthNavigator from './monthnavigation';
import service from 'media/svgs/servicesicon.svg';
import crowed from 'media/svgs/crowd.svg';
import SVG from 'components/renderSvg';
import SelectButton from 'components/button/selectButton';
const options = ['Daily', 'Monthly', 'Yearly'];
const HomeHeader = ({ setIsOpen }) => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleOptionClick = option => {
    setDropdownOpen(false);
    setIsOpen({ show: true, data: option });
  };

  return (
    <div className='flex justify-between items-center flex-wrap px-2 py-0 xs:py-2 sm:py-1 relative'>
      <div className='flex items-center flex-wrap  space-x-6'>
        <SelectButton
          options={options}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <MonthNavigator />
      </div>
      <div className='relative'>
        <Button
          title='Add'
          variant={'success'}
          isplus
          onClick={toggleDropdown}
        />
        {isDropdownOpen && (
          <div className='absolute right-0 mt-2 w-48 py-2 bg-white shadow-lg rounded-md z-10'>
            <div className='flex flex-col items-start'>
              <Button
                title='New Service'
                icon={<SVG icon={service} />}
                onClick={() => handleOptionClick('New Service')}
              />

              <Button
                title='New Batch'
                icon={<SVG icon={crowed} />}
                onClick={() => handleOptionClick('New Batch')}
              />

              {/* <Button
                title='New Trainer'
                icon={<SVG icon={crowed} />}
                onClick={() => handleOptionClick('New Trainer')}
              /> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeHeader;
