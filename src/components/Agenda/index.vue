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
          <!-- TODO: handle search events -->
          <SearchBar placeholder="Cari agenda" />
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
        <AgendaTable
          :items="items"
          :loading="loading"
          :meta="meta"
          @update:pagination="onUpdatePagination($event)"
        />
      </div>
    </section>
  </main>
</template>

<script>
import AgendaTable from './AgendaTable.vue';
import LinkButton from '@/components/ui/LinkButton.vue';
import SearchBar from '@/components/ui/SearchBar.vue';

import { formatDate } from '@/lib/date-fns';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const agendaRepository = RepositoryFactory.get('agenda');

export default {
  name: 'Agenda',
  components: {
    AgendaTable,
    LinkButton,
    SearchBar,
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
      },

      loading: false,
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
          time: `${event.start_hour} - ${event.end_hour}`,
          status: this.getEventStatus(event.status),
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
        // silent error
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
      this.fetchEvents();
    },

    getEventStatus(status) {
      const statusMap = {
        publish: 'Dipublish',
        unpublish: 'Belum Dipublish',
        archive: 'Dibuang',
      };

      return statusMap[status] ?? status;
    },
  },
};
</script>
