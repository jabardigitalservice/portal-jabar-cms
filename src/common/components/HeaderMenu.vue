<template>
  <section class="h-[66px] -mt-[14px] z-40 flex items-center sticky top-[72px] bg-gray-100">
    <div class="flex items-center">
      <BaseButton
        class="bg-green-700 hover:bg-green-600 font-lato text-sm text-white"
        @click="$router.back()"
      >
        <template #icon-left>
          <JdsIcon
            name="arrow-left"
            size="16px"
            fill="#fff"
            class="h-4 w-4"
          />
        </template>
        <p>
          Kembali
        </p>
      </BaseButton>
      <!-- NOTE: use this slot to add additional information -->
      <slot name="info" />
    </div>
    <div class="ml-auto">
      <slot />
    </div>
  </section>
</template>

<script>
import BaseButton from '@/common/components/BaseButton';

export default {
  name: 'HeaderMenu',
  components: {
    BaseButton,
  },
};
</script>
