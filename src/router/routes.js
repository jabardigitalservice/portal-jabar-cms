export default [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/pages/Home'),
    meta: {
      layout: 'AppLayoutPrivate',
    },
  },
  {
    path: '/layanan',
    name: 'Layanan',
    component: () => import('@/pages/Home'),
    meta: {
      layout: 'AppLayoutPrivate',
    },
  },
  {
    path: '/agenda',
    name: 'Agenda Jawa Barat',
    component: () => import('@/pages/Agenda'),
    meta: {
      layout: 'AppLayoutPrivate',
    },
  },
  {
    path: '/agenda/detail/:id',
    name: 'Agenda Jawa Barat',
    component: () => import('@/pages/Agenda/AgendaDetail'),
    meta: {
      layout: 'AppLayoutPrivate',
    },
  },
  {
    path: '/agenda/detail/:id/ubah',
    name: 'Ubah Agenda',
    component: () => import('@/pages/Agenda/CreateEditAgenda'),
    meta: {
      mode: 'edit',
      layout: 'AppLayoutPrivate',
    },
  },
  {
    path: '/agenda/tambah',
    name: 'Tambah Agenda Baru',
    component: () => import('@/pages/Agenda/CreateEditAgenda'),
    meta: {
      mode: 'create',
      layout: 'AppLayoutPrivate',
    },
  },
  {
    path: '/berita-dan-informasi',
    name: 'Berita dan Informasi',
    component: () => import('@/pages/News'),
    meta: {
      layout: 'AppLayoutPrivate',
    },
  },
  {
    path: '/berita-dan-informasi/:id/ubah',
    name: 'Ubah Berita',
    component: () => import('@/pages/News/CreateEditNews'),
    meta: {
      mode: 'edit',
      layout: 'AppLayoutPrivate',
    },
  },
  {
    path: '/berita-dan-informasi/tambah',
    name: 'Buat Berita Baru',
    component: () => import('@/pages/News/CreateEditNews'),
    meta: {
      mode: 'create',
      layout: 'AppLayoutPrivate',
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
    component: () => import('@/pages/Settings'),
    meta: {
      layout: 'AppLayoutPrivate',
    },
  },
  {
    path: '/pengaturan/member/detail/:id',
    name: 'Pengaturan - Akun',
    component: () => import('@/pages/Settings/MemberDetail'),
    meta: {
      layout: 'AppLayoutPrivate',
    },
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
