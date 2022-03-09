<template>
  <main class="w-full pb-20">
    <section class="px-6 py-4 rounded-lg bg-white mb-4">
      <h1 class="font-roboto font-medium text-[21px] leading-[34px] text-green-700 mb-3">
        Daftar Semua Agenda
      </h1>
      <!-- TODO: Change this description text -->
      <p class="font-lato text-sm leading-6 text-blue-gray-800">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hendrerit euismod non, semper eu interdum habitasse velit. Eu fermentum fames id.
      </p>
    </section>

    <section class="px-3 py-6 rounded-lg bg-white border-2 border-green-600">
      <div class="w-full">
        <!-- Table Menu -->
        <div class="flex mb-4">
          <SearchBar
            placeholder="Cari agenda"
            @input="onSearch($event)"
          />
          <AgendaFilter
            class="ml-6"
            @change:filter="onChangeFilter($event)"
          />
          <LinkButton
            href="agenda/tambah"
            title="Tambah Agenda"
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
              Tambah Agenda
            </p>
          </LinkButton>
        </div>
        <!-- Table Aditional Info -->
        <div class="w-full mb-4">
          <p class="font-lato text-sm text-blue-gray-800 leading-6">
            Tampilkan agenda dalam bentuk :
          </p>
        </div>
        <div class="w-full overflow-auto">
          <AgendaTable
            :items="items"
            :loading="loading"
            :meta="meta"
            class="min-w-[1000px]"
            @update:pagination="onUpdatePagination($event)"
            @open-preview="handleShowPreview($event)"
            @delete="handleDeleteAction($event)"
            @change:sort="onChangeSort($event)"
          />
        </div>
      </div>
    </section>
    <AgendaPreview
      :open="isPreviewModalOpen"
      :event="eventDetail"
      @close="togglePreviewModal"
    />

    <!-- Delete Action Prompt -->
    <BaseModal
      :open="isDeletePromptOpen"
      @close="toggleDeletePrompt"
    >
      <div class="w-full h-full">
        <h1 class="font-roboto text-xl leading-8 font-medium text-green-700 mb-6">
          Hapus Agenda
        </h1>
        <p class="font-lato text-sm text-gray-800 mb-2">
          Apakah Anda yakin akan menghapus agenda ini?
        </p>
        <h2 class="font-lato text-md font-bold text-gray-800">
          {{ eventDetail.title }}
        </h2>
      </div>
      <template #footer>
        <div class="flex gap-4 justify-end">
          <BaseButton
            class="border-green-700 hover:bg-green-50 text-sm text-green-700"
            @click="closeDeletePrompt"
          >
            Batal
          </BaseButton>
          <BaseButton
            class="bg-red-500 hover:bg-red-400 text-sm text-white"
            :disabled="deleteLoading"
            @click="deleteEvent(eventDetail.id)"
          >
            <p v-if="!deleteLoading">
              Ya, saya yakin
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
import AgendaTable from '@/components/Agenda/AgendaTable.vue';
import AgendaPreview from '@/components/Agenda/AgendaPreview.vue';
import AgendaFilter from '@/components/Agenda/AgendaFilter.vue';
import LinkButton from '@/common/components/LinkButton';
import SearchBar from '@/common/components/SearchBar';
import BaseModal from '@/common/components/BaseModal';
import BaseButton from '@/common/components/BaseButton';

import { AGENDA_STATUS_MAP } from '@/common/constants';
import { formatDate } from '@/common/helpers/date';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const agendaRepository = RepositoryFactory.get('agenda');

