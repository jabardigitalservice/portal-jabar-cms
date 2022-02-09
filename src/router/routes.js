export default [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/pages/Home'),
  },
  {
    path: '/layanan',
    name: 'Layanan',
    component: () => import('@/pages/Home'),
  },
  {
    path: '/agenda',
    name: 'Agenda Jawa Barat',
    component: () => import('@/pages/Agenda'),
  },
  {
    path: '/agenda/detail/:id',
    name: 'Agenda Jawa Barat',
    component: () => import('@/pages/Agenda/AgendaDetail'),
  },
  {
    path: '/agenda/detail/:id/ubah',
    name: 'Ubah Agenda',
    component: () => import('@/pages/Agenda/CreateEditAgenda'),
    meta: {
      mode: 'edit',
    },
  },
  {
    path: '/agenda/tambah',
    name: 'Tambah Agenda Baru',
    component: () => import('@/pages/Agenda/CreateEditAgenda'),
    meta: {
      mode: 'create',
    },
  },
  {
    path: '/berita-dan-informasi',
    name: 'Berita dan Informasi',
    component: () => import('@/pages/News'),
  },
  {
    path: '/berita-dan-informasi/tambah',
    name: 'Buat Berita Baru',
    component: () => import('@/pages/News/CreateEditNews'),
    meta: {
      mode: 'create',
    },
  },
  {
    path: '/berita-dan-informasi/:id/pratinjau',
    name: 'Pratinjau Berita',
    component: () => import('@/pages/News/NewsPreview'),
    meta: {
      layout: 'AppLayoutPublic',
    },
  },
  {
    path: '/pengaturan',
    name: 'Pengaturan',
    component: () => import('@/pages/Home'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login'),
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
