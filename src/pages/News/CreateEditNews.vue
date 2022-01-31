<template>
  <main>
    <HeaderMenu>
      <template
        v-if="isEditMode"
        #info
      >
        <p class="ml-4 text-gray-600 text-sm">
          Terakhir disimpan pada: 12/01/2022 - 15:00
        </p>
      </template>
      <div class="flex gap-4">
        <BaseButton class="border-green-700 hover:bg-green-50 font-lato text-sm text-green-700">
          <template #icon-left>
            <img
              src="@/assets/icons/review.svg"
              alt="Pratinjau"
              width="20"
              height="20"
            >
          </template>
          <p>
            Pratinjau
          </p>
        </BaseButton>
        <BaseButton class="border-green-700 hover:bg-green-50 font-lato text-sm text-green-700">
          <img
            src="@/assets/icons/publish.svg"
            alt="Ajukan"
            width="20"
            height="20"
          >
          <p>
            Ajukan untuk Diterbitkan
          </p>
        </BaseButton>
        <BaseButton class="bg-green-700 hover:bg-green-600 font-lato text-sm text-white">
          <img
            src="@/assets/icons/draft.svg"
            alt="Simpan"
            width="20"
            height="20"
          >
          <p>
            {{ submitButtonLabel }}
          </p>
        </BaseButton>
      </div>
    </HeaderMenu>
  </main>
</template>

<script>
import HeaderMenu from '@/common/components/HeaderMenu';
import BaseButton from '@/common/components/BaseButton';

export default {
  name: 'CreateEditNews',
  components: {
    HeaderMenu,
    BaseButton,
  },
  computed: {
    mode() {
      return this.$route.meta?.mode || 'create';
    },
    isEditMode() {
      return this.mode === 'edit';
    },
    submitButtonLabel() {
      return this.isEditMode ? 'Simpan Perubahan' : 'Simpan Berita';
    },
  },
};
</script>
