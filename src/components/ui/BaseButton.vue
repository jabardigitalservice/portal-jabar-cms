<template>
  <button
    ref="base-button"
    v-bind="$attrs"
    class="h-[38px] px-4 flex items-center rounded-lg border whitespace-nowrap
    disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
    v-on="$listeners"
  >
    <div class="flex items-center gap-3">
      <slot name="icon-left" />
      <slot />
      <slot name="icon-right" />
    </div>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
};
</script>
