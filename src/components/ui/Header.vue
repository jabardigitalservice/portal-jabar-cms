<template>
  <header class="w-full h-[72px] sticky top-0 px-6 flex items-center justify-between bg-white">
    <h1 class="font-roboto text-xl font-bold text-blue-gray-800 mr-4">
      {{ pageName }}
    </h1>
    <div class="flex gap-6">
      <!-- TODO: Add notification menu -->
      <!-- TODO: Add avatar and menu dropdown -->
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    pageName() {
      return this.$route.name;
    },
  },
};
</script>
