<template>
  <router-link
    ref="link-button"
    v-bind="$attrs"
    :to="href"
    :target="newTab ? '_blank' : null"
    :class="{
      'h-[38px] px-4 flex items-center rounded-lg border whitespace-nowrap': true,
      'border-transparent bg-green-700 hover:bg-green-600': variant === 'primary',
      'border-green-700': variant === 'secondary',
      'border-transparent': variant === 'tertiary'
    }"
  >
    <div class="flex items-center gap-3">
      <slot name="icon-left" />
      <slot />
      <slot name="icon-right" />
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'LinkButton',
  props: {
    href: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'secondary', 'tertiary']
          .includes(value) !== -1;
      },
    },
    newTab: {
      type: Boolean,
      default: false,
    },
  },

};
</script>
