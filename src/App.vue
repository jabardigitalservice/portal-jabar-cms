<template>
  <div id="app">
    <AppLayout>
      <router-view />
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from '@/layouts/AppLayout';

export default {
  components: { AppLayout },
};
</script>
