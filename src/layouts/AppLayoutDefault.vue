<template>
  <div class="w-full h-screen grid grid-cols-layout bg-gray-100">
    <Sidebar />
    <div class="w-full max-h-screen overflow-y-auto">
      <Header />
      <div class="w-full h-[calc(100%-72px)] py-[14px] px-6">
        <slot />
      </div>
    </div>
    <Toast />
  </div>
</template>

<script>
import Sidebar from '@/components/ui/Sidebar.vue';
import Header from '@/components/ui/Header.vue';
import Toast from '@/components/ui/Toast.vue';

export default {
  name: 'AppLayoutDefault',
  components: {
    Sidebar,
    Header,
    Toast,
  },
};
</script>
