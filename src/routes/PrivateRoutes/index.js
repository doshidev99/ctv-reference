import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import i18n from 'i18next';

import { flatMap, map } from 'lodash';
import PrivateLayout from '../../layout/PrivateLayout';
import Dashboard from '../../pages/Dashboard';
import NewProperty from '../../pages/NewProperty';
import ListProperty from '../../pages/ListProperty';
import EmailBox from '../../pages/EmailBox';
import ListTransaction from '../../pages/ListTransaction';
import ProcessingTransaction from '../../pages/ListTransaction/ProcessingTransaction';
import CompletedTransaction from '../../pages/ListTransaction/CompletedTransaction';
import CanceledTransaction from '../../pages/ListTransaction/CanceledTransaction';
import ListRealtor from '../../pages/ListRealtor';
import DetailRealtor from '../../pages/DetailRealtor';
import Option from '../../pages/Option';
import ListAdmin from '../../pages/ListAdmin';
import ListPartner from '../../pages/ListPartner';

const routes = [
  {
    path: '/',
    component: Dashboard,
    exact: true,
    title: i18n.t('dashboard.title'),
  },
  {
    path: '/projects',
    component: ListProperty,
    exact: true,
    title: i18n.t('property.title'),
    routes: [
      {
        path: '/',
        component: ListProperty,
        exact: true,
        title: i18n.t('property.title'),
      },
      {
        path: '/create',
        component: NewProperty,
        exact: true,
        title: i18n.t('property.title'),
      },
    ],
  },
  {
    path: '/transactions',
    component: ListTransaction,
    exact: true,
    title: i18n.t('transaction.title'),
    routes: [
      {
        path: '/',
        component: ListTransaction,
        exact: true,
        title: i18n.t('transaction.title'),
      },
      {
        path: '/processing',
        component: ProcessingTransaction,
        exact: true,
        title: i18n.t('transaction.title'),
      },
      {
        path: '/completed',
        component: CompletedTransaction,
        exact: true,
        title: i18n.t('transaction.title'),
      },
      {
        path: '/canceled',
        component: CanceledTransaction,
        exact: true,
        title: i18n.t('transaction.title'),
      },
    ],
  },
  {
    path: '/realtors',
    component: ListRealtor,
    exact: true,
    title: i18n.t('realtor.title'),
    routes: [
      {
        path: '/',
        component: ListRealtor,
        exact: true,
        title: i18n.t('realtor.title'),
      },
      {
        path: '/:id',
        component: DetailRealtor,
        exact: true,
        title: i18n.t('realtor.title'),
      },
    ],
  },
  {
    path: '/inbox',
    component: EmailBox,
    exact: true,
    title: "Hộp thư",
  },
  {
    path: '/options',
    component: Option,
    exact: true,
    title: "Cấu hình",
  },
  {
    path: '/admins',
    component: ListAdmin,
    exact: true,
    title: "Quản trị viên",
  },
  {
    path: '/partners',
    component: ListPartner,
    exact: true,
    title: "Partner",
  },
];

const PrivateRoutes = () => (
  <Switch>
    {map(
      flatMap(routes, route => {
        if (route.routes) {
          return map(route.routes, subRoute => ({
            ...subRoute,
            path: route.path + subRoute.path,
            exact: subRoute.path === '/',
          }));
        }
        return route;
      }),
      route => (
        <Route
          {...route}
          component={e => (
            <PrivateLayout>
              <route.component {...e} />
            </PrivateLayout>
          )}
          key={route.path}
        />
      ),
    )}
  </Switch>
);

PrivateRoutes.propTypes = {};

export default connect(state => ({
  isAuthenticated: state.staff.isAuthenticated,
}))(PrivateRoutes);
