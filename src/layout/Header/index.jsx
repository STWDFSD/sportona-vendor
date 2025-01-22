import React, { useRef, useState } from 'react';
import logo from 'media/pngs/logo.png';
import sportana from 'media/pngs/Sportona.png';
import SVG from 'components/renderSvg';
import SearchBar from 'components/searchInput';
import { Link, useNavigate } from 'react-router-dom';

import useWindowSize from 'hooks/useWindowSize';
import { useSelector } from 'react-redux';
import edit from 'media/svgs/editprofile.svg';
import euro from 'media/svgs/gbp.svg';
import logout from 'media/svgs/log-out.svg';
import { signOut } from 'firebase/auth';
import { auth } from 'firebaseConfig';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { venderData } = useSelector(state => state.vender);

  console.log(venderData);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };
  const { width } = useWindowSize();
  function getGreetingBasedOnTime() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour < 12) {
      return 'Morning';
    } else if (currentHour >= 12 && currentHour < 17) {
      return 'Afternoon';
    } else {
      return 'Evening';
    }
  }

  const DropdownMenu = () => {
    return (
      <div
        className='absolute right-8 top-[70px] w-[290px] bg-white rounded-md shadow-lg  z-50 border  border-solid border-gray-400'
        ref={dropdownRef}
      >
        <div className='flex justify-between items-center p-3'>
          <div className='flex-shrink-0'>
            {venderData?.logo ? (
              <img
                src={venderData?.logo}
                alt='logo'
                className='w-[42px] h-[42px] rounded-full cursor-pointer'
              />
            ) : (
              <div className='capitalize bg-primary text-white flex justify-center items-center w-[40px] h-[40px] rounded-full cursor-pointer'>
                {venderData?.email?.charAt(0)}
              </div>
            )}
          </div>
          <div className='flex flex-col '>
            <p className='text-[14px] text-primary font-medium'>
              {venderData?.country || ''}
            </p>
            <div className='flex flex-col'>
              <p className='text-primary text-[15px]'>
                {venderData?.name || 'Youth'}
              </p>
              <p className='text-secondary text-[12px]'>{venderData?.email}</p>
            </div>
          </div>
          <span className='bg-[#F4F1FD] text-[#4316CA] text-[12px] rounded-[20px] px-2 py-1 '>
            Pro
          </span>
        </div>
        <hr />
        <div className='flex flex-col p-3 space-y-2'>
          <div className='flex items-center space-x-3 cursor-pointer'>
            <SVG icon={edit} />
            <Link to={'/setup'}>
              <p className='text-[14px] text-primary'>Edit Profile</p>
            </Link>
          </div>
          <div className='flex items-center space-x-3 cursor-pointer'>
            <SVG icon={euro} />
            <Link to={'/sales'}>
              <p className='text-[14px] text-primary'>Subscription</p>
            </Link>
          </div>
        </div>
        <hr />
        <div className='flex items-center space-x-2 p-3 cursor-pointer'>
          <SVG icon={logout} />
          <p
            onClick={() => {
              signOut(auth)
                .then(() => {
                  navigate('/login');
                })
                .catch(error => {
                  console.error('Error signing out:', error);
                });
            }}
            className='text-[14px] text-primary'
          >
            Logout
          </p>
        </div>
        <p className='text-secondary text-[12px] px-4 pb-3'>
          v.0.1 Beta • Terms • Privacy
        </p>
      </div>
    );
  };

  return (
    <>
      <div
        className={`fixed w-full left-0 top-0 z-50 bg-[#f7f7f8] flex h-[70px] items-center justify-between   px-3 lg:px-[26px]    `}
      >
        <div
          className={`flex items-center gap-4 ${width > 1000 ? 'w-[270px]' : 'w-[70px]'} cursor-pointer`}
          onClick={() => navigate('/')}
        >
          <img src={logo} alt='logo' />
          {width > 1000 && (
            <img src={sportana} alt='sportana' className='mt-1' />
          )}
        </div>
        <div className='flex-1 flex justify-end md:justify-between items-center '>
          {width > 800 && (
            <div className='flex items-start gap-2   '>
              <span className='text-primary font-medium text-sm lg:text-xl'>
                {getGreetingBasedOnTime()}
                {' !'}
              </span>
              <span className='text-[#6C6C89] font-medium text-sm lg:text-xl '>
                {venderData?.name || 'Youth'}
              </span>
            </div>
          )}

          <div className='flex items-center gap-4'>
            <SearchBar value={''} />
            <div className='flex-shrink-0'>
              {venderData?.photoURL ? (
                <img
                  src={venderData?.photoURL}
                  alt='logo'
                  className='w-10 h-10 rounded-full cursor-pointer'
                  onClick={toggleDropdown}
                />
              ) : (
                <div
                  onClick={toggleDropdown}
                  className='capitalize bg-primary text-white flex justify-center items-center w-10 h-10 rounded-full cursor-pointer'
                >
                  {venderData?.email?.charAt(0)}
                </div>
              )}
            </div>
          </div>
          {isOpen && <DropdownMenu />}
        </div>
      </div>
    </>
  );
};

export default Header;
