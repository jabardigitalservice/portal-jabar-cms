<template>
  <div
    v-show="show"
    class="absolute mb-2"
  >
    <div class="bg-gray-900 p-3 top-0 left-0 rounded-lg text-white text-xs">
      <slot />
    </div>
    <div class="absolute top-1 left-3 w-3 h-3 -mt-2 rotate-45 bg-gray-900" />
  </div>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
