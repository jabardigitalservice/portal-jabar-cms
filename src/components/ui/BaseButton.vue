<template>
  <button
    ref="base-button"
    v-bind="$attrs"
    :class="{
      'h-[38px] px-4 flex items-center rounded-lg border whitespace-nowrap': true,
      'disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-600': true,
      'border-transparent bg-green-700 hover:bg-green-600': variant === 'primary',
      'border-green-700 hover:bg-green-50': variant === 'secondary',
      'border-transparent': variant === 'tertiary',
    }"
    v-on="$listeners"
  >
    <div
      class="flex items-center gap-3"
    >
      <slot name="icon-left" />
      <slot />
      <slot name="icon-right" />
    </div>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'secondary', 'tertiary']
          .includes(value) !== -1;
      },
    },
  },
};
</script>
