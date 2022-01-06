<template>
  <main class="w-full h-full">
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
        <AgendaTable
          :items="items"
          :loading="loading"
        />
      </div>
    </section>
  </main>
</template>

<script>
import AgendaTable from './AgendaTable.vue';

import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const agendaRepository = RepositoryFactory.get('agenda');

export default {
  name: 'Agenda',
  components: {
    AgendaTable,
  },
  data() {
    return {
      events: [],
      meta: {},
      params: {
        start_date: null,
        end_date: null,
        per_page: 10,
        page: 1,
      },
      pagination: {},
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
          date: event.date,
          time: `${event.start_hour} - ${event.end_hour}`,
          status: event.status,
        }));

        return items;
      }

      return [];
    },
  },
  async mounted() {
    this.fetchEvents();
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
  },
};
</script>
