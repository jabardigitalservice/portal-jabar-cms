<template>
  <JdsPopover
    class="news-table__action-button"
    :value="isDropdownOpen"
    :options="popoverOptions"
  >
    <template #activator>
      <button
        v-on-clickaway="closeDropdown"
        class="py-[6px] px-4 rounded-lg border border-green-700 flex items-center font-lato
        font-bold text-sm leading-5 text-green-700 hover:bg-green-50"
        @click="toggleDropdown"
      >
        Aksi
        <JdsIcon
          name="chevron-down"
          size="14px"
          fill="#069550"
          class="ml-[10px] transition-all ease-in duration-200"
          :class="isDropdownOpen ? '-rotate-180' : null"
        />
      </button>
    </template>

    <div class="bg-white p-[18px] rounded-lg border border-gray-200 shadow-xl">
      <ul class="flex flex-col gap-4">
        <li v-if="shouldShowAction('preview')">
          <a
            class="font-lato text-sm leading-4 text-gray-800"
            :href="`berita-dan-informasi/${item.id}/pratinjau`"
            target="_blank"
            rel="noopener"
          >
            Pratinjau
          </a>
        </li>
        <!-- Publish Action-->
        <li v-if="shouldShowAction('publish') && $hasPermission('news.publish')">
          <button
            class="font-lato text-sm leading-4 text-gray-800"
            @click="$emit('publish', item.id)"
          >
            Terbitkan
          </button>
        </li>
        <!-- Edit Action -->
        <li v-if="shouldShowAction('edit')">
          <router-link
            :to="`berita-dan-informasi/${item.id}/ubah`"
            class="font-lato text-sm leading-4 text-gray-800"
          >
            Ubah
          </router-link>
        </li>
        <!-- Archive Action -->
        <li v-if="shouldShowAction('archive') && $hasPermission('news.archive')">
          <button
            class="font-lato text-sm leading-4 text-gray-800"
            @click="$emit('archive', item.id)"
          >
            Arsipkan
          </button>
        </li>
        <!-- Delete Action -->
        <li v-if="shouldShowAction('delete')">
          <button
            class="font-lato text-sm leading-4 text-gray-800"
            @click="$emit('delete', item.id)"
          >
            Hapus
          </button>
        </li>
      </ul>
    </div>
  </JdsPopover>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';

export default {
  directives: {
    onClickaway,
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isDropdownOpen: false,
      popoverOptions: {
        modifiers: [
          {
            name: 'offset',
            options: { offset: [-8, 8] },
          },
        ],
      },
      // Map allowed actions based on news status
      allowedActions: Object.freeze({
        PUBLISHED: ['preview', 'archive'],
        DRAFT: ['preview', 'edit', 'delete'],
        REVIEW: ['preview', 'publish', 'edit'],
        ARCHIVED: ['preview'],
      }),
    };
  },
  computed: {
    shouldShowAction() {
      return (action) => {
        const { status } = this.item;

        if (!status) {
          return false;
        }

        return this.allowedActions[status].includes(action);
      };
    },
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    closeDropdown() {
      this.isDropdownOpen = false;
    },
  },
};
</script>

<style>
/** Override default jds popover content styling */
.news-table__action-button .jds-popover__content {
  z-index: 20 !important;
}
</style>
