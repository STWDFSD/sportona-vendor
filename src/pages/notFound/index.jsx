import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className='m-auto flex h-[70vh] items-center justify-center text-center'>
      <div>
        <p className='text-2xl'>404 Page Not Found.</p>
        <p
          onClick={() => navigate(-1)}
          className='cursor-pointer text-primary underline'
        >
          Go Back
        </p>
      </div>
    </div>
  );
};

export default NotFound;
