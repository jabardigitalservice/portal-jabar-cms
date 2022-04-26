<template>
  <ul
    ref="tab-bar"
    class="w-full min-h-[48px] flex gap-3 px-4 bg-white rounded-lg mb-[14px]"
  >
    <li
      v-for="(tab, index) in tabs"
      ref="tab-bar-item"
      :key="tab.key"
      class="flex flex-col justify-between cursor-pointer"
      @click="onTabChange(index)"
    >
      <p
        ref="tab-bar-label"
        class="mt-3 px-3 font-lato font-medium text-sm"
        :class="currentTab === tab.key ? 'text-green-700' : 'text-gray-700'"
      >
        {{ tab.label }}
      </p>
      <div
        ref="tab-bar-indicator"
        class="w-full h-[3px] rounded-t-lg"
        :class="currentTab === tab.key ? 'bg-green-700' : 'bg-transparent'"
      />
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TabBar',
  props: {
    tabs: {
      type: Array,
      default: () => [
        { key: 'one', label: 'Tab 1' },
        { key: 'two', label: 'Tab 2' },
        { key: 'three', label: 'Tab 3' },
      ],
    },
    currentTab: {
      type: String,
      default: '',
    },
  },
  methods: {
    onTabChange(index) {
      this.$emit('update:currentTab', this.tabs[index].key);
    },
  },
};
</script>
