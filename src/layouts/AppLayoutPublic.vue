<template>
  <div>
    <slot />
    <Toast />
  </div>
</template>

<script>
import Toast from '@/common/components/Toast';

export default {
  name: 'AppLayoutPublic',
  components: {
    Toast,
  },
};
</script>
