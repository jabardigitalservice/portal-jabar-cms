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
        class="absolute w-full h-full bg-black opacity-50"
      />
      <!-- Modal -->
      <section
        ref="modal-container"
        class="relative min-w-[510px] max-w-screen-lg min-h-[200px] max-h-[90%]
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
              <JdsButton
                variant="primary"
                class="font-bold leading-5"
                @click="$emit('close')"
              >
                Tutup
              </JdsButton>
            </div>
          </slot>
        </div>
      </section>
    </div>
  </portal>
</template>

<script>
export default {
  name: 'BaseModal',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
