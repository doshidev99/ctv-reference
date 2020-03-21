import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import i18n from 'i18next';

import { flatMap, map } from 'lodash';
import PrivateLayout from '../../layout/PrivateLayout';
import Dashboard from '../../pages/Dashboard';
import NewProperty from '../../pages/NewProperty';
import ListProperty from '../../pages/ListProperty';
import DetailTransactionPage from '../../pages/DetailTransaction'

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
    component: DetailTransactionPage,
    exact: true,
    title: i18n.t('transaction.title'),
    routes: [
      {
        path: '/:id/show',
        component: DetailTransactionPage,
        exact: true,
        title: i18n.t('transaction.detail.title'),
      },
    ],
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
