<template>
  <portal to="alert">
    <transition
      enter-active-class="animate-slide-down"
      leave-active-class="animate-close-to-right"
    >
      <div
        v-if="isOpen"
        class="absolute z-[50] top-[88px] w-full min-h-[55px]"
      >
        <JdsSectionMessage
          :show="isOpen"
          :variant="variant"
          :message="message"
          dismissible
          class="w-fit min-w-[150px] ml-auto mr-6"
          @click:close="onClose"
        />
      </div>
    </transition>
  </portal>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Toast',
  computed: {
    ...mapState('alert', ['isOpen', 'variant', 'message']),
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
