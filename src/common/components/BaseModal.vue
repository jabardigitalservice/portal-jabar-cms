<template>
  <portal to="modal">
    <div
      v-if="open"
      ref="modal"
      class="fixed z-[100] inset-0 w-full h-screen flex items-center justify-center"
    >
      <!-- Background Overlay -->
      <div
        ref="modal-overlay"
        class="animate-fade-in absolute w-full h-full bg-black opacity-50"
      />
      <!-- Modal -->
      <section
        ref="modal-container"
        class="animate-slide-up relative min-w-[510px] max-w-screen-lg min-h-[200px] max-h-[90%]
        grid grid-rows-[minmax(0,_1fr)_70px] rounded-lg overflow-hidden"
      >
        <div
          ref="modal-body"
          class="w-full h-full overflow-y-auto bg-white p-4 pb-0"
        >
          <slot />
        </div>
        <div
          ref="modal-footer"
          class="w-full h-full p-4 bg-white"
        >
          <slot name="footer">
            <div class="w-full h-full flex items-center justify-center">
              <BaseButton
                class="bg-green-700 hover:bg-green-600 text-sm text-white"
                @click="$emit('close')"
              >
                Tutup
              </BaseButton>
            </div>
          </slot>
        </div>
      </section>
    </div>
  </portal>
</template>

<script>
import BaseButton from '@/common/components/BaseButton';

export default {
  name: 'BaseModal',
  components: {
    BaseButton,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
