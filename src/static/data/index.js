/* eslint-disable import/prefer-default-export */

export const NAVIGATION_MENU = [
  {
    link: '/',
    label: 'Dashboard',
    icon: 'dashboard',
  },
  {
    link: '/layanan',
    label: 'Layanan',
    icon: 'layanan',
    arrow: true,
  },
  {
    link: '/agenda',
    label: 'Agenda',
    icon: 'agenda',
  },
  {
    link: '/berita-dan-informasi',
    label: 'Berita dan Informasi',
    icon: 'berita',
    arrow: true,
  },
];

export const AGENDA_TABLE_HEADER = [
  {
    key: 'title',
    text: 'Judul Agenda/Event',
    sortable: true,
  },
  {
    key: 'category',
    text: 'Ketegori',
    sortable: true,
  },
  {
    key: 'date',
    text: 'Tanggal',
    sortable: true,
  },
  {
    key: 'time',
    text: 'Waktu',
    sortable: true,
  },
  {
    key: 'status',
    text: 'Status',
    sortable: true,
  },
  {
    key: 'action',
    text: 'Aksi',
  },
];
