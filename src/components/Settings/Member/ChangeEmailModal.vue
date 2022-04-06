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
          class="flex flex-col flex-grow mb-4"
        >
          <input
            v-model="newEmail"
            type="email"
            :readonly="isLoading"
            class="focus:outline-none border p-2 rounded-md font-lato text-sm text-blue-gray-800 placeholder:text-gray-600"
            :class="[errors.newEmail ? 'bg-red-50 border-red-700' : 'bg-white border-gray-500 focus:border-green-700']"
            placeholder="Masukkan alamat email baru"
          >
          <p
            v-show="errors.newEmail"
            class="text-red-600 text-xs mt-1"
          >
            {{ errors.newEmail }}
          </p>
        </div>
        <div class="flex flex-col flex-grow mb-4">
          <label
            for="password"
            class="text-sm font-medium text-blue-gray-800 italic mb-2"
          >
            *Kata sandi yang dimasukkan adalah kata sandi group admin
          </label>
          <div
            class="border border-gray-500 rounded-lg overflow-hidden flex items-stretch focus-within:border-green-700"
            :class="[errors.password ? 'bg-red-50 border border-red-600' : 'bg-white']"
          >
            <input
              id="password"
              v-model="password"
              :type="passwordType"
              placeholder="Masukkan kata sandi"
              class="text-sm placeholder:text-gray-600 p-2 w-full focus:outline-none"
              :class="[errors.password ? 'bg-red-50' : 'bg-white ']"
            >
            <div
              v-show="isPasswordIconVisible"
              class="p-2 flex justify-center items-center cursor-pointer"
              @click="togglePasswordInputVisibility"
            >
              <JdsIcon
                :name="passwordIconName"
                size="16px"
              />
            </div>
          </div>
          <p
            v-show="errors.password"
            class="text-red-600 text-xs mt-1"
          >
            {{ errors.password }}
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
          :disabled="!isFormValid"
          @click="submitForm"
        >
          <JdsSpinner
            v-show="isLoading"
            size="16px"
          />
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
import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const userRepository = RepositoryFactory.get('user');

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
    id: {
      type: String,
      default: '',
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
      isLoading: false,
      errors: {
        newEmail: '',
        password: '',
      },
      isPasswordIconVisible: false,
      isPasswordInputVisible: false,
      passwordType: 'password',
      passwordIconName: 'eye',
    };
  },
  computed: {
    isFormValid() {
      return this.newEmail.trim() !== '' && isValidEmail(this.newEmail) && this.password !== '';
    },
  },
  watch: {
    newEmail() {
      if (this.open) {
        if (this.newEmail.trim() === '') this.setErrors('newEmail', 'Email harus diisi');
        else if (!isValidEmail(this.newEmail.trim())) this.setErrors('newEmail', 'Email yang anda masukkan belum sesuai');
        else this.clearErrors('newEmail');
      }
    },
    password() {
      this.isPasswordIconVisible = this.password !== '';
      if (this.open) {
        if (this.password === '') this.setErrors('password', 'Kata sandi harus diisi');
        else this.clearErrors('password');
      }
    },
  },
  methods: {
    setErrors(name, message) {
      this.errors = {
        ...this.errors,
        [name]: message,
      };
    },
    clearErrors(name) {
      this.errors[name] = '';
    },
    togglePasswordInputVisibility() {
      this.isPasswordInputVisible = !this.isPasswordInputVisible;
      this.passwordType = this.isPasswordInputVisible ? 'text' : 'password';
      this.passwordIconName = this.isPasswordInputVisible ? 'eye-off' : 'eye';
    },
    closeModal() {
      this.$emit('close');
      this.resetForm();
    },
    resetForm() {
      this.isLoading = false;
      this.password = '';
      this.newEmail = '';
      this.clearErrors('newEmail');
      this.clearErrors('password');
    },
    submitForm() {
      if (!this.isLoading && this.isFormValid) {
        this.handleChangeEmail();
      }
    },
    async handleChangeEmail() {
      try {
        this.isLoading = true;
        await userRepository.changeEmail(this.id, this.password, this.newEmail);
        this.closeModal();
        this.$emit('success:action');
        this.$toast({ type: 'success', message: 'Email berhasil diubah' });
      } catch (error) {
        if (error.response?.status === 422) {
          const errorMessage = error.response?.data?.message || '';
          if (errorMessage.includes('email')) {
            this.setErrors('newEmail', 'Email yang Anda masukkan sudah terdaftar');
          } else if (errorMessage.includes('password')) {
            this.setErrors('password', 'Kata sandi yang Anda masukkan tidak sesuai');
          }
        } else {
          this.$toast({ type: 'error', message: 'Mohon maaf, terjadi kesalahan pada server' });
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
