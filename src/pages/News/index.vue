<template>
  <div class="h-full">
    <TabBar
      :tabs="tabs"
      :current-tab.sync="currentTab"
    />
    <keep-alive>
      <component :is="tab" />
    </keep-alive>
  </div>
</template>

<script>
import TabBar from '@/common/components/TabBar';

export default {
  name: 'News',
  components: {
    TabBar,
    Maintenance: () => import('@/common/components/Maintenance'),
    NewsSection: () => import('@/components/NewsInformation/News'),
  },
  data() {
    return {
      tabs: [
        { key: 'news', label: 'Berita' },
        { key: 'information', label: 'Informasi' },
        { key: 'video', label: 'Video' },
        { key: 'media', label: 'Media Galeri' },
      ],
      currentTab: 'news',
    };
  },
  computed: {
    tab() {
      switch (this.currentTab) {
        case 'news':
          return 'NewsSection';
        case 'information':
          return 'Maintenance';
        case 'video':
          return 'Maintenance';
        case 'media':
          return 'Maintenance';
        default:
          return 'Maintenance';
      }
    },
  },

};
</script>
