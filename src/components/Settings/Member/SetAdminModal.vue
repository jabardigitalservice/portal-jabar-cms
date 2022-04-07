<template>
  <BaseModal
    :open="open"
    @close="closeModal"
  >
    <div class="w-full">
      <h1 class="font-roboto font-medium text-green-700 text-[21px] leading-[34px] mb-4">
        Jadikan Administrator
      </h1>
      <p class="text-center text-sm leading-6 text-blue-gray-800 mb-6">
        Anda akan menjadikan akun <strong>{{ memberName }}</strong> sebagai <strong>Administrator</strong>
        <br>
        Ketikkan Kata Sandi untuk konfirmasi.
      </p>
      <form
        class="flex flex-col flex-grow"
        @submit.prevent="submitForm"
      >
        <div class="flex flex-col flex-grow">
          <label
            for="password"
            class="text-xs font-medium text-blue-gray-800 italic mb-1"
          >
            *Kata sandi yang dimasukkan adalah kata sandi group admin
          </label>
          <div
            class="border border-gray-500 rounded-lg overflow-hidden flex items-stretch focus-within:border-green-700"
            :class="[isError ? 'bg-red-50 border border-red-600' : 'bg-white']"
          >
            <input
              id="password"
              v-model="password"
              :type="passwordType"
              placeholder="Masukkan kata sandi"
              class="text-sm placeholder:text-gray-600 p-2 w-full focus:outline-none"
              :class="[isError ? 'bg-red-50' : 'bg-white ']"
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
            v-show="isError"
            class="text-red-600 text-xs mt-1"
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
          :disabled="!isFormValid"
          @click="submitForm"
        >
          <JdsSpinner
            v-show="isLoading"
            size="16px"
          />
          Jadikan Administrator
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import BaseModal from '@/common/components/BaseModal';
import BaseButton from '@/common/components/BaseButton';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const userRepository = RepositoryFactory.get('user');

export default {
  name: 'SetAdminModal',
  components: {
    BaseModal,
    BaseButton,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
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
      isPasswordIconVisible: false,
      isPasswordInputVisible: false,
      passwordType: 'password',
      passwordIconName: 'eye',
    };
  },
  computed: {
    isFormValid() {
      return this.password !== '';
    },
  },
  watch: {
    password() {
      this.isPasswordIconVisible = this.password !== '';
    },
  },
  methods: {
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
      this.password = '';
      this.isError = false;
    },
    submitForm() {
      if (this.isFormValid && !this.isLoading) {
        this.handleSetAdmin();
      }
    },
    async handleSetAdmin() {
      try {
        this.isLoading = true;
        await userRepository.setAdmin(this.id, this.password);
        this.closeModal();
        this.$emit('success:action');
        this.$toast({ type: 'success', message: 'Keanggotaan akun berhasil diubah' });
      } catch (error) {
        if (error.response?.status === 422) {
          this.isError = true;
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
