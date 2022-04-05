<template>
  <div v-if="isPermitted">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Restricted',
  props: {
    permission: {
      type: String,
      default: null,
    },
  },
  computed: {
    isPermitted() {
      return this.$hasPermission(this.permission);
    },
  },
};
</script>
