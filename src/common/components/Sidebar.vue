<template>
  <aside
    ref="sidebar"
    class="min-h-screen h-full flex flex-col bg-green-600 p-6"
  >
    <section
      ref="sidebar-title"
      class="flex gap-2"
    >
      <img
        src="@/assets/icons/logo.svg"
        alt="Portal Jabar Logo"
        width="34px"
        height="34px"
        class="self-start"
      >
      <div>
        <img
          src="@/assets/icons/logo-text.svg"
          alt="Portal Jabar Logo"
          width="75px"
          height="38px"
          class="mb-1"
        >
        <h1 class="font-lato text-white text-sm font-bold leading-5 whitespace-nowrap">
          CONTENT MANAGEMENT<br>
          SYSTEM
        </h1>
      </div>
    </section>
    <nav
      ref="sidebar-navigation"
      class="w-full mt-10"
    >
      <router-link
        v-for="navigation in navigationMenu"
        :key="navigation.label"
        v-slot="{ href, navigate, isActive }"
        :to="navigation.link"
        :exact="navigation.link === '/'"
        custom
      >
        <li
          class="w-full min-h-[50px] p-[15px] flex items-center rounded-lg font-lato
          font-bold text-sm text-white hover:bg-green-700 mb-2"
          :class="{'bg-green-700' : isActive}"
        >
          <a
            :href="href"
            :title="navigation.label"
            class="w-full flex items-center gap-3 whitespace-nowrap"
            @click="navigate"
          >
            <!-- Menu Icon -->
            <component
              :is="navigation.icon"
              class="w-5 h-5 fill-white"
            />
            {{ navigation.label }}
            <span
              v-show="navigation.arrow"
              class="ml-auto"
            >
              <JdsIcon
                fill="#fff"
                name="chevron-right"
                size="16px"
              />
            </span>
          </a>
        </li>
      </router-link>
    </nav>
    <section
      ref="sidebar-bottom-nav"
      class="mt-auto"
    >
      <router-link
        v-slot="{ href, navigate, isActive }"
        to="/pengaturan"
        custom
      >
        <li
          class="w-full min-h-[50px] p-[15px] flex items-center rounded-lg font-lato
          font-bold text-sm text-white hover:bg-green-700 mb-2"
          :class="{'bg-green-700' : isActive}"
        >
          <a
            :href="href"
            title="Pengaturan Akun"
            class="w-full flex items-center gap-3 whitespace-nowrap"
            @click="navigate"
          >
            <SettingIcon class="w-5 h-5 fill-white" />
            Pengaturan Akun
          </a>
        </li>
      </router-link>
    </section>
  </aside>
</template>

<script>
import { NAVIGATION_MENU } from '@/common/constants';
import DashboardIcon from '@/assets/icons/dashboard.svg?inline';
import ServiceIcon from '@/assets/icons/layanan.svg?inline';
import AgendaIcon from '@/assets/icons/agenda.svg?inline';
import NewsIcon from '@/assets/icons/berita.svg?inline';
import SettingIcon from '@/assets/icons/setting.svg?inline';

export default {
  name: 'Sidebar',
  components: {
    DashboardIcon,
    ServiceIcon,
    AgendaIcon,
    NewsIcon,
    SettingIcon,
  },
  data() {
    return {
      navigationMenu: NAVIGATION_MENU,
    };
  },
};
</script>
