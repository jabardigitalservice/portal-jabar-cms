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
          icon: 'document',
          count: 80,
        },
        {
          key: 'published',
          label: 'Diterbitkan',
          icon: 'publish',
          count: 20,
        },
        {
          key: 'draft',
          label: 'Tersimpan',
          icon: 'draft',
          count: 15,
        },
        {
          key: 'review',
          label: 'Menunggu Review',
          icon: 'review',
          count: 10,
        },
        {
          key: 'archive',
          label: 'Diarsipkan',
          icon: 'archive',
          count: 10,
        },
      ],
      currentTab: 'all',
    };
  },
};
</script>
