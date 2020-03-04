import React from 'react';
import i18next from 'i18next';
import DashboardWrapper from './styles';
import PageTitle from '../../components/common/PageTitle/index';

export default function Dashboard() {
  return (
    <DashboardWrapper>
      <PageTitle>{i18next.t('dashboard.title')}</PageTitle>
    </DashboardWrapper>
  );
}
