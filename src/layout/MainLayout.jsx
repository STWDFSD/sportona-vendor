import React, { Suspense, useEffect, useMemo, useState } from 'react';
// @ import dependencies
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
// @import pages
import NotFound from 'pages/notFound';
// @import components
import Sidebar from './Sidebar';
import Header from './Header';
import Loader from 'components/loader';
import Alerts from 'components/alert';
//@import redux slices

//@import routes
import { AppRoutes } from 'routes/AppRoutes';

import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const Layout = () => {
  const { isToggle } = useSelector(state => state.commonState);
  const { roles } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get current route
  const [loading, setIsloading] = useState(true);
  const auth = getAuth();

  const loginTime = localStorage.getItem('loginTime');

  const handleLogout = () => {
    navigate('/login');
    localStorage.clear();
    dispatch({ type: 'RESET_STATE' });
  };

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setIsloading(false);
      } else {
        setIsloading(false);

        handleLogout();
      }
    });
  }, [navigate, auth, location.pathname]); // Add location.pathname as a dependency

  const checkSession = () => {
    if (!loginTime) {
      handleLogout();
    }
    const currentTime = Date.now();

    if (loginTime && currentTime - loginTime > 86400000) {
      signOut(auth)
        .then(() => {
          handleLogout();
        })
        .catch(error => console.error('Sign out error:', error));
    }
  };

  useEffect(() => {
    checkSession();
  }, [auth, navigate, loginTime]);

  if (loading) return <Loader />;

  return (
    <div className='relative h-screen w-full'>
      <Sidebar handleLogout={handleLogout} />
      <Header handleLogout={handleLogout} />
      <div
        className={`overflow-auto pt-[80px] transition-all duration-300 ease-linear ${
          isToggle ? 'ml-[90px]' : 'ml-[296px]'
        }`}
      >
        <Loader />
        <Alerts />
        <Suspense fallback={<Loader />}>
          <Routes>
            {AppRoutes?.map((route, k) => (
              <Route key={k} path={route.path} element={<route.component />} />
            ))}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default Layout;
