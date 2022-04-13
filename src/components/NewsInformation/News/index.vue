<template>
  <main class="w-full pb-20">
    <section class="w-full border-2 border-green-600 bg-green-600 rounded-lg overflow-hidden">
      <NewsTabBar
        :tabs="tabs"
        :current-tab.sync="currentTab"
        @update:currentTab="filterNewsByStatus"
      />
      <section class="w-full bg-white py-6 px-3">
        <div class="w-full flex justify-between mb-5 items-center">
          <NewsMonthFilter @update-month-filter="onUpdateMonthFilter($event)" />
          <LinkButton
            href="berita-dan-artikel/tambah"
            title="Tambah Berita"
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
              Tambah Berita
            </p>
          </LinkButton>
        </div>
        <div class="min-w-0 w-full flex mb-5 items-center">
          <SearchBar
            placeholder="Cari berita"
            @input="onSearch($event)"
          />
          <NewsCategoryFilter
            class="ml-6"
            @change:filter="onFilter($event)"
          />
        </div>
        <div class="w-full overflow-auto">
          <NewsTable
            :items="items"
            :loading="loading"
            :meta="meta"
            class="min-w-[1000px]"
            @update:pagination="onUpdatePagination($event)"
            @publish="setupPromptDetail('publish', $event)"
            @archive="setupPromptDetail('archive', $event)"
            @delete="setupPromptDetail('delete', $event)"
            @change:sort="onChangeSort($event)"
          />
        </div>
      </section>
    </section>

    <!-- Action Prompt -->
    <BaseModal
      :open="isActionPromptOpen"
      @close="toggleActionPrompt"
    >
      <div class="w-full h-full">
        <h1 class="font-roboto text-xl leading-8 font-medium text-green-700 mb-6">
          {{ promptDetail.title }}
        </h1>
        <p class="font-lato text-sm text-gray-800 mb-2">
          {{ promptDetail.subtitle }}
        </p>
        <h2 class="font-lato text-md font-bold text-gray-800">
          {{ promptDetail.newsTitle }}
        </h2>
      </div>
      <template #footer>
        <div class="flex gap-4 justify-end">
          <BaseButton
            class="border-green-700 hover:bg-green-50 text-sm text-green-700"
            @click="toggleActionPrompt"
          >
            Batal
          </BaseButton>
          <BaseButton
            class="bg-green-700 hover:bg-green-600 text-sm text-white"
            :class="{'bg-red-500 hover:bg-red-400': promptDetail.action === 'delete'}"
            :disabled="promptDetail.loading"
            @click="promptDetail.buttonClick"
          >
            <p v-if="!promptDetail.loading">
              {{ promptDetail.buttonLabel }}
            </p>
            <p
              v-else
              class="flex gap-2 items-center text-gray-500"
            >
              <JdsSpinner
                size="16"
                foreground="#757575"
              />
              Loading...
            </p>
          </BaseButton>
        </div>
      </template>
    </BaseModal>
  </main>
</template>

<script>
import NewsTabBar from '@/components/NewsInformation/News/NewsTabBar';
import NewsTable from '@/components/NewsInformation/News/NewsTable';
import NewsMonthFilter from '@/components/NewsInformation/News/NewsMonthFilter';
import NewsCategoryFilter from '@/components/NewsInformation/News/NewsCategoryFilter';
import LinkButton from '@/common/components/LinkButton';
import BaseButton from '@/common/components/BaseButton';
import BaseModal from '@/common/components/BaseModal';
import SearchBar from '@/common/components/SearchBar';
import { formatDate } from '@/common/helpers/date';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const newsRepository = RepositoryFactory.get('news');

