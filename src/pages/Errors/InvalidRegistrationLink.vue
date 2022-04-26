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
            <HomeIcon class="w-5 h-5 fill-white" />
          </a>
        </nav>
      </header>
      <main class="h-full -m-20 flex justify-center items-center">
        <section
          class="bg-white rounded-xl flex flex-col w-[576px] h-[317px] items-center justify-center p-8"
        >
          <img
            src="@/assets/icons/mailbox.svg"
            alt="mail box illustration"
            width="99"
            height="81"
            class="mb-4"
          >
          <h1 class="font-lora text-green-700 text-xl text-center font-bold leading-8 mb-2">
            Link Anda Tidak Valid
          </h1>
          <p class="text-blue-gray-800 text-sm leading-6 text-center">
            Sepertinya link untuk pendaftaran anggota Anda salah atau sudah tidak valid.
            <br>
            Untuk informasi lebih lanjut silakan menghubungi <strong>Group Administrator OPD</strong> Anda.
          </p>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
import HomeIcon from '@/assets/icons/home.svg?inline';

export default {
  name: 'InvalidRegistrationLink',
  components: {
    HomeIcon,
  },
  data() {
    return {
      portalJabarUrl: process.env.VUE_APP_PORTAL_JABAR_URL,
    };
  },

};
</script>
