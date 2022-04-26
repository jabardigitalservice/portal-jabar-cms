<template>
  <transition
    enter-active-class="animate-slide-down"
    leave-active-class="animate-close-to-top"
  >
    <div
      v-if="isOpen"
      class="absolute z-[150] top-[88px] w-full flex justify-center min-h-[55px] pointer-events-none"
    >
      <JdsSectionMessage
        :show="isOpen"
        :variant="type"
        :message="message"
        dismissible
        class="w-fit min-w-[150px] shadow-lg pointer-events-auto"
        @click:close="onClose"
      />
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Toast',
  computed: {
    ...mapState('alert', ['isOpen', 'type', 'message']),
  },
  watch: {
    isOpen: {
      handler() {
        if (this.isOpen) {
          setTimeout(() => {
            this.onClose();
          }, 5000);
        }
      },
      immediate: true,
    },
  },
  methods: {
    onClose() {
      this.$store.dispatch('alert/closeAlert', null);
    },
  },
};
</script>
