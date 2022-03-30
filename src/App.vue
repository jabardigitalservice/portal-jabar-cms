<template>
  <div id="app">
    <AppLayout>
      <router-view />
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
