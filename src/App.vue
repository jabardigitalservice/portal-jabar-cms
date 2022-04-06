<template>
  <div id="app">
    <AppLayout>
      <keep-alive include="Settings">
        <router-view />
      </keep-alive>
    </AppLayout>
    <portal-target name="modal" />
    <Toast />
  </div>
</template>

<script>
import AppLayout from '@/layouts/AppLayout';
import Toast from '@/common/components/Toast';

export default {
  components: {
    AppLayout,
    Toast,
  },
};
</script>
