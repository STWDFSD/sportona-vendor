import { Routes, Route, useLocation } from 'react-router-dom';
// @import components
import MainLayout from 'layout/MainLayout';
// @import dependencies
import { Helmet } from 'react-helmet';
import LoginPage from 'pages/auth/login';
import Plans from 'pages/plans';
import { Toaster } from 'react-hot-toast';
import RegisterPage from 'pages/auth/register';
import ForgotPasswordPage from 'pages/auth/resetPassword';

function App() {
  const location = useLocation();

  const getPath = () => {
    const path = location.pathname.split('/');
    if (path && path[1] === '') {
      return 'Home';
    } else if (path[2] === 'add') {
      return `Add ${path[1]} `;
    } else if (path[2] === 'edit') {
      return `Edit ${path[1]} `;
    } else if (path[2] === 'add-right') {
      return `Add ${path[1]} Rights `;
    } else if (path[2] === 'subscription-report') {
      return `subscription ${path[1]} `;
    } else if (path[2] === 'audit-report') {
      return `Audit ${path[1]} `;
    } else if (path[2] === 'login') {
      return `${path[2]} `;
    } else if (path[2] === 'forget-password') {
      return `${path[2]} `;
    } else {
      return `${path[1]} `;
    }
  };
  const title = location.pathname ? getPath() : 'Sportona';

  const capitalizeTitle = title => {
    if (!title) return '';
    return title
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <>
      <Helmet>
        <title>{capitalizeTitle(title)}</title>
        <meta name='description' content='Your page description here' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Helmet>
      <Toaster />
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/plans' element={<Plans />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />

        {/* <Route path='/auth/forget-password' element={<ForgetPassword />} /> */}
        <Route path='/*' element={<MainLayout />} />
      </Routes>
    </>
  );
}

export default App;
