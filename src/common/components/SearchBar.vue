<template>
  <div
    ref="search-bar"
    class="h-[38px] px-3 py-2 border border-gray-200 rounded-lg flex items-center gap-3"
  >
    <JdsIcon
      name="magnifier"
      size="16px"
      class="text-blue-gray-300 h-4 w-4"
    />
    <form @submit.prevent="onSubmit">
      <input
        ref="search-bar-input"
        v-model="value"
        type="text"
        placeholder="Cari agenda"
        class="w-[150px] h-full font-lato text-sm text-blue-gray-800
      placeholder:text-blue-gray-200 focus:outline-none"
      >
    </form>
    <div class="w-3 flex items-center">
      <button
        v-show="hasValue"
        ref="search-bar-clear-button"
        @click="clearValue"
      >
        <JdsIcon
          name="times-circle"
          size="12px"
          class="text-gray-500 w-3 h-3"
        />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    placeholder: {
      type: [String, Number],
      default: 'default placeholder',
    },
  },
  data() {
    return {
      value: '',
    };
  },
  computed: {
    hasValue() {
      return this.value !== '';
    },
  },
  methods: {
    clearValue() {
      this.value = '';
    },
    onSubmit() {
      this.$emit('submit', this.value);
    },
  },

};
</script>
