<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
export default {
  name: 'AppLayout',
  components: {
    AppLayoutPrivate: () => import('@/layouts/AppLayoutPrivate.vue'),
    AppLayoutPublic: () => import('@/layouts/AppLayoutPublic.vue'),
  },
  computed: {
    /**
     * Change layout dynamically based on
     * `layout` property in `$route.meta `object
     */
    layout() {
      return this.$route.meta?.layout;
    },
  },
};
</script>
