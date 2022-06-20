import React from 'react';
import { routes } from '../constants';

const HomePage = React.lazy(() => import('../pages/HomePage/HomePage'));
const UsersPage = React.lazy(() => import('../pages/UsersPage/UsersPage'));
const EditUserPage = React.lazy(() => import('../pages/EditUserPage/EditUserPage'));

export const Pages = [
  {
    exact: true,
    path: routes.HOME,
    component: HomePage,
  },
  {
    exact: true,
    path: routes.USERS,
    component: UsersPage,
  },
  {
    path: routes.EDIT,
    component: EditUserPage,
  },
];
