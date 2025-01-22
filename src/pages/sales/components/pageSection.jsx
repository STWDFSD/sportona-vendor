import Button from 'components/button';
import SVG from 'components/renderSvg';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageSection = ({
  icon = null,
  title = '',
  desc = '',
  path,
  total,
  subscriptionIds,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(path, { state: { subscriptionIds } });
  };
  return (
    <div className='border border-1 border-solid rounded-[10px] p-4'>
      <SVG icon={icon} />
      <div className='py-2'>
        <p className='font-medium text-primary text-[16px]'>{title}</p>
        <p className='text-secondary text-[16px] mt-1'>{desc}</p>
      </div>
      <hr />
      <div className='mt-2'>
        <Button
          title={`View ${total}`}
          variant='outline'
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default PageSection;
