<template>
  <div id="app">
    <AppLayout>
      <keep-alive include="Settings">
        <router-view />
      </keep-alive>
    </AppLayout>
    <portal-target name="modal" />
    <Toast />
    <ForbiddenAccessModal />
  </div>
</template>

<script>
import AppLayout from '@/layouts/AppLayout';
import Toast from '@/common/components/Toast';
import ForbiddenAccessModal from '@/common/components/ForbiddenAccessModal';

export default {
  components: {
    AppLayout,
    Toast,
    ForbiddenAccessModal,
  },
};
</script>
