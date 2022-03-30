<template>
  <JdsPopover
    class="member-table__action-button"
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
        <li v-if="shouldShowAction('show-detail')">
          <router-link
            :to="`/pengaturan/member/detail/${item.id}`"
            class="font-lato text-sm leading-4 text-gray-800"
          >
            Lihat Detail
          </router-link>
        </li>
        <!-- TODO: add action on button clicked -->
        <li v-if="shouldShowAction('set-admin')">
          <button
            class="font-lato text-sm leading-4 text-gray-800"
          >
            Jadikan Admin
          </button>
        </li>
        <!-- TODO: add action on button clicked -->
        <li v-if="shouldShowAction('deactivate-member')">
          <button
            class="font-lato text-sm leading-4 text-gray-800"
          >
            Nonaktifkan Akun
          </button>
        </li>
        <!-- TODO: add action on button clicked -->
        <li v-if="shouldShowAction('change-email')">
          <button
            class="font-lato text-sm leading-4 text-gray-800"
          >
            Ubah Email
          </button>
        </li>
        <li v-if="shouldShowAction('cancel-invitation')">
          <button
            class="font-lato text-sm leading-4 text-gray-800"
          >
            Batalkan Undangan
          </button>
        </li>
      </ul>
    </div>
  </JdsPopover>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';

export default {
  name: 'MemberTableAction',
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
        placement: 'bottom-end',
        modifiers: [
          {
            name: 'offset',
            options: { offset: [0, 8] },
          },
        ],
      },
      // Map allowed actions based on member status
      allowedActions: Object.freeze({
        active: ['show-detail', 'set-admin', 'deactivate-member', 'change-email'],
        'non-active': ['show-detail'],
        'waiting confirmation': ['cancel-invitation'],
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
.member-table__action-button .jds-popover__content {
  z-index: 20 !important;
}
</style>
