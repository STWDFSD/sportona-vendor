// @import components
import SVG from 'components/renderSvg';
//@import user rights
import { userRights } from './userRights';
// @import media
import home from 'media/svgs/sidebar/home.svg';
import service from 'media/svgs/sidebar/cards-2.svg';
import sales from 'media/svgs/sidebar/package.svg';
import staff from 'media/svgs/sidebar/whistle.svg';
import finance from 'media/svgs/sidebar/wallet.svg';
import operations from 'media/svgs/sidebar/configuration.svg';
import trend from 'media/svgs/sidebar/chart-increase.svg';
import challenges from 'media/svgs/sidebar/target-arrow.svg';
import ranking from 'media/svgs/sidebar/ranking.svg';

export const SidebarRoutes = [
  {
    path: '/',
    icon: <SVG icon={home} className='' />,
    name: 'Home',
  },
  {
    path: '/services',
    icon: <SVG icon={service} className='' />,
    name: 'Services',
    // subMenu: [
    //   {
    //     path: '/services/add',
    //     name: 'Add Users',
    //     roles: userRights.ROLE_MANAGE_USER,
    //   },
    //   {
    //     path: '/services/view',
    //     name: 'View Users',
    //     roles: userRights.ROLE_MANAGE_USER,
    //   },
    // ],
  },
  {
    path: '/sales',
    icon: <SVG icon={sales} className='' />,
    name: 'Sales',
  },
  {
    path: '/staff',
    icon: <SVG icon={staff} className='' />,
    name: 'Staff',
  },
  {
    path: '/finance',
    icon: <SVG icon={finance} className='' />,
    name: 'Finance',
  },
  // {
  //   path: '/operations',
  //   icon: <SVG icon={operations} className='' />,
  //   name: 'Operations',
  // },
  // {
  //   path: '/trends',
  //   icon: <SVG icon={trend} className='' />,
  //   name: 'Trends',
  // },
  {
    path: '/challenges',
    icon: <SVG icon={challenges} className='' />,
    name: 'Challenges',
  },
  {
    path: '/rankings',
    icon: <SVG icon={ranking} className='' />,
    name: 'Rankings',
  },
];
