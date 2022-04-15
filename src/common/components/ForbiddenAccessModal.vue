<template>
  <BaseModal :open="open">
    <div class="w-full h-full px-2 pb-4">
      <h1 class="font-roboto font-medium text-green-700 text-[21px] leading-[34px] mb-6">
        Akses tidak diizinkan!
      </h1>
      <p class="text-gray-800 text-sm">
        Anda tidak punya akses untuk menampilkan halaman ini.
      </p>
    </div>
    <template #footer>
      <div class="flex w-full h-full items-center justify-center gap-4 p-2">
        <BaseButton
          type="button"
          class="bg-green-700 hover:bg-green-600 text-sm text-white"
          @click="closeModal"
        >
          Saya mengerti
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import { EventBus } from '@/common/helpers/event-bus';
import BaseModal from '@/common/components/BaseModal';
import BaseButton from '@/common/components/BaseButton';

export default {
  name: 'ForbiddenAccessModal',
  components: {
    BaseModal,
    BaseButton,
  },
  data() {
    return {
      open: false,
    };
  },
  mounted() {
    EventBus.$on('error:forbidden', this.openModal);
  },
  destroyed() {
    EventBus.$off('error:forbidden', this.openModal);
  },
  methods: {
    openModal() {
      this.open = true;
    },
    closeModal() {
      this.open = false;
      this.$router.go(-1);
    },
  },
};
</script>
