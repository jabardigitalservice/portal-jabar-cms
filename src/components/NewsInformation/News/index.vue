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
import { NEWS_STATUS_MAP } from '@/common/constants';
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
          key: 'ALL',
          label: 'Semua Berita',
          icon: 'DocumentIcon',
          count: null,
        },
        {
          key: 'PUBLISHED',
          label: 'Diterbitkan',
          icon: 'PublishIcon',
          count: null,
        },
        {
          key: 'DRAFT',
          label: 'Tersimpan',
          icon: 'DraftIcon',
          count: null,
        },
        {
          key: 'REVIEW',
          label: 'Menunggu Review',
          icon: 'ReviewIcon',
          count: null,
        },
        {
          key: 'ARCHIVED',
          label: 'Diarsipkan',
          icon: 'ArchiveIcon',
          count: null,
        },
      ],
      currentTab: 'ALL',
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
          status: this.getNewsStatus(news.status),
        }));

        return items;
      }

      return [];
    },
  },
  mounted() {
    this.fetchNews();
    this.fetchStatusCounter();
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

    async fetchStatusCounter() {
      try {
        const response = await newsRepository.getStatusCounter();
        const { data } = response.data || [];

        const newTabs = [];

        this.tabs.forEach((tab) => {
          const object = data.find((item) => item.status === tab.key);
          newTabs.push({ ...tab, ...object });
        });

        // Get total news off all status
        const totalCount = data.map((item) => item.count).reduce((a, b) => a + b, 0);

        // Mutate the first index (object with the key of `ALL`) count property
        newTabs[0].count = totalCount;

        this.tabs = [...newTabs];
      } catch (error) {
        this.$toast({
          type: 'error',
          message: 'Gagal mendapatkan data Total Berita, silakan coba beberapa saat lagi',
        });
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

    getNewsStatus(status) {
      return NEWS_STATUS_MAP[status] ?? status;
    },
  },
};
</script>
