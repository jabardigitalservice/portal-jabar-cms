<template>
  <div class="rounded-lg overflow-hidden border border-gray-100">
    <JdsDataTable
      :headers="tableHeader"
      :items="items"
    >
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.action="{item}">
        <AgendaTableAction :item="item" />
      </template>
    </JdsDataTable>
  </div>
</template>

<script>
import AgendaTableAction from '@/components/Agenda/AgendaTableAction.vue';
import { AGENDA_TABLE_HEADER } from '@/static/data';

export default {
  name: 'AgendaTable',
  components: {
    AgendaTableAction,
  },
  data() {
    return {
      tableHeader: AGENDA_TABLE_HEADER,
      // TODO: Remoe this dummy data with real data
      items: [
        {
          id: '1',
          title: 'lorem ipsum 1',
          category: 'Agenda OPD',
          date: '12/01/2022',
          time: '08:00 - 12:00',
          status: 'Dipublish',
        },
        {
          id: '2',
          title: 'lorem ipsum 2',
          category: 'Agenda OPD',
          date: '12/01/2022',
          time: '08:00 - 12:00',
          status: 'Dipublish',
        },
        {
          id: '3',
          title: 'lorem ipsum 3',
          category: 'Agenda OPD',
          date: '12/01/2022',
          time: '08:00 - 12:00',
          status: 'Dipublish',
        },
        {
          id: '4',
          title: 'lorem ipsum 4',
          category: 'Agenda OPD',
          date: '12/01/2022',
          time: '08:00 - 12:00',
          status: 'Dipublish',
        },
      ],
    };
  },
};
</script>
