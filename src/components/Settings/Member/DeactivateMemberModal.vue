<template>
  <BaseModal
    :open="open"
    @close="closeModal"
  >
    <div class="w-full">
      <h1 class="font-roboto font-medium text-green-700 text-[21px] leading-[34px] mb-4">
        Nonaktifkan Akun
      </h1>
      <p class="text-center text-sm leading-6 text-blue-gray-800 mb-5">
        Anda akan menonaktifkan akun <strong>{{ memberEmail }}</strong>
        <br>
        Ketikkan Kata Sandi untuk konfirmasi.
      </p>
      <em class="text-sm font-lato leading-6 text-blue-gray-800 mb-2">
        *Kata sandi yang dimasukkan adalah kata sandi group admin
      </em>
      <div
        class="w-full border border-blue-gray-100 rounded-lg overflow-hidden p-2
      focus-within:border-green-600"
      >
        <input
          v-model="password"
          placeholder="Masukkan kata sandi"
          type="password"
          class="text-sm text-center bg-white placeholder:text-blue-gray-100
          w-full focus:outline-none leading-none"
        >
      </div>
    </div>
    <template #footer>
      <div class="flex w-full h-full items-center justify-end gap-4">
        <BaseButton
          class="border-green-700 hover:bg-green-50 text-sm text-green-700"
          @click="closeModal"
        >
          Batal
        </BaseButton>
        <BaseButton
          class="bg-red-600 hover:bg-red-700 text-sm text-white"
        >
          Nonaktifkan
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import BaseModal from '@/common/components/BaseModal';
import BaseButton from '@/common/components/BaseButton';

export default {
  name: 'DeactivateMemberModal',
  components: {
    BaseModal,
    BaseButton,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    memberEmail: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      password: '',
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>
