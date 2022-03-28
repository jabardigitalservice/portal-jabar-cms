<template>
  <Tooltip :show="show">
    <div class="flex gap-2 mb-2">
      <div
        class="h-1 rounded-lg w-14"
        :class="[lowBarClassName]"
      />
      <div
        class="h-1 rounded-lg w-14"
        :class="[mediumBarClassName]"
      />
      <div
        class="h-1 rounded-lg w-14"
        :class="[strongBarClassName]"
      />
    </div>
    <p>Kata sandi Anda <span :class="passwordStrengthLabelClassName">{{ passwordStrength.label }}</span></p>
  </Tooltip>
</template>

<script>
import Tooltip from '@/common/components/Tooltip';

export default {
  name: 'PasswordTooltip',
  components: {
    Tooltip,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    passwordStrength: {
      type: Object,
      required: true,
    },
  },
  computed: {
    lowBarClassName() {
      switch (this.passwordStrength.type) {
        case 'low':
          return 'bg-red-600';
        case 'medium':
          return 'bg-yellow-600';
        case 'strong':
          return 'bg-green-600';
        default:
          return 'bg-gray-600';
      }
    },
    mediumBarClassName() {
      switch (this.passwordStrength.type) {
        case 'medium':
          return 'bg-yellow-600';
        case 'strong':
          return 'bg-green-600';
        default:
          return 'bg-gray-600';
      }
    },
    strongBarClassName() {
      switch (this.passwordStrength.type) {
        case 'strong':
          return 'bg-green-600';
        default:
          return 'bg-gray-600';
      }
    },
    passwordStrengthLabelClassName() {
      switch (this.passwordStrength.type) {
        case 'low':
          return 'text-red-500';
        case 'medium':
          return 'text-yellow-500';
        case 'strong':
          return 'text-green-500';
        default:
          return '';
      }
    },
  },
};
</script>
