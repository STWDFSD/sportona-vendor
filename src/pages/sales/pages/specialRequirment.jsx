import SVG from 'components/renderSvg';
import React from 'react';
import back from 'media/svgs/back.svg';
import { useNavigate } from 'react-router-dom';
import CustomerCard from '../components/CustomerCard';
import { customerData } from '../components/data';

const GoBack = () => {
  const navigate = useNavigate();
  return (
    <div className='flex items-center space-x-3'>
      <SVG
        icon={back}
        className='cursor-pointer'
        onClick={() => navigate(-1)}
      />
      <p>Special Requirements</p>
    </div>
  );
};

const SpecialRequirment = () => {
  return (
    <div>
      <GoBack />
      <div className='grid mt-4 p-2 md:grid-cols-2 xs:grid-cols-1 gap-6'>
        {customerData.map((customer, index) => (
          <CustomerCard key={index} {...customer} />
        ))}
      </div>
    </div>
  );
};

export default SpecialRequirment;
