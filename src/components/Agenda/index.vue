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
        <AgendaTable />
      </div>
    </section>
  </main>
</template>

<script>
import AgendaTable from './AgendaTable.vue';

export default {
  name: 'Agenda',
  components: {
    AgendaTable,
  },
};
</script>
