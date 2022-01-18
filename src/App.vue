<template>
  <div id="app">
    <AppLayout>
      <router-view />
    </AppLayout>
    <portal-target name="modal" />
    <portal-target name="alert" />
  </div>
</template>

<script>
import AppLayout from '@/layouts/AppLayout';

export default {
  components: { AppLayout },
};
</script>
