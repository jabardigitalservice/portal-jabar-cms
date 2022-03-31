<template>
  <div class="member-table rounded-lg overflow-hidden border border-gray-100">
    <JdsDataTable
      :headers="tableHeader"
      :items="items"
      :loading="loading"
      :pagination="pagination"
      empty-text="Data tidak tersedia"
      @next-page="onPaginationChange('next-page', $event)"
      @previous-page="onPaginationChange('previous-page', $event)"
      @per-page-change="onPaginationChange('per-page-change', $event)"
      @page-change="onPaginationChange('page-change', $event)"
      @change:sort="onSortChange($event)"
    >
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.name="{item}">
        <div
          class="capitalize line-clamp-1"
          :title="item.name"
        >
          {{ item.name }}
        </div>
      </template>

      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.email="{item}">
        <div
          class="line-clamp-1"
          :title="item.email"
        >
          {{ item.email }}
        </div>
      </template>

      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.role="{item}">
        <div
          class="line-clamp-1"
          :title="item.role.name"
        >
          {{ item.role.name }}
        </div>
      </template>

      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.status="{item}">
        <div
          class="line-clamp-1"
          :title="item.status"
        >
          {{ getStatusLabel(item.status) }}
        </div>
      </template>

      <!-- TODO: handle action button click -->
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.action="{item}">
        <MemberTableAction
          :item="item"
        />
      </template>
    </JdsDataTable>
  </div>
</template>

<script>
import MemberTableAction from '@/components/Settings/Member/ListSection/MemberTableAction';
import { MEMBER_TABLE_HEADER } from '@/common/constants';

export default {
  name: 'MemberTable',
  components: {
    MemberTableAction,
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
    meta: {
      type: Object,
      require: false,
      default: () => ({}),
    },
  },
  data() {
    return {
      tableHeader: MEMBER_TABLE_HEADER,
      pagination: {
        currentPage: 1,
        itemsPerPage: 10,
        totalRows: 0,
        itemsPerPageOptions: [10, 20, 30, 40, 50],
      },
    };
  },
  watch: {
    meta: {
      handler() {
        this.pagination = {
          ...this.pagination,
          currentPage: this.meta?.current_page || 1,
          itemsPerPage: this.meta?.per_page || 10,
          totalRows: this.meta?.total_count || 0,
        };
      },
      immediate: true,
    },
  },
  methods: {
    onPaginationChange(action, value) {
      const paginationObj = { ...this.pagination };

      switch (action) {
        case 'next-page':
        case 'previous-page':
        case 'page-change':
          paginationObj.currentPage = value;
          break;

        case 'per-page-change':
          paginationObj.itemsPerPage = value;
          break;

        default:
          break;
      }

      this.pagination = { ...paginationObj };

      /**
       *  NOTE:
       *  `jds-pagination` emits `per-page-change` and `page-change` events
       *  whenever user changes per page value.
       *
       *  To avoid double fetch, we immediately stop this function on
       *  `per-page-change` event and let `page-change` event to
       *  fetch data from API
       */

      if (action === 'per-page-change') {
        return;
      }

      this.$emit('update:pagination', {
        page: this.pagination.currentPage,
        per_page: this.pagination.itemsPerPage,
      });
    },

    onSortChange(sort) {
      this.$emit('change:sort', {
        sort_by: Object.keys(sort)[0],
        sort_order: Object.values(sort)[0].toUpperCase(),
      });
    },

    getStatusLabel(status) {
      const statusMap = {
        active: 'Aktif',
        'non-active': 'Tidak Aktif',
        'waiting confirmation': 'Menunggu Konfirmasi',
      };

      return statusMap[status] ?? null;
    },
  },
};
</script>

<style>
/**
 * Override default jds-data-table style
 */
.member-table .jds-data-table {
  table-layout: fixed !important;
}

.member-table .jds-data-table thead tr th:nth-child(1) {
  width: 220px !important;
}

.member-table .jds-data-table thead tr th:nth-child(2) {
  width: 220px !important;
}
</style>
