import SVG from 'components/renderSvg';
import React from 'react';
import forward from 'media/svgs/forward.svg';

const ActionSection = ({
  icon = null,
  title = '',
  isforward = true,
  height = 'h-auto',
  children,
  onClick = () => {},
}) => {
  return (
    <div
      className={`border border-1 border-solid rounded-[10px] ${height} w-full md:w-[320px]  p-4`}
    >
      <header
        className='flex justify-between items-center cursor-pointer'
        onClick={onClick}
      >
        <div className='flex items-center gap-x-3'>
          {icon && <SVG icon={icon} />}
          <span>{title}</span>
        </div>
        {isforward && <SVG icon={forward} />}
      </header>
      <div>{children}</div>
    </div>
  );
};

export default ActionSection;
