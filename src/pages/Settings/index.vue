<template>
  <div class="h-full">
    <TabBar
      :tabs="tabs"
      :current-tab.sync="currentTab"
    />
    <keep-alive>
      <component :is="tab" />
    </keep-alive>
  </div>
</template>

<script>
import TabBar from '@/common/components/TabBar';

export default {
  name: 'Settings',
  components: {
    TabBar,
    AccountSettings: () => import('@/components/Settings/Account'),
    MemberSettings: () => import('@/components/Settings/Member'),
  },
  data() {
    return {
      tabs: [
        { key: 'akun', label: 'Akun' },
        { key: 'anggota', label: 'Anggota' },
      ],
      currentTab: 'akun',
    };
  },
  computed: {
    tab() {
      switch (this.currentTab) {
        case 'akun':
          return 'AccountSettings';
        case 'anggota':
          return 'MemberSettings';
        default:
          return 'AccountSettings';
      }
    },
  },

};
</script>
