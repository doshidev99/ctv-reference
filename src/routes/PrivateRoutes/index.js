import React, {Component, lazy, Suspense} from 'react';

import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import i18n from 'i18next';
import { flatMap, map } from 'lodash';
import ModalRoute from '../ModalRoute';
import Loading from '../../components/common/LoadingScreen';
import PrivateLayout from '../../layout/PrivateLayout';
import Dashboard from '../../pages/Dashboard';
import DetailTransaction from '../../pages/DetailTransaction'
import EmailBox from '../../pages/EmailBox';
import ListTransaction from '../../pages/ListTransaction';
import ProcessingTransaction from '../../pages/ListTransaction/ProcessingTransaction';
import CompletedTransaction from '../../pages/ListTransaction/CompletedTransaction';
import CanceledTransaction from '../../pages/ListTransaction/CanceledTransaction';
import Option from '../../pages/Option';
import ListPartner from '../../pages/ListPartner';
import ListEvent from '../../pages/ListEvent';
import NewEvent from '../../pages/NewEvent';
import DetailEvent from '../../pages/DetailEvent';
import Training from '../../pages/Training';

const routes = [
  {
    path: '/',
    component: Dashboard,
    exact: true,
    title: i18n.t('dashboard.title'),
  },
  {
    path: '/properties',
    component: lazy(() => import('../../pages/Property/List')),
    exact: true,
    title: i18n.t('property.title'),
    routes: [
      {
        path: '/',
        component: lazy(() => import('../../pages/Property/List')),
        exact: true,
        title: i18n.t('property.title'),
      },
      {
        path: '/create',
        component:lazy(() => import('../../pages/Property/Create')),
        exact: true,
        title: i18n.t('property.title'),
      },
      {
        path: '/:id/edit',
        component:lazy(() => import('../../pages/Property/Edit')),
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
        path: '/:id/show',
        component: DetailTransaction,
        exact: true,
        title: i18n.t('transaction.detail.title'),
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
    component: lazy(() => import('../../pages/Realtor/index')),
    exact: true,
    title: i18n.t('realtor.title'),
    routes: [
      {
        path: '/',
        component: lazy(() => import('../../pages/Realtor/index')),
        exact: true,
        title: i18n.t('realtor.title'),
      },
      {
        path: '/:id',
        component: lazy(() => import('../../pages/DetailRealtor/index')),
        exact: true,
        title: i18n.t('realtor.title'),
      },
    ],
  },
  // {
  //   path: '/realtors',
  //   component: ListReator,
  //   exact: true,
  //   title: i18n.t('realtor.title'),
  // },
  {
    path: '/inbox',
    component: EmailBox,
    exact: true,
    title: "Hộp thư",
  },
  {
    path: '/events',
    component: ListEvent,
    exact: true,
    title: "Sự kiện",
    routes: [
      {
        path: '/',
        component: ListEvent,
        exact: true,
        title: "Danh sách sự kiện",
      },
      {
        path: '/create',
        component: NewEvent,
        exact: true,
        title: "Tạo mới sự kiện",
      },
      {
        path: '/:id/show',
        component: DetailEvent,
        exact: true,
        title: i18n.t('realtor.title'),
      },
    ],
  },
  {
    path: '/staffs',
    component: lazy(() => import('../../pages/Admin/index')),
    exact: true,
    title: "Quản trị viên",
  },
  {
    path: '/partners',
    component: ListPartner,
    exact: true,
    title: "Partner",
  },
  {
    path: '/options',
    component: Option,
    exact: true,
    title: "Cấu hình",
  },
  {
    path: '/trainings',
    component: Training,
    exact: true,
    title: "Đào tạo",
  },
];







class PrivateRoutes extends Component {

  render() {
    return (
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
              component={e => {
                // console.log(e);
                
                return(
                  <PrivateLayout>
                    <Suspense fallback={<Loading />}>
                      <route.component {...e} />
                    </Suspense>
                    <ModalRoute location={e.location} match={e.match} />
                  </PrivateLayout>
                )}} 
              key={route.path}
            />
          ),
        )}
      </Switch>
    );
  }
}

PrivateRoutes.propTypes = {};

export default connect(state => ({
  isAuthenticated: state.staff.isAuthenticated,
}))(PrivateRoutes);
