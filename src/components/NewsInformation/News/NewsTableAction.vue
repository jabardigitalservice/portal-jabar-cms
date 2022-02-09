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
        <li>
          <a
            class="font-lato text-sm leading-4 text-gray-800"
            :href="`berita-dan-informasi/${item.id}/pratinjau`"
            target="_blank"
            rel="noopener"
          >
            Pratinjau
          </a>
        </li>
        <!-- TODO: Add action on publish clicked -->
        <li>
          <button
            class="font-lato text-sm leading-4 text-gray-800"
          >
            Terbitkan
          </button>
        </li>
        <!-- TODO: Add action on edit clicked -->
        <li>
          <router-link
            to="#"
            class="font-lato text-sm leading-4 text-gray-800"
          >
            Ubah
          </router-link>
        </li>
        <!-- TODO: Add action on archive clicked -->
        <li>
          <button
            class="font-lato text-sm leading-4 text-gray-800"
          >
            Arsipkan
          </button>
        </li>
        <!-- TODO: Add action on delete clicked -->
        <li>
          <button
            class="font-lato text-sm leading-4 text-gray-800"
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
    };
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
