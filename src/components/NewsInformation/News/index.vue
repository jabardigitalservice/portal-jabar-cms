<template>
  <main class="w-full pb-20">
    <section class="w-full border-2 border-green-600 bg-green-600 rounded-lg overflow-hidden">
      <!-- TODO: change tab data count with real data -->
      <NewsTabBar
        :tabs="tabs"
        :current-tab.sync="currentTab"
      />
      <section class="w-full bg-white py-6 px-3">
        <!-- TODO: Handle pagination change -->
        <NewsTable
          :items="items"
          :loading="loading"
          :meta="meta"
        />
      </section>
    </section>
  </main>
</template>

<script>
import NewsTabBar from '@/components/NewsInformation/News/NewsTabBar';
import NewsTable from '@/components/NewsInformation/News/NewsTable';
import { formatDate } from '@/common/helpers/date';
import { NEWS_STATUS_MAP } from '@/common/constants';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const newsRepository = RepositoryFactory.get('news');

export default {
  name: 'NewsSection',
  components: {
    NewsTabBar,
    NewsTable,
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
      loading: false,
      news: [],
      meta: {
        total_count: 0,
        total_page: 0,
        current_page: 1,
        per_page: 10,
      },
      params: {
        start_date: null,
        end_date: null,
        per_page: 10,
        page: 1,
      },
    };
  },
  computed: {
    items() {
      if (Array.isArray(this.news) && !!this.news.length) {
        const items = this.news.map((news) => ({
          id: news.id,
          title: news.title,
          category: news.category,
          author: news.author?.unit_name || '-',
          updated_at: formatDate(news.updated_at, 'dd/MM/yyyy'),
          status: this.getNewsStatus(news.status),
        }));

        return items;
      }

      return [];
    },
  },
  mounted() {
    this.fetchNews();
  },
  methods: {
    async fetchNews() {
      try {
        this.loading = true;

        const response = await newsRepository.getNews(this.params);
        const { data, meta } = response.data;

        this.news = data;
        this.meta = meta;
      } catch (error) {
        this.$toast({
          type: 'error',
          message: 'Gagal mendapatkan data Berita, silakan coba beberapa saat lagi',
        });
      } finally {
        this.loading = false;
      }
    },
    getNewsStatus(status) {
      return NEWS_STATUS_MAP[status] ?? status;
    },
  },
};
</script>
