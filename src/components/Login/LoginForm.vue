<template>
  <section class="p-8 bg-white rounded-xl">
    <h2 class="text-green-700 text-2xl font-medium mb-3">
      Login
    </h2>
    <p class="text-xs text-gray-700 leading-5 mb-7">
      Selamat Datang! Silakan masukkan email dan kata sandi untuk masuk ke Portal Jabar Content Management System.
    </p>
    <form>
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
            class="text-sm placeholder:text-gray-600 p-2 w-full focus:outline-none"
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
            class="text-sm placeholder:text-gray-600 p-2 w-full focus:outline-none"
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
        ref="login-button"
        type="button"
        class="bg-green-700 rounded-lg text-sm py-[9px] w-full text-white font-bold leading-6 hover:bg-green-800 uppercase focus:outline-none"
      >
        Masuk
      </button>
    </form>
  </section>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
      showPasswordInput: false,
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
  },
  methods: {
    toggleShowPasswordInput() {
      this.showPasswordInput = !this.showPasswordInput;
    },
  },
};
</script>