export default {
  name: 'NewsSection',
  components: {
    NewsTabBar,
    NewsTable,
    NewsMonthFilter,
    NewsCategoryFilter,
    LinkButton,
    BaseButton,
    BaseModal,
    SearchBar,
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
          key: 'PUBLISHED',
          label: 'Diterbitkan',
          icon: 'PublishIcon',
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
        start_date: formatDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1), 'yyyy-MM-dd'), // first date of today's month
        end_date: formatDate(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0), 'yyyy-MM-dd'), // last date of today's month
        per_page: 10,
        page: 1,
        sort_by: '',
        sort_order: '',
        status: '',
        cat: [],
        q: '',
      },
      isActionPromptOpen: false,
      promptDetail: {},
    };
  },
  computed: {
    items() {
      if (Array.isArray(this.news) && !!this.news.length) {
        const items = this.news.map((news) => ({
          id: news.id,
          title: news.title,
          category: news.category,
          created_by: news.created_by?.name || '-',
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
        const { data = [] } = response.data || {};

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

    async publishNews(id) {
      try {
        this.promptDetail.loading = true;

        await newsRepository.updateNewsStatus(id, { status: 'PUBLISHED' });

        this.$toast({ type: 'success', message: 'Berita telah berhasil diterbitkan' });
      } catch (error) {
        this.$toast({ type: 'error', message: 'Mohon maaf, gagal menerbitkan berita!' });
      } finally {
        this.closeActionPrompt();
        this.fetchNews();
        this.fetchStatusCounter();
      }
    },

    async archiveNews(id) {
      try {
        this.promptDetail.loading = true;

        await newsRepository.updateNewsStatus(id, { status: 'ARCHIVED' });

        this.$toast({ type: 'success', message: 'Berita telah berhasil diarsipkan' });
      } catch (error) {
        this.$toast({ type: 'error', message: 'Mohon maaf, gagal mengarsipkan berita!' });
      } finally {
        this.closeActionPrompt();
        this.fetchNews();
        this.fetchStatusCounter();
      }
    },

    async deleteNews(id) {
      try {
        this.promptDetail.loading = true;

        await newsRepository.deleteNews(id);

        this.$toast({ type: 'success', message: 'Berita telah berhasil dihapus' });
      } catch (error) {
        this.$toast({ type: 'error', message: 'Mohon maaf, gagal menghapus berita!' });
      } finally {
        this.closeActionPrompt();
        this.fetchNews();
        this.fetchStatusCounter();
      }
    },

    filterNewsByStatus(status) {
      if (status === 'ALL') {
        this.setParams({ status: null });
      } else {
        this.setParams({ status });
      }

      this.fetchNews();
    },

    filterNewsById(id) {
      if (Array.isArray(this.news) && this.news.length) {
        return this.news.find((item) => item.id === id);
      }

      return {};
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

    /**
     * Set new params and fetch news when filter changes
     *
     * @param {Object} data - object containing new param based on emit values
     * @property {Array} cat - news category params
     */
    onFilter(data) {
      this.setParams(data);
      this.fetchNews();
    },

    /**
     * Set new params and fetch news when search-bar value changes
     *
     * @param {string} query - search-bar emit values
     */
    onSearch(query) {
      this.setParams({ q: query });
      this.fetchNews();
    },

    /**
     * Sort item based on table column
     *
     * @param {Object} data - object containing sort params
     * @property {string} sort_by - the column name
     * @property {string} sort_order - sort order containing `ASC`, `DESC` or ``NO-SORT
     */
    onChangeSort(data) {
      const sortOrder = data.sort_order;

      if (sortOrder === 'NO-SORT') {
        this.setParams({
          sort_by: '',
          sort_order: '',
        });
      } else {
        this.setParams(data);
      }

      this.fetchNews();
    },

    /**
     * Setup prompt detail based on action
     *
     * @param {string} action - type of action
     * @param id - news id
     */
    setupPromptDetail(action, id) {
      const news = this.filterNewsById(id);

      if (action === 'publish') {
        this.promptDetail = {
          action: 'publish',
          title: 'Terbitkan Berita',
          subtitle: 'Apakah Anda yakin akan menerbitkan berita ini?',
          buttonLabel: 'Ya, terbitkan berita',
          buttonClick: () => this.publishNews(news.id),
          newsTitle: news.title,
          newsId: news.id,
          loading: false,
        };
      }

      if (action === 'archive') {
        this.promptDetail = {
          action: 'archive',
          title: 'Arsipkan Berita',
          subtitle: 'Apakah Anda yakin akan mengarsipkan berita ini?',
          buttonLabel: 'Ya, arsipkan berita',
          buttonClick: () => this.archiveNews(news.id),
          newsTitle: news.title,
          newsId: news.id,
          loading: false,
        };
      }

      if (action === 'delete') {
        this.promptDetail = {
          action: 'delete',
          title: 'Hapus Berita',
          subtitle: 'Apakah Anda yakin akan menghapus berita ini?',
          buttonLabel: 'Ya, saya yakin',
          buttonClick: () => this.deleteNews(news.id),
          newsTitle: news.title,
          newsId: news.id,
          loading: false,
        };
      }

      this.isActionPromptOpen = true;
    },

    resetPromptDetail() {
      this.promptDetail = {};
    },

    closeActionPrompt() {
      this.resetPromptDetail();
      this.toggleActionPrompt();
    },

    toggleActionPrompt() {
      this.isActionPromptOpen = !this.isActionPromptOpen;
    },
  },
};
</script>
