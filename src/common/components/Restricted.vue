<template>
  <div v-if="isPermitted">
    <slot />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Restricted',
  props: {
    permission: {
      type: String,
      default: null,
    },
  },
  computed: {
    ...mapGetters('auth', ['permissions']),
    isPermitted() {
      if (Array.isArray(this.permissions)) {
        return this.permissions.includes(this.permission);
      }
      return false;
    },
  },
};
</script>
