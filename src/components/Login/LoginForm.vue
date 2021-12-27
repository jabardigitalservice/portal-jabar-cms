<template>
  <section class="p-8 bg-white rounded-xl">
    <h2 class="text-green-700 text-2xl font-medium mb-3">
      Login
    </h2>
    <p class="text-xs text-gray-700 leading-5 mb-5">
      Selamat Datang! Silakan masukkan email dan kata sandi untuk masuk ke Portal Jabar Content Management System.
    </p>
    <div v-if="isError">
      <JdsSectionMessage
        :show="isError"
        variant="error"
        dismissible
        :message="error.message"
        class="mb-5"
        @click:close="resetForm"
      />
    </div>
    <form @submit.prevent="onSubmit">
      <div class="flex flex-col gap-1 mb-5">
        <label
          for="email"
          class="text-gray-800 text-[15px] italic"
        >
          E-mail
        </label>
        <div class="border border-gray-500 rounded-lg overflow-hidden flex items-stretch focus-within:border-green-700">
          <div class="bg-gray-100 p-2 border-r border-gray-200 flex justify-center items-center">
            <img src="@/assets/icons/mail.svg">
          </div>
          <input
            id="email"
            ref="email-input"
            v-model.trim="email"
            type="email"
            placeholder="Contoh: agus.permadi@gmail.com"
            :disabled="isError"
            class="text-sm placeholder:text-gray-600 p-2 w-full bg-white focus:outline-none"
            :class="{'cursor-not-allowed': isError}"
          >
        </div>
      </div>
      <div class="flex flex-col gap-1 mb-4">
        <label
          for="password"
          class="text-gray-800 text-[15px]"
        >
          Kata Sandi
        </label>
        <div class="border border-gray-500 rounded-lg overflow-hidden flex items-stretch focus-within:border-green-700">
          <div class="bg-gray-100 p-2 border-r border-gray-200 flex justify-center items-center">
            <img src="@/assets/icons/key.svg">
          </div>
          <input
            id="password"
            ref="password-input"
            v-model.trim="password"
            :type="passwordInputType"
            placeholder="Masukkan kata sandi"
            :disabled="isError"
            class="text-sm placeholder:text-gray-600 p-2 w-full bg-white focus:outline-none"
            :class="{'cursor-not-allowed': isError}"
          >
          <div
            v-show="showPasswordIcon"
            class="p-2 flex justify-center items-center cursor-pointer"
            @click="toggleShowPasswordInput"
          >
            <JdsIcon
              :name="passwordIconName"
              size="16px"
            />
          </div>
        </div>
      </div>
      <div class="w-full text-right">
        <router-link
          ref="forgot-password-link"
          to="#"
          role="link"
          class="text-[#1E88E5] inline-block mb-6 text-sm"
        >
          Lupa kata sandi?
        </router-link>
      </div>
      <button
        v-if="!isLoading"
        ref="login-button"
        type="submit"
        :disabled="!isValidInput || isError"
        class="rounded-lg text-sm py-[9px] w-full font-bold leading-6 uppercase focus:outline-none"
        :class="[ isValidInput && !isError ? 'text-white bg-green-700 hover:bg-green-800' : 'text-gray-500 bg-gray-200 cursor-not-allowed']"
      >
        Masuk
      </button>
      <button
        v-else
        ref="login-button"
        type="submit"
        :disabled="!isValidInput"
        class="flex justify-between items-center text-gray-500 bg-gray-200 rounded-lg text-sm px-4 py-[9px] w-full font-bold leading-6 focus:outline-none"
      >
        Mengecek Akun
        <JdsSpinner
          v-show="isLoading"
          size="16px"
        />
      </button>
    </form>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
      showPasswordInput: false,
      loading: false,
      error: null,
    };
  },
  computed: {
    showPasswordIcon() {
      return this.password !== '';
    },
    passwordInputType() {
      return this.showPasswordInput ? 'text' : 'password';
    },
    passwordIconName() {
      return this.showPasswordInput ? 'eye-off' : 'eye';
    },
    isError() {
      return !!this.error;
    },
    isLoading() {
      return this.loading;
    },
    isValidInput() {
      return this.email !== '' && this.isValidEmail(this.email) && this.password !== '';
    },
  },
  methods: {
    ...mapActions({
      login: 'auth/login',
    }),
    isValidEmail(email) {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(email);
    },
    toggleShowPasswordInput() {
      this.showPasswordInput = !this.showPasswordInput;
    },
    resetForm() {
      this.error = null;
      this.email = '';
      this.password = '';
    },
    async onSubmit() {
      try {
        this.loading = true;
        await this.login({ email: this.email, password: this.password });
        this.$router.push({ path: '/' });
      } catch (error) {
        this.error = { message: error.message };
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
