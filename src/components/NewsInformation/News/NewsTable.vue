<template>
  <div class="news-table rounded-lg overflow-hidden border border-gray-100">
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
      <template #item.title="{item}">
        <p
          class="line-clamp-1"
          :title="item.title"
        >
          {{ item.title }}
        </p>
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.category="{item}">
        <p class="capitalize">
          {{ item.category }}
        </p>
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.author="{item}">
        <p
          class="line-clamp-1"
          :title="item.author"
        >
          {{ item.author }}
        </p>
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.status="{item}">
        <p class="capitalize">
          {{ getNewsStatus(item.status) }}
        </p>
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.action="{item}">
        <NewsTableAction
          :item="item"
          @publish="$emit('publish', $event)"
          @archive="$emit('archive', $event)"
          @delete="$emit('delete', $event)"
        />
      </template>
    </JdsDataTable>
  </div>
</template>

<script>
import NewsTableAction from '@/components/NewsInformation/News/NewsTableAction.vue';
import { NEWS_TABLE_HEADER, NEWS_STATUS_MAP } from '@/common/constants';

export default {
  name: 'NewsTable',
  components: {
    NewsTableAction,
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
      tableHeader: NEWS_TABLE_HEADER,
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

    getNewsStatus(status) {
      return NEWS_STATUS_MAP[status] ?? status;
    },

    onSortChange(sort) {
      this.$emit('change:sort', {
        sort_by: Object.keys(sort)[0],
        sort_order: Object.values(sort)[0].toUpperCase(),
      });
    },
  },
};
</script>

<style>
/**
 * Override default jds-data-table style
 */
.news-table .jds-data-table {
  table-layout: fixed !important;
}

.news-table .jds-data-table thead tr th:nth-child(1) {
  width: 300px !important;
}

.news-table .jds-data-table thead tr th:nth-child(3) {
  width: 200px !important;
}

.news-table .jds-data-table thead tr th:nth-child(4) {
  width: 200px !important;
}
</style>
