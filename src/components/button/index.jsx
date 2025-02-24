import SVG from 'components/renderSvg';
import React from 'react';
import plusIcon from 'media/svgs/plus.svg';
const Button = ({
  variant,
  onClick,
  title = 'Submit',
  disabled,
  icon,
  iconRight = false,
  type = 'submit',
  className = '',
  form = '',
  isplus = false,
}) => {
  const baseStyle = ` px-[16px] h-[40px]  flex justify-center items-center text-center text-[16px] font-[400]  rounded-[8px] transition ease-in-out duration-150 ${className}`;
  const variantStyles = {
    primary: 'bg-primary text-white  font-[400] text-[16px]',
    secondary: 'bg-gray-500 text-white  font-[400] text-[16px]',
    danger: 'bg-red-500 text-white  font-[400] text-[16px]',
    success: 'bg-black text-white  font-[400] text-[16px]',
    outline:
      'bg-transparent border-[1px] border-solid border-gray-400   text-black font-[400] text-[16px]',
  };

  const disabledStyle = disabled
    ? 'opacity-50 !bg-gray-400  cursor-not-allowed'
    : '';

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]}  ${disabledStyle}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...(form ? { form: form } : {})}
    >
      {icon && (
        <span className={` ${iconRight ? 'order-2 pl-2' : 'order-1 pr-2'}`}>
          {/* Implement your icon rendering logic here */}
          {icon}
        </span>
      )}

      <span
        className={`text-[16px] font-normal  ${iconRight ? 'order-2' : 'order-2'}`}
      >
        {title}
      </span>

      {isplus && (
        <span className={` ${iconRight ? 'order-1 pr-2' : 'order-2 pl-2'}  `}>
          <SVG icon={plusIcon} />
        </span>
      )}
    </button>
  );
};

export default Button;
