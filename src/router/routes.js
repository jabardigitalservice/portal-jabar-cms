export default [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/pages/HomePage'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/LoginPage'),
    meta: {
      public: true,
      layout: 'AppLayoutPublic',
    },
  },
  {
    path: '*',
    redirect: '/',
  },
];
