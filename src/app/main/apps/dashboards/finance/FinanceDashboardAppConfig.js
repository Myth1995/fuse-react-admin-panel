import { lazy } from 'react';

const FinanceDashboardAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/apps/dashboards/finance',
      component: lazy(() => import('./FinanceDashboardApp')),
    },
  ],
};

export default FinanceDashboardAppConfig;
