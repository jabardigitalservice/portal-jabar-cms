<template>
  <div class="rounded-lg overflow-hidden border border-gray-100">
    <JdsDataTable
      :headers="tableHeader"
      :items="items"
      :loading="loading"
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
  props: {
    items: {
      type: Array,
      require: false,
      default: () => [],
    },
    loading: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  data() {
    return {
      tableHeader: AGENDA_TABLE_HEADER,
    };
  },
};
</script>
