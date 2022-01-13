<template>
  <main class="pb-20">
    <HeaderMenu>
      <!-- TODO: Add action on button click -->
      <BaseButton
        variant="secondary"
      >
        <template #icon-left>
          <JdsIcon
            name="eye"
            size="16px"
            class="h-4 text-green-700"
          />
        </template>
        <p class="font-lato font-bold text-sm text-green-700">
          Pratinjau
        </p>
      </BaseButton>
    </HeaderMenu>
    <section class="px-6 py-4 rounded-lg bg-white mb-4">
      <h1 class="font-roboto font-medium text-[21px] leading-[34px] text-green-700 mb-3">
        Detail Agenda Jawa Barat
      </h1>
      <!-- TODO: Add page content -->
    </section>
  </main>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton.vue';
import HeaderMenu from '@/components/ui/HeaderMenu.vue';

export default {
  name: 'AgendaDetail',
  components: { HeaderMenu, BaseButton },
};
</script>
