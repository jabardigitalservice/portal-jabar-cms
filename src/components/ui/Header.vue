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
        class="px-4"
      >
        <JdsPopover :value="isUserDropdownOpen">
          <template #activator>
            <div class="w-full flex gap-4 whitespace-nowrap items-center">
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
                class="flex items-center gap-2"
                @click="toggleUserDropdown"
              >
                <p
                  ref="header-user-name"
                  class="font-lato font-semibold text-sm text-blue-gray-800"
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
                tag="li"
                to="/pengaturan"
                class="p-2 rounded-md hover:bg-gray-100"
              >
                <a class="flex gap-2 items-center font-lato font-medium text-sm text-gray-800">
                  <img
                    src="@/assets/icons/setting-outline.svg"
                    alt="pengaturan icon"
                    width="20"
                    height="20"
                    class="w-5 h-5 object-cover object-center"
                  >
                  Pengaturan Akun
                </a>
              </router-link>
              <router-link
                tag="li"
                to="#"
                class="p-2 rounded-md hover:bg-gray-100"
              >
                <a class="flex gap-2 items-center font-lato font-medium text-sm text-gray-800">
                  <img
                    src="@/assets/icons/logout.svg"
                    alt="logout icon"
                    width="20"
                    height="20"
                    class="w-5 h-5 object-cover object-center"
                  >
                  Keluar
                </a>
              </router-link>
            </ul>
          </div>
        </JdsPopover>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      notification: true,
      isUserDropdownOpen: false,
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
