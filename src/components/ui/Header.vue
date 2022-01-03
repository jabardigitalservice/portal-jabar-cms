<template>
  <header
    ref="header"
    class="w-full h-[72px] sticky top-0 px-6 flex items-center justify-between bg-white"
  >
    <h1
      ref="header-title"
      class="font-roboto text-xl font-bold text-blue-gray-800 mr-4"
    >
      {{ pageName }}
    </h1>
    <div class="flex">
      <!-- Notification -->
      <button
        ref="header-notification"
        title="Notification"
      >
        <JdsBadge
          :show="notification"
          class="notification__custom-badge"
          :value="1"
        >
          <JdsIcon
            fill="#069550"
            name="bell"
            size="20px"
          />
        </JdsBadge>
      </button>
      <!-- User Dropdown -->
      <div
        ref="header-user"
        class="ml-4"
      >
        <JdsPopover :value="isUserDropdownOpen">
          <template #activator>
            <div class="grid grid-cols-[34px,_minmax(0,_1fr)] gap-4 items-center">
              <!-- TODO: Replace dummy image with user avatar -->
              <img
                ref="header-user-avatar"
                src="https://picsum.photos/200/300"
                alt="user avatar"
                width="34"
                height="34"
                class="w-[34px] h-[34px] max-w-full object-cover object-center rounded-full border-2 border-green-700 bg-gray-800"
              >
              <button
                ref="header-user-dropdown-button"
                class="flex items-center"
                title="Superadmin"
                @click="toggleUserDropdown"
              >
                <p
                  ref="header-user-name"
                  class="max-w-[100px] text-left font-lato font-semibold text-sm text-blue-gray-800 line-clamp-1 mr-2"
                >
                  Superadmin
                </p>
                <JdsIcon
                  fill="#069550"
                  name="chevron-right"
                  size="16px"
                  class="w-4 h-4 transition-all ease-in duration-150"
                  :class="isUserDropdownOpen ? 'rotate-90' : 'null'"
                />
              </button>
            </div>
          </template>
          <div class="w-full bg-white rounded-lg shadow-xl p-2">
            <ul
              ref="header-user-dropdown-menu"
              class="flex flex-col gap-2"
            >
              <router-link
                v-slot="{ href, navigate }"
                to="/pengaturan"
                custom
              >
                <li class="p-2 rounded-md group hover:bg-green-50">
                  <a
                    :href="href"
                    class="flex gap-2 items-center font-lato font-medium text-sm
                    text-gray-800 group-hover:text-green-700"
                    @click="navigate"
                  >
                    <img
                      src="@/assets/icons/setting-outline.svg"
                      alt="pengaturan icon"
                      width="20"
                      height="20"
                      class="w-5 h-5 object-cover object-center"
                    >
                    Pengaturan Akun
                  </a>
                </li>
              </router-link>
              <button
                class="p-2 rounded-md group hover:bg-green-50"
                @click="toggleLogoutModal"
              >
                <p
                  class="flex gap-2 items-center font-lato font-medium text-sm text-gray-800
                  group-hover:text-green-700"
                >
                  <img
                    src="@/assets/icons/logout.svg"
                    alt="logout icon"
                    width="20"
                    height="20"
                    class="w-5 h-5 object-cover object-center"
                  >
                  Keluar
                </p>
              </button>
            </ul>
          </div>
        </JdsPopover>
      </div>
    </div>
    <!-- Logout Modal -->
    <BaseModal
      :open="isLogoutModalOpen"
      @close="toggleLogoutModal"
    >
      <div class="w-full h-full">
        <h1 class="font-roboto font-bold text-center text-green-700 text-[21px] leading-[34px] mb-4">
          Keluar CMS
        </h1>
        <p class="text-center text-sm text-gray-800">
          Apakah Anda yakin akan keluar dari CMS Portal Jabar?
        </p>
      </div>
      <template #footer>
        <div class="flex w-full h-full items-center justify-center gap-4">
          <JdsButton
            variant="secondary"
            class="text-sm font-bold h-[38px]"
            @click="toggleLogoutModal"
          >
            Batal
          </JdsButton>
          <JdsButton
            variant="primary"
            class="text-sm font-bold h-[38px]"
            @click="onLogout"
          >
            Ya, saya yakin
          </JdsButton>
        </div>
      </template>
    </BaseModal>
  </header>
</template>

<script>
import BaseModal from '@/components/ui/BaseModal';

export default {
  name: 'Header',
  components: {
    BaseModal,
  },
  data() {
    return {
      notification: true,
      isUserDropdownOpen: false,
      isLogoutModalOpen: false,
    };
  },
  computed: {
    pageName() {
      return this.$route.name;
    },
  },
  methods: {
    toggleUserDropdown() {
      this.isUserDropdownOpen = !this.isUserDropdownOpen;
    },
    toggleLogoutModal() {
      this.isLogoutModalOpen = !this.isLogoutModalOpen;
    },
    async onLogout() {
      await this.$store.dispatch('auth/logout');
      window.location.replace('/login');
    },
  },
};
</script>

<style>
.notification__custom-badge .jds-badge__indicator {
  position: relative !important;
  left: -12px !important;
}

.notification__custom-badge .jds-badge__indicator span {
  color: white !important;
  font-weight: bold !important;
}
</style>
