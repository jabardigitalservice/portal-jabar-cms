<template>
  <main class="w-full h-full">
    <section class="w-full h-full flex flex-col items-center justify-center">
      <img
        src="@/assets/images/under-construction.svg"
        alt="ilustrasi halaman sedang dalam pengembangan"
        width="363px"
        height="229px"
        class="object-cover mb-8"
      >
      <h1 class="font-lora text-[21px] leading-[34px] text-green-700 font-bold mb-2">
        Oops, fitur ini sedang dalam tahap pengembangan
      </h1>
      <p class="font-lato text-sm text-blue-gray-800 leading-6 text-center">
        Silahkan menuju halaman lain untuk memanfaatkan<br>
        fitur di CMS Portal Jabar.
        <br>
      </p>
    </section>
  </main>
</template>

<script>
export default {
  name: 'Home',
};
</script>
