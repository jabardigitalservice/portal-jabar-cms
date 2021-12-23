<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
const defaultLayout = 'AppLayoutDefault';

export default {
  name: 'AppLayout',
  components: {
    AppLayoutDefault: () => import('@/layouts/AppLayoutDefault.vue'),
    AppLayoutPublic: () => import('@/layouts/AppLayoutPublic.vue'),
  },
  computed: {
    /**
     * Change layout dynamically based on
     * `layout` property in `$route.meta `object
     */
    layout() {
      const layout = this.$route.meta?.layout || defaultLayout;
      return layout;
    },
  },
};
</script>
