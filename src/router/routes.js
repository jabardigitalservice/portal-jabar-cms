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
    name: 'Agenda Jawa Barat',
    component: () => import('@/pages/AgendaPage'),
  },
  {
    path: '/agenda/detail',
    name: 'Agenda Jawa Barat',
    component: () => import('@/pages/AgendaDetailPage'),
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
