<template>
  <div class="h-screen bg-hero bg-bottom bg-no-repeat bg-cover">
    <div class="h-full relative top-0 bg-pattern bg-left-top bg-no-repeat bg-contain">
      <header class="flex justify-center items-center h-20 bg-black bg-opacity-10 backdrop-filter backdrop-blur-lg">
        <nav
          ref="navigation"
          class="container mx-auto px-6 flex justify-between items-center"
        >
          <img
            ref="navigation-logo"
            src="@/assets/logo.svg"
            alt="Portal Jabar Logo"
            width="125"
          >
          <a
            ref="navigation-link"
            :href="portalJabarUrl"
            target="_blank"
            rel="noreferrer"
            class="flex items-center gap-3 text-white"
          >
            Ke Beranda
            <img src="@/assets/icons/home.svg">
          </a>
        </nav>
      </header>
      <main class="container mx-auto px-6 grid grid-cols-3 items-center h-[calc(100%-80px)]">
        <section class="col-span-2 max-w-2xl">
          <h1 class="font-lora text-[42px] font-bold text-white uppercase">
            Portal Jabar
          </h1>
          <h2 class="font-lora text-2xl font-medium text-white mb-6 uppercase">
            Content Management System
          </h2>
          <p class="text-white leading-7">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore hic quia dolore vitae impedit assumenda? Voluptas voluptatum labore laboriosam! Iure optio eveniet quis? Odit veritatis dignissimos iste. Suscipit, nulla iusto!
          </p>
        </section>
        <LoginForm />
      </main>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/Login/LoginForm';

export default {
  name: 'Login',
  components: {
    LoginForm,
  },
  data() {
    return {
      portalJabarUrl: process.env.VUE_APP_PORTAL_JABAR_URL,
    };
  },
};
</script>
