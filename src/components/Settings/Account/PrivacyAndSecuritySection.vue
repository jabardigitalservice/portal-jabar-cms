<template>
  <section class="px-6 py-4 bg-white rounded-lg">
    <h2 class="text-xl text-green-700 font-medium">
      Privasi dan Keamanan
    </h2>
    <div class="flex justify-between border-b border-gray-200 items-center py-4">
      <div class="flex flex-col flex-grow gap-2">
        <p class="text-blue-gray-300">
          Kata Sandi
        </p>
        <p class="font-lato text-sm text-blue-gray-800">
          Gunakan kata sandi yang unik untuk melindungi akun Anda
        </p>
        <p class="font-lato text-xs text-blue-gray-200">
          Terakhir diubah: 3 Mei 2020
        </p>
      </div>
      <BaseButton
        class="text-green-700 border-none font-normal"
        @click="togglePrompt"
      >
        <template #icon-left>
          <JdsIcon
            name="pencil"
            size="xs"
          />
        </template>
        Ubah Kata Sandi
      </BaseButton>
    </div>
    <div class="flex justify-between items-center py-4">
      <div class="flex flex-col flex-grow gap-2">
        <p class="text-blue-gray-300">
          Ketentuan Privasi
        </p>
        <a
          href="#"
          class="font-lato text-sm text-blue-700 underline"
        >
          Lihat ketentuan privasi akun Portal Jabar
        </a>
      </div>
    </div>
    <BaseModal :open="isPromptOpen">
      <div class="w-full h-full">
        <h1 class="font-roboto text-xl leading-8 font-medium text-green-700 mb-6 text-blue-gray-800">
          Ubah Kata Sandi
        </h1>
        <p class="font-lato text-sm text-blue-gray-800 mb-4">
          Masukkan kata sandi baru untuk keamanan akun Anda.
        </p>
        <div class="flex flex-col flex-grow gap-2 mb-4">
          <label
            for="currentPassword"
            class="text-blue-gray-800"
          >
            Kata Sandi Lama
          </label>
          <div class="border border-gray-500 rounded-lg overflow-hidden flex items-stretch focus-within:border-green-700">
            <input
              id="currentPassword"
              v-model.trim="currentPassword"
              :type="passwordInputType['currentPassword']"
              placeholder="Masukkan kata sandi lama"
              class="text-sm placeholder:text-gray-600 p-2 w-full bg-white focus:outline-none"
            >
            <div
              v-show="isPasswordIconVisible['currentPassword']"
              class="p-2 flex justify-center items-center cursor-pointer"
              @click="togglePasswordInputVisibility('currentPassword')"
            >
              <JdsIcon
                :name="passwordIconName['currentPassword']"
                size="16px"
              />
            </div>
          </div>
          <p
            v-show="validationMessage.name === 'currentPassword'"
            class="text-red-600 text-sm"
          >
            {{ validationMessage.body }}
          </p>
        </div>
        <div class="flex flex-col flex-grow gap-2 mb-4">
          <label
            for="newPassword"
            class="text-blue-gray-800"
          >
            Kata Sandi Baru
          </label>
          <div class="border border-gray-500 rounded-lg overflow-hidden flex items-stretch focus-within:border-green-700">
            <input
              id="newPassword"
              v-model.trim="newPassword"
              :type="passwordInputType['newPassword']"
              placeholder="Masukkan kata sandi baru"
              class="text-sm placeholder:text-gray-600 p-2 w-full bg-white focus:outline-none"
            >
            <div
              v-show="isPasswordIconVisible['newPassword']"
              class="p-2 flex justify-center items-center cursor-pointer"
              @click="togglePasswordInputVisibility('newPassword')"
            >
              <JdsIcon
                :name="passwordIconName['newPassword']"
                size="16px"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-col flex-grow gap-2">
          <label
            for="newPasswordConfirmation"
            class="text-blue-gray-800"
          >
            Ulangi Kata Sandi Baru
          </label>
          <div class="border border-gray-500 rounded-lg overflow-hidden flex items-stretch focus-within:border-green-700">
            <input
              id="newPasswordConfirmation"
              v-model.trim="newPasswordConfirmation"
              :type="passwordInputType['newPasswordConfirmation']"
              placeholder="Ulangi kata sandi baru"
              class="text-sm placeholder:text-gray-600 p-2 w-full bg-white focus:outline-none"
            >
            <div
              v-show="isPasswordIconVisible['newPasswordConfirmation']"
              class="p-2 flex justify-center items-center cursor-pointer"
              @click="togglePasswordInputVisibility('newPasswordConfirmation')"
            >
              <JdsIcon
                :name="passwordIconName['newPasswordConfirmation']"
                size="16px"
              />
            </div>
          </div>
          <p
            v-show="validationMessage.name === 'newPasswordConfirmation'"
            class="text-red-600 text-sm"
          >
            {{ validationMessage.body }}
          </p>
        </div>
      </div>
      <template #footer>
        <div class="flex gap-4 justify-end">
          <BaseButton
            class="border-green-700 hover:bg-green-50 text-sm text-green-700"
            @click="togglePrompt"
          >
            Batal
          </BaseButton>
          <BaseButton
            class="bg-green-700 hover:bg-green-800 text-sm text-white"
            :disabled="!isFormValid"
            @click="onSubmit"
          >
            Simpan Perubahan
          </BaseButton>
        </div>
      </template>
    </BaseModal>
  </section>
