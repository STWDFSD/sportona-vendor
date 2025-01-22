import { lazy } from 'react';
//@import routes
const Home = lazy(() => import('pages/home/index'));
const Services = lazy(() => import('pages/services/index'));
const Sales = lazy(() => import('pages/sales/index'));
const Staff = lazy(() => import('pages/staff/index'));
const Finance = lazy(() => import('pages/finance/index'));
const Operations = lazy(() => import('pages/operations/index'));
const Trends = lazy(() => import('pages/trends/index'));
const Challenges = lazy(() => import('pages/challenges/index'));
const Rankings = lazy(() => import('pages/rankings/index'));
const Setup = lazy(() => import('pages/setup'));

export const AppRoutes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/services',
    component: Services,
  },
  {
    path: '/sales/*',
    component: Sales,
  },
  {
    path: '/staff',
    component: Staff,
  },

  {
    path: '/finance',
    component: Finance,
  },
  // {
  //   path: '/operations',
  //   component: Operations,
  // },
  // {
  //   path: '/trends',
  //   component: Trends,
  // },
  {
    path: '/challenges/*',
    component: Challenges,
  },
  {
    path: '/rankings',
    component: Rankings,
  },
  {
    path: '/setup',
    component: Setup,
  },
];
