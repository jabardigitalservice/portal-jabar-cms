export default [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/pages/HomePage'),
  },
  {
    path: '/layanan',
    name: 'Layanan',
    component: () => import('@/pages/HomePage'),
  },
  {
    path: '/agenda',
    name: 'Agenda',
    component: () => import('@/pages/HomePage'),
  },
  {
    path: '/berita-dan-informasi',
    name: 'Berita dan Informasi',
    component: () => import('@/pages/HomePage'),
  },
  {
    path: '/pengaturan',
    name: 'Pengaturan',
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
