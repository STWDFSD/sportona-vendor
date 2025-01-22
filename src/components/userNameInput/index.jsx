import styles from './index.module.scss';

const UserNameInput = ({
  staticValue = 'sportona.com/',
  type = 'text',
  value,
  disable = false,
  onChange,
  register = () => {},
  name,
  placeholder = '',
  height = '40px',
  handleInputChange,
  error, // New error prop
  ...props
}) => {
  return (
    <div
      className={`flex items-center rounded-[12px] border ${
        error ? 'border-red-500' : 'border-[#B4B5BB]'
      } px-3`}
      style={{ height: '40px' }}
    >
      <div className='border-r-2 h-full flex items-center ml-2 mr-2'>
        {staticValue} &nbsp;
      </div>
      <input
        {...props}
        type={type}
        value={value}
        disabled={disable}
        onChange={onChange}
        {...register(name)}
        placeholder={placeholder}
        className={`${styles.numberInput} flex-1 appearance-none border-none bg-transparent outline-none disabled:cursor-not-allowed disabled:opacity-30`}
        style={{
          height,
          MozAppearance: 'textfield',
          backgroundColor: 'transparent',
        }}
        onInput={handleInputChange}
      />
      {error && <span className='text-red-500 text-sm'>{error}</span>}{' '}
      {/* Display error message */}
    </div>
  );
};

export default UserNameInput;
