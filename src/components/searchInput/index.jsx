import React from 'react';
//@import components
import SVG from 'components/renderSvg';
//@import media
import searchIcon from 'media/svgs/search.svg';
import redCross from 'media/svgs/crossicon.svg';

const SearchBar = ({
  name,
  value,
  onChange,
  placeholder = 'Search here',
  type = 'text',
  className = '',
  disable = false,
  height = 'auto',
  handleClear,
  onSubmit,
  ...props
}) => {
  return (
    <form onSubmit={onSubmit} className={` w-full  ${className}`}>
      <div
        style={{ height }}
        className='flex items-center overflow-hidden rounded-[12px] border border-[#B4B5BB] px-1'
      >
        <button
          className={`${value ? 'order-3' : 'order-1'} p-2`}
          type='submit'
        >
          <SVG icon={searchIcon} />
        </button>

        <input
          type={type}
          value={value}
          disabled={disable}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={40}
          style={{ backgroundColor: 'transparent' }}
          className={`order-2 min-w-0 flex-1 border-none bg-transparent bg-none outline-none ${
            value ? 'pl-0' : 'pl-2'
          } py-2`}
          {...props}
        />
        {value && (
          <button
            className='text-md order-1 p-2 text-red-500'
            onClick={handleClear}
            type='button'
          >
            <SVG icon={redCross} className='size-6 fill-[#8F919B]' fullSize />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
