import React from 'react';
//@import components
import SVG from '../renderSvg';
//@import media
import searchIcon from 'media/svgs/search.svg';
import closeIcon from 'media/svgs/close.svg';

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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative mb-4">
      <div className="relative flex items-center">
        {!value && (
          <SVG
            icon={searchIcon}
            className="absolute left-3 h-5 w-5 text-gray-400"
          />
        )}
        <input
          type={type}
          name={name}
          value={value}
          disabled={disable}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={40}
          style={{ backgroundColor: 'transparent', height }}
          className={`w-full rounded-lg border border-gray-300 py-2 ${value ? 'px-3' : 'pl-10 pr-3'
            } focus:border-primary focus:outline-none ${className}`}
          {...props}
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3"
          >
            <SVG icon={closeIcon} className="h-5 w-5 text-gray-400" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
