import React, { useEffect, useRef, useState } from 'react';
//@import dependencies
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
//@import components
import SVG from 'components/renderSvg';
// @import routes
import { SidebarRoutes } from 'routes/SidebarRoutes';
// @import media
import rightarrow from 'media/svgs/sidebar/rightarrow.svg';
import settingSlider from 'media/svgs/sidebar/settings-sliders.svg';

// @import styles
import styles from './index.module.scss';
// @import redux slices
import { togglesidebar } from 'store/slices/commonSlice';
// @import customHook
import useWindowSize from 'hooks/useWindowSize';

const SubMenu = ({ item, expand, submenuHeight, setSubmenuHeight }) => {
  const ref = useRef(null);

  const location = useLocation();
  const isExpand = expand.isExpand && expand.linkName === item.name;

  useEffect(() => {
    if (isExpand) {
      setSubmenuHeight(ref?.current?.scrollHeight);
    }
  }, [isExpand]);

  const handleToggle = () => {
    // if (!isToggle && width < 641) {
    //   dispatch(togglesidebar());
    // }
  };

  if (item?.subMenu?.length) {
    return (
      <ul
        ref={ref}
        className={styles.submenuList}
        style={{
          '--height': isExpand ? `${submenuHeight + 10}px` : '0',
        }}
      >
        {item.subMenu.map(child => (
          <li
            key={child.name}
            className={`${styles.subMenuItem}  ${
              location.pathname === child.path && `${styles.active}`
            }`}
            onClick={handleToggle}
          >
            <Link
              to={child.path}
              className={`w-full text-[14px] font-medium text-primary`}
            >
              {child.name}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
  return null;
};

const MenuItem = ({ item, expand }) => {
  return (
    <div className='flex w-full  items-center justify-between'>
      <div className='flex items-center gap-[8px] '>
        {item?.icon}
        <span
          className={`text-[16px] font-medium  text-primary ${styles.name}`}
        >
          {item.name}
        </span>
      </div>
      <div className={`${styles.arrowIcon} `}>
        {item?.subMenu ? <SVG icon={rightarrow} /> : null}
      </div>
    </div>
  );
};

const Sidebar = ({ handleLogout }) => {
  const [expand, setExpand] = useState({
    isExpand: false,
    linkName: '',
  });

  const totalTrialDays = 30;
  const [daysLeft, setDaysLeft] = useState(totalTrialDays);

  const [submenuHeight, setSubmenuHeight] = useState(0);
  const location = useLocation();
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const { isToggle } = useSelector(state => state.commonState);
  const venderData = useSelector(state => state?.vender?.venderData);

  let profileStatus = 0;

  if (venderData?.addBatch) {
    profileStatus += 20;
  }
  if (venderData?.addHall) {
    profileStatus += 20;
  }
  if (venderData?.addTrainer) {
    profileStatus += 20;
  }

  if (venderData?.profileCompleted) {
    profileStatus += 20;
  }
  if (venderData?.serviceCompleted) {
    profileStatus += 20;
  }

  // Check for the total to not exceed 100
  if (profileStatus > 100) {
    profileStatus = 100;
  }

  const handleExpand = (e, item) => {
    e.stopPropagation();

    if (item.subMenu?.length) {
      if (expand.linkName === item.name) {
        setExpand({ ...expand, isExpand: false, linkName: '' });
      } else {
        setExpand({ ...expand, isExpand: true, linkName: item.name });
      }
    }
  };

  useEffect(() => {
    SidebarRoutes?.forEach(item => {
      if (item?.subMenu) {
        item?.subMenu?.forEach(child => {
          if (child.path === location.pathname) {
            setExpand({ isExpand: true, linkName: item.name });
          }
        });
      }
    });
  }, [location.pathname]);

  const handleClick = () => {
    setExpand({ ...expand, isExpand: false, linkName: '' });
  };

  useEffect(() => {
    if (width < 1000 && !isToggle) {
      dispatch(togglesidebar());
    }
    if (width > 1000 && isToggle) {
      dispatch(togglesidebar());
    }
  }, [width]);

  useEffect(() => {
    const loginDate = new Date(localStorage.getItem('loginDate')) || new Date();
    const today = new Date();

    const diffInTime = today.getTime() - loginDate.getTime();
    const daysPassed = Math.floor(diffInTime / (1000 * 60 * 60 * 24));

    setDaysLeft(Math.max(totalTrialDays - daysPassed, 0));
  }, []);

  const progressPercentage =
    ((totalTrialDays - daysLeft) / totalTrialDays) * 100;

  return (
    <div
      className={`fixed  top-[90px] pb-[100px]  ${styles.sidebar}   ${
        isToggle ? styles.smallsidebar : ''
      } `}
    >
      <ul className={`${styles.menuList} h-full`}>
        {SidebarRoutes?.map(item => (
          <li key={item.name} className={styles.menuItemWrapper}>
            {item?.subMenu ? (
              <button
                onClick={e => handleExpand(e, item)}
                className={`w-full ${styles.menuItem} ${
                  location.pathname === item.path && `${styles.active}`
                }`}
              >
                <MenuItem item={item} expand={expand} />
              </button>
            ) : (
              <Link
                to={item?.path}
                onClick={handleClick}
                className={`w-full ${styles.menuItem} ${
                  location.pathname === item.path && `${styles.active}`
                }`}
              >
                <MenuItem item={item} expand={expand} />
              </Link>
            )}

            <SubMenu
              item={item}
              expand={expand}
              submenuHeight={submenuHeight}
              setSubmenuHeight={setSubmenuHeight}
            />
          </li>
        ))}
        <li className={styles.menuItemWrapper}>
          <Link
            to={'setup'}
            onClick={handleClick}
            className={`w-full ${styles.menuItem} ${
              location.pathname === '/setup' && `${styles.active}`
            }`}
          >
            <div className='flex w-full  items-center justify-between flex-wrap'>
              <div className='flex items-center  gap-[8px] '>
                <SVG icon={settingSlider} />
                <span
                  className={`text-[16px] font-medium  text-primary ${styles.name}`}
                >
                  Setup
                </span>
              </div>
              <div className='border border-[#d1d1db] text-[#7047eb] px-2 rounded-xl'>
                {profileStatus}%
              </div>
            </div>
          </Link>
        </li>
      </ul>
      <Link
        className={`absolute inset-x-6 z-50 flex flex-col items-center text-primary`}
        to={'/plans'}
      >
        <p className='text-[14px] text-primary mb-2'>Trial Accelerator Plan</p>
        <div className='w-full bg-primary rounded-full h-2 overflow-hidden'>
          <div
            className='bg-gray-200 h-2'
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className='text-[12px] text-gray-600 mt-2'>
          {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
