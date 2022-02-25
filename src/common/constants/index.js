export const NAVIGATION_MENU = [
  {
    link: '/',
    label: 'Dashboard',
    icon: 'DashboardIcon',
  },
  {
    link: '/layanan',
    label: 'Layanan',
    icon: 'ServiceIcon',
    arrow: true,
  },
  {
    link: '/agenda',
    label: 'Agenda',
    icon: 'AgendaIcon',
  },
  {
    link: '/berita-dan-informasi',
    label: 'Berita dan Informasi',
    icon: 'NewsIcon',
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
    key: 'type',
    text: 'Tipe Agenda',
    sortable: true,
  },
  {
    key: 'action',
    text: 'Aksi',
  },
];

export const AGENDA_CATEGORIES = [
  {
    label: 'Gubernur',
    value: 'Gubernur',
  },
  {
    label: 'Wakil Gubernur',
    value: 'Wakil Gubernur',
  },
  {
    label: 'Bu Atalia',
    value: 'Bu Atalia',
  },
  {
    label: 'Sekretaris Daerah',
    value: 'Sekretaris Daerah',
  },
  {
    label: 'OPD',
    value: 'OPD',
  },
];

export const AGENDA_STATUS_MAP = {
  publish: 'Telah Dipublish',
  unpublish: 'Belum Dipublish',
  archive: 'Dibuang',
};

export const NEWS_CATEGORIES = [
  {
    value: 'ekonomi',
    label: 'Ekonomi',
  },
  {
    value: 'kesehatan',
    label: 'Kesehatan',
  },
  {
    value: 'pendidikan',
    label: 'Pendidikan',
  },
  {
    value: 'pemerintahan',
    label: 'Pemerintahan',
  },
  {
    value: 'infrastruktur',
    label: 'Infrastruktur',
  },
  {
    value: 'sosial',
    label: 'Sosial',
  },
  {
    value: 'teknologi',
    label: 'Teknologi',
  },
];

export const NEWS_DURATION = [
  {
    label: '5 Hari',
    value: 5,
  },
  {
    label: '1 Minggu',
    value: 7,
  },
  {
    label: '2 Minggu',
    value: 14,
  },
  {
    label: 'Tanpa Batas',
    value: -1,
  },
];

export const NEWS_TABLE_HEADER = [
  {
    key: 'title',
    text: 'Judul Berita',
    sortable: true,
  },
  {
    key: 'category',
    text: 'Kategori',
    sortable: true,
  },
  {
    key: 'author',
    text: 'Penulis',
    sortable: true,
  },
  {
    key: 'updated_at',
    text: 'Terakhir Diupdate',
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

export const NEWS_STATUS_MAP = {
  PUBLISHED: 'Diterbitkan',
  DRAFT: 'Tersimpan',
  ARCHIVED: 'Diarsipkan',
  REVIEW: 'Menunggu Review',
};
