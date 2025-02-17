import React from 'react';

const Button = ({
  title,
  variant = 'primary',
  icon,
  iconRight = false,
  onClick,
  disabled = false,
  className = ''
}) => {
  const baseClasses = 'inline-flex items-center rounded-md transition-colors';
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-dark',
    outline: 'border border-gray-300 text-gray-600 hover:bg-gray-50',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    tool: 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
      onClick={onClick}
      disabled={disabled}
    >
      {!iconRight && icon && (
        <span className="flex items-center w-4 h-4">{icon}</span>
      )}
      <span className="text-sm font-normal">{title}</span>
      {iconRight && icon && (
        <span className="flex items-center w-4 h-4">{icon}</span>
      )}
    </button>
  );
};

export default Button;
