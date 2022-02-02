<template>
  <main class="w-full">
    <section class="w-full border-2 border-green-600 bg-green-600 rounded-lg overflow-hidden">
      <!-- TODO: change tab data count with real data -->
      <NewsTabBar
        :tabs="tabs"
        :current-tab.sync="currentTab"
      />
      <!-- TODO: change component dynamically based on current tab -->
      <div class="w-full h-[500px] bg-white" />
    </section>
  </main>
</template>

<script>
import NewsTabBar from '@/components/NewsInformation/News/NewsTabBar';

export default {
  name: 'NewsSection',
  components: {
    NewsTabBar,
  },
  data() {
    return {
      tabs: [
        {
          key: 'all',
          label: 'Semua Berita',
          icon: 'DocumentIcon',
          count: 80,
        },
        {
          key: 'published',
          label: 'Diterbitkan',
          icon: 'PublishIcon',
          count: 20,
        },
        {
          key: 'draft',
          label: 'Tersimpan',
          icon: 'DraftIcon',
          count: 15,
        },
        {
          key: 'review',
          label: 'Menunggu Review',
          icon: 'ReviewIcon',
          count: 10,
        },
        {
          key: 'archive',
          label: 'Diarsipkan',
          icon: 'ArchiveIcon',
          count: 10,
        },
      ],
      currentTab: 'all',
    };
  },
};
</script>
