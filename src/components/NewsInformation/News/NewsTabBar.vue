<template>
  <ul class="w-full flex gap-[6px]">
    <li
      v-for="(tab, index) in tabs"
      :key="tab.key"
      class="w-[180px] min-h-[70px] px-[14px] py-[10px] rounded-t-lg cursor-pointer"
      :class="currentTab === tab.key ? 'bg-white' : 'bg-green-700'"
      :title="tab.label"
      @click="onTabChange(index)"
    >
      <div class="grid grid-cols-[28px,_1fr] items-center gap-2">
        <div
          class="w-[28px] h-[28px] flex items-center justify-center  rounded-full"
          :class="currentTab === tab.key ? 'bg-gray-200' : 'bg-green-800'"
        >
          <!-- TODO: Load icon using SVG Loader -->
          <img
            :src="require(`@/assets/icons/${tab.icon}.svg`)"
            :alt="tab.icon"
            width="16"
            height="16"
            class="w-4 h-4"
          >
        </div>
        <p
          class="font-lato text-sm  whitespace-nowrap line-clamp-1"
          :class="currentTab === tab.key ? 'text-gray-700' : 'text-green-100'"
        >
          {{ tab.label }}
        </p>
        <p
          class="col-start-2 font-roboto font-medium text-xl"
          :class="currentTab === tab.key ? 'text-blue-gray-800' : 'text-white'"
        >
          {{ tab.count }}
        </p>
      </div>
    </li>
  </ul>
</template>

<script>

export default {
  name: 'NewsTabBar',
  props: {
    tabs: {
      type: Array,
      default: () => [],
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
