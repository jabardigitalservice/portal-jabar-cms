<template>
  <button
    ref="base-button"
    v-bind="$attrs"
    class="h-[38px] px-4 flex items-center rounded-lg border whitespace-nowrap font-bold
    disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600 disabled:border-gray-300"
    v-on="$listeners"
  >
    <div class="flex items-center gap-3 w-full">
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
