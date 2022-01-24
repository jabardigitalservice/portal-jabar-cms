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
    path: '/agenda/detail/:id',
    name: 'Agenda Jawa Barat',
    component: () => import('@/pages/AgendaPage/AgendaDetailPage'),
  },
  {
    path: '/agenda/detail/:id/ubah',
    name: 'Ubah Agenda',
    component: () => import('@/pages/AgendaPage/EditAgendaPage'),
  },
  {
    path: '/agenda/tambah',
    name: 'Tambah Agenda Baru',
    component: () => import('@/pages/AgendaPage/CreateAgendaPage'),
  },
  {
    path: '/berita-dan-informasi',
    name: 'Berita dan Informasi',
    component: () => import('@/pages/NewsPage'),
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
