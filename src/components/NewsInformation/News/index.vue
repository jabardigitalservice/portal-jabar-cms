<template>
  <main class="w-full pb-20">
    <section class="w-full border-2 border-green-600 bg-green-600 rounded-lg overflow-hidden">
      <!-- TODO: change tab data count with real data -->
      <NewsTabBar
        :tabs="tabs"
        :current-tab.sync="currentTab"
      />
      <section class="w-full bg-white py-6 px-3">
        <div class="w-full flex justify-between mb-5 items-center">
          <NewsMonthFilter @update-month-filter="onUpdateMonthFilter($event)" />
          <LinkButton
            href="berita-dan-informasi/tambah"
            title="Tambah Berita Baru"
            class="ml-auto"
          >
            <template #icon-left>
              <JdsIcon
                name="plus"
                size="14px"
                fill="#fff"
                class="h-[14px] w-[14px]"
              />
            </template>
            <p class="font-lato font-bold text-sm text-white leading-none">
              Tambah Berita Baru
            </p>
          </LinkButton>
        </div>
        <NewsTable
          :items="items"
          :loading="loading"
          :meta="meta"
          @update:pagination="onUpdatePagination($event)"
        />
      </section>
    </section>
  </main>
</template>

<script>
import NewsTabBar from '@/components/NewsInformation/News/NewsTabBar';
import NewsTable from '@/components/NewsInformation/News/NewsTable';
import NewsMonthFilter from '@/components/NewsInformation/News/NewsMonthFilter';
import LinkButton from '@/common/components/LinkButton';
import { formatDate } from '@/common/helpers/date';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const newsRepository = RepositoryFactory.get('news');

export default {
  name: 'NewsSection',
  components: {
    NewsTabBar,
    NewsTable,
    NewsMonthFilter,
    LinkButton,
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
        start_date: formatDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1), 'yyyy/MM/dd'), // first date of today's month
        end_date: formatDate(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0), 'yyyy/MM/dd'), // last date of today's month
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
          status: news.status,
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

    /**
     * Set new query params based on argument
     *
     * @param {object} data - object containing new params
     */
    setParams(data) {
      const newParams = { ...this.params, ...data };
      this.params = { ...newParams };
    },

    /**
     * Set new params when pagination changes
     * and fetch events again
     *
     * @param {object} data - object cotaining new param based on emit values
     * @property {string} page
     * @property {string} per_page
     */
    onUpdatePagination(data) {
      this.setParams(data);
      this.fetchNews();
    },

    /**
     * Set new params and reset pagination page to 1
     * when month filter changes
     *
     * @param {object} data - object cotaining new param based on emit values
     * @property {string} start_date
     * @property {string} end_date
     */
    onUpdateMonthFilter(data) {
      this.setParams({ ...data, page: 1 });
      this.fetchNews();
    },
  },
};
</script>