</template>

<script>
import BaseButton from '@/common/components/BaseButton';
import BaseModal from '@/common/components/BaseModal';

export default {
  name: 'PrivacyAndSecuritySection',
  components: {
    BaseButton,
    BaseModal,
  },
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirmation: '',
      isPromptOpen: false,
      isPasswordInputVisible: {
        currentPassword: false,
        newPassword: false,
        newPasswordConfirmation: false,
      },
      isPasswordIconVisible: {
        currentPassword: false,
        newPassword: false,
        newPasswordConfirmation: false,
      },
      passwordInputType: {
        currentPassword: 'password',
        newPassword: 'password',
        newPasswordConfirmation: 'password',
      },
      passwordIconName: {
        currentPassword: 'eye',
        newPassword: 'eye',
        newPasswordConfirmation: 'eye',
      },
      validationMessage: {
        name: '',
        body: '',
      },
    };
  },
  computed: {
    isFormValid() {
      const isPasswordEmpty = this.isEmpty(this.currentPassword) || this.isEmpty(this.newPassword) || this.isEmpty(this.newPasswordConfirmation);
      const isPasswordValid = this.isPasswordValid(this.newPassword) && this.isPasswordValid(this.newPasswordConfirmation);

      return !isPasswordEmpty && isPasswordValid;
    },
  },
  watch: {
    currentPassword() {
      this.setPasswordIconVisibility('currentPassword', this.currentPassword !== '');
    },
    newPassword() {
      this.setPasswordIconVisibility('newPassword', this.newPassword !== '');
    },
    newPasswordConfirmation() {
      this.setPasswordIconVisibility('newPasswordConfirmation', this.newPasswordConfirmation !== '');
    },
  },
  methods: {
    togglePrompt() {
      this.clearValidationMessage();
      this.clearPasswordInput();
      this.isPromptOpen = !this.isPromptOpen;
    },
    setPasswordIconVisibility(name, value) {
      this.isPasswordIconVisible[name] = value;
    },
    togglePasswordInputVisibility(name) {
      this.isPasswordInputVisible[name] = !this.isPasswordInputVisible[name];
      this.passwordInputType[name] = this.isPasswordInputVisible[name] ? 'text' : 'password';
      this.passwordIconName[name] = this.isPasswordInputVisible[name] ? 'eye-off' : 'eye';
    },
    checkPasswordStrength(string) {
      // contain at least 1 lowercase alphabetical character
      const isContainLowerCase = /(?=.*[a-z])/.test(string);
      // contain at least 1 uppercase alphabetical character
      const isContainUpperCase = /(?=.*[A-Z])/.test(string);
      // contain at least 1 numeric character
      const isContainNumber = /(?=.*[0-9])/.test(string);
      // contain at least 1 special character
      const isContainSymbol = /(?=.*[!@#$%^&*])/.test(string);

      if (isContainLowerCase && isContainUpperCase && isContainNumber && isContainSymbol) {
        return 'strong';
      }

      if ((isContainLowerCase || isContainUpperCase) && isContainNumber) {
        return 'medium';
      }

      return 'low';
    },
    isEmpty(string) {
      return string === '';
    },
    isPasswordValid(password) {
      /**
       * the password must contain at least 6 characters
       * with medium or strong password strength
       */
      const passwordStrength = this.checkPasswordStrength(password);

      return password.length >= 6 && (passwordStrength === 'medium' || passwordStrength === 'strong');
    },
    isPasswordMatch(firstPassword, secondPassword) {
      return firstPassword === secondPassword;
    },
    clearPasswordInput() {
      this.currentPassword = '';
      this.newPassword = '';
      this.newPasswordConfirmation = '';
    },
    setValidationMessage(name, body) {
      this.validationMessage = { name, body };
    },
    clearValidationMessage() {
      this.validationMessage = {
        name: '',
        body: '',
      };
    },
    onSubmit() {
      if (!this.isFormValid) return;
      if (!this.isPasswordMatch(this.newPassword, this.newPasswordConfirmation)) {
        this.setValidationMessage('newPasswordConfirmation', 'Kata sandi tidak sama');
        return;
      }
      this.updatePassword();
    },
    async updatePassword() {
      try {
        // todo: update new password
      } catch (error) {
        // todo: set error on input if current password not match with the status code 422
        // todo: set global error if the status code is other than 422
      }
    },
  },
};
</script>
