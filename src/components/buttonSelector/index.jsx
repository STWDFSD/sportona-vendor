import SVG from 'components/renderSvg';
import crownIcon from '../../media/svgs/crownDown.svg';
import { useRef, cloneElement, isValidElement } from 'react';

const ButtonSelector = ({ icon, value, children, onClick = () => {} }) => {
  const inputRef = useRef(null);

  const handleButtonClick = () => {
    if (inputRef.current && typeof inputRef.current.showPicker === 'function') {
      inputRef.current.showPicker(); // Trigger the time picker popup
    } else {
      onClick();
    }
  };

  // Add the ref to the child if it's a valid element (e.g., <input />)
  const childrenWithRef = isValidElement(children)
    ? cloneElement(children, { ref: inputRef })
    : children;

  return (
    <div
      className='
      bg-white border-[1px] border-[#d1d1db]
      rounded-md w-full flex items-center
      justify-center gap-2 text-black py-2 px-2 cursor-pointer
    '
      role='button' // Make the div act like a button
      onClick={handleButtonClick} // Trigger time picker on click
    >
      <SVG icon={icon} />
      {value}
      {childrenWithRef}
      <SVG icon={crownIcon} />
    </div>
  );
};

export default ButtonSelector;
