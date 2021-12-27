<template>
  <header
    ref="header"
    class="w-full h-[72px] sticky top-0 px-6 flex items-center justify-between bg-white"
  >
    <h1
      ref="header-title"
      class="font-roboto text-xl font-bold text-blue-gray-800 mr-4"
    >
      {{ pageName }}
    </h1>
    <div class="flex gap-6">
      <!-- Notification -->
      <button
        ref="header-notification"
        title="Notification"
      >
        <JdsBadge
          :show="notification"
          class="notification__custom-badge"
          :value="1"
        >
          <JdsIcon
            fill="#069550"
            name="bell"
            size="20px"
          />
        </JdsBadge>
      </button>
      <!-- TODO: Add avatar and menu dropdown -->
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      notification: false,
    };
  },
  computed: {
    pageName() {
      return this.$route.name;
    },
  },
};
</script>

<style>
.notification__custom-badge .jds-badge__indicator {
  position: relative !important;
  left: -12px !important;
}

.notification__custom-badge .jds-badge__indicator span {
  color: white !important;
  font-weight: bold !important;
}
</style>
