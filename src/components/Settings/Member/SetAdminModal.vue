<template>
  <BaseModal
    :open="open"
    @close="closeModal"
  >
    <div class="w-full">
      <h1 class="font-roboto font-medium text-green-700 text-[21px] leading-[34px] mb-4">
        Jadikan Administrator
      </h1>
      <p class="text-center text-sm leading-6 text-blue-gray-800 mb-5">
        Anda akan menjadikan akun <strong>{{ memberName }}</strong> sebagai <strong>Administrator</strong>
        <br>
        Ketikkan Kata Sandi untuk konfirmasi.
      </p>
      <form
        class="flex flex-col flex-grow"
        @submit.prevent="submitForm"
      >
        <label
          for="password"
          class="text-sm font-medium text-blue-gray-800 italic mb-2"
        >
          *Kata sandi yang dimasukkan adalah kata sandi group admin
        </label>
        <input
          id="password"
          v-model="password"
          type="password"
          class="focus:outline-none border p-2 rounded-md font-lato text-sm text-blue-gray-800"
          :class="[isError ? 'bg-red-50 border-red-700' : 'bg-white border-gray-400 focus:border-green-700']"
          placeholder="Masukkan kata sandi"
        >
        <p
          class="text-red-600 text-xs mt-1"
          :class="isError ? 'visible' : 'invisible'"
        >
          Kata sandi yang anda masukkan belum sesuai
        </p>
      </form>
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
          class="bg-green-700 hover:bg-green-600 text-sm text-white"
          :disabled="isLoading || !isFormValid"
          @click="submitForm"
        >
          Jadikan Administrator
          <template #icon-right>
            <JdsSpinner
              v-show="isLoading"
              size="16px"
              foreground="#757575"
            />
          </template>
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import BaseModal from '@/common/components/BaseModal';
import BaseButton from '@/common/components/BaseButton';

export default {
  name: 'SetAdminModal',
  components: {
    BaseModal,
    BaseButton,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    memberName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      password: '',
      isLoading: false,
      isError: false,
    };
  },
  computed: {
    isFormValid() {
      return this.password !== '';
    },
  },
  methods: {
    closeModal() {
      this.$emit('close');
      this.resetForm();
    },
    resetForm() {
      this.password = '';
    },
    submitForm() {
      if (this.isFormValid && !this.isLoading) {
        this.handleSetAdmin();
      }
    },
    async handleSetAdmin() {
      // TODO: add set as admin functionality
    },
  },
};
</script>
