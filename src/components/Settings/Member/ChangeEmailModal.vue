<template>
  <BaseModal
    :open="open"
    @close="closeModal"
  >
    <div class="w-full">
      <h1 class="font-roboto font-medium text-green-700 text-[21px] leading-[34px] mb-4">
        Ubah Email
      </h1>
      <p class="text-center text-sm leading-6 text-blue-gray-800 mb-5">
        Anda akan mengubah email
        <br>
        <strong>{{ memberEmail }} ({{ memberName }})</strong>
      </p>
      <form @submit.prevent="submitForm">
        <div
          class="flex flex-col flex-grow mb-3"
        >
          <input
            v-model="newEmail"
            type="email"
            :readonly="isLoading"
            class="focus:outline-none border p-2 rounded-md font-lato text-sm text-blue-gray-800"
            :class="[isEmailTouched && !isValidInput ? 'bg-red-50 border-red-700' : 'bg-white border-gray-400 focus:border-green-700']"
            placeholder="Masukkan alamat email baru"
          >
          <p
            class="text-red-600 text-xs mt-1"
            :class="isEmailTouched && !isValidInput ? 'visible' : 'invisible'"
          >
            Email yang anda masukkan belum sesuai
          </p>
        </div>
        <div
          class="flex flex-col flex-grow"
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
            :readonly="isLoading"
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
        </div>
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
          :disabled="!isFormValid || isLoading"
          @click="submitForm"
        >
          <template #icon-right>
            <JdsSpinner
              v-show="isLoading"
              size="16px"
              foreground="#757575"
            />
          </template>
          Ubah Email
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import BaseModal from '@/common/components/BaseModal';
import BaseButton from '@/common/components/BaseButton';
import { isValidEmail } from '@/common/helpers/validation';

export default {
  name: 'ChangeEmailModal',
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
    memberEmail: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      newEmail: '',
      password: '',
      isEmailTouched: false,
      isLoading: false,
      isError: false,
    };
  },
  computed: {
    isValidInput() {
      return isValidEmail(this.newEmail);
    },
    isFormValid() {
      return this.password !== '' && this.isEmailTouched && this.isValidInput;
    },
  },
  watch: {
    newEmail() {
      if (this.open && !this.isEmailTouched) {
        this.isEmailTouched = true;
      }
    },
  },
  methods: {
    closeModal() {
      this.$emit('close');
      this.resetForm();
    },
    resetForm() {
      this.isLoading = false;
      this.isError = false;
      this.isEmailTouched = false;
      this.password = '';
      this.newEmail = '';
    },
    submitForm() {
      if (!this.isLoading && this.isFormValid) {
        this.handleChangeEmail();
      }
    },
    async handleChangeEmail() {
      // TODO: add change email functionality
    },
  },
};
</script>