export default {
  name: 'Agenda',
  components: {
    AgendaTable,
    AgendaPreview,
    AgendaFilter,
    LinkButton,
    SearchBar,
    BaseButton,
    BaseModal,
  },
  data() {
    return {
      events: [],
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
        sort_by: null,
        sort_order: null,
        q: null,
      },
      isPreviewModalOpen: false,
      isDeletePromptOpen: false,
      eventDetail: {},
      loading: false,
      deleteLoading: false,
    };
  },
  computed: {
    items() {
      if (Array.isArray(this.events) && !!this.events.length) {
        const items = this.events.map((event) => ({
          id: event.id,
          title: event.title,
          category: event.category,
          date: formatDate(event.date, 'dd/MM/yyyy'),
          time: `${event.start_hour.substring(0, 5)} - ${event.end_hour.substring(0, 5)}`,
          status: this.getEventStatus(event.status),
          type: event.type,
        }));

        return items;
      }

      return [];
    },
  },
  async mounted() {
    await this.fetchEvents();
  },
  methods: {
    async fetchEvents() {
      try {
        this.loading = true;

        const response = await agendaRepository.getEvents(this.params);
        const { data, meta } = response.data;

        this.events = data;
        this.meta = meta;
      } catch (error) {
        this.$toast({
          type: 'error',
          message: 'Gagal mendapatkan data Agenda, silakan coba beberapa saat lagi',
        });
      } finally {
        this.loading = false;
      }
    },

    /**
     * Delete event by id
     * @param {number} id - id of event to delete
     */
    async deleteEvent(id) {
      try {
        this.deleteLoading = true;
        await agendaRepository.deleteEvent(id);
        this.$toast({
          type: 'success',
          message: 'Data agenda telah berhasil dihapus',
        });
      } catch (error) {
        this.$toast({
          type: 'error',
          message: 'Data agenda gagal dihapus',
        });
      } finally {
        this.deleteLoading = false;
        this.closeDeletePrompt();
        this.fetchEvents();
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
     * Set new params when search input changes
     * and fetch events again
     *
     * @param {string} query - search query
     */
    onSearch(query) {
      this.setParams({ q: query });
      this.fetchEvents();
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
      this.fetchEvents();
    },

    /**
     * Set new params when filter changes
     * and fetch events again
     *
     * @param {object} data - object cotaining new param based on emit values
     * @property {string} start_date
     * @property {string} end_date
     * @property {Array} cat
     * @property {Array} type
     */
    onChangeFilter(data) {
      this.setParams(data);
      this.fetchEvents();
    },

    onChangeSort(data) {
      // destructure and give alias to prevent eslint error
      const { sort_by: sortBy, sort_order: sortOrder } = data;

      if (sortOrder === 'NO-SORT') {
        this.setParams({
          sort_by: null,
          sort_order: null,
        });
      } else if (sortBy === 'time') {
        this.setParams({
          sort_by: 'start_hour',
          sort_order: sortOrder,
        });
      } else {
        this.setParams(data);
      }

      this.fetchEvents();
    },

    getEventStatus(status) {
      return AGENDA_STATUS_MAP[status] ?? status;
    },

    /**
     * Filter events data by id
     * @param {number} id - id of specific event to filter
     * @returns {Object}
     */
    filterEventsById(id) {
      const eventDetail = this.events.filter((event) => event.id === id)[0];
      return eventDetail;
    },

    /**
     * Set eventDetail data property
     * @param {Object} event - event detail
     */
    setEventDetail(event) {
      this.eventDetail = { ...event };
    },

    clearEventDetail() {
      this.eventDetail = {};
    },

    /**
     * Handle data filtering and data mutation
     * when preview button clicked
     * @param {number} id - id of specific event
     */
    handleShowPreview(id) {
      const event = this.filterEventsById(id);
      this.setEventDetail(event);
      this.togglePreviewModal();
    },

    /**
     * Handle delete event when delete button clicked
     * @param {number} id - id of specific event
     */
    handleDeleteAction(id) {
      const event = this.filterEventsById(id);
      this.setEventDetail(event);
      this.toggleDeletePrompt();
    },

    togglePreviewModal() {
      this.isPreviewModalOpen = !this.isPreviewModalOpen;
    },

    toggleDeletePrompt() {
      this.isDeletePromptOpen = !this.isDeletePromptOpen;
    },

    closeDeletePrompt() {
      this.clearEventDetail();
      this.toggleDeletePrompt();
    },
  },
};
</script>
