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
        <CreateAccountForm />
      </main>
    </div>
  </div>
</template>

<script>
import { RepositoryFactory } from '@/repositories/RepositoryFactory';
import HomeIcon from '@/assets/icons/home.svg?inline';
import CreateAccountForm from '@/components/CreateAccount/Form';

const registrationRepository = RepositoryFactory.get('registration');

export default {
  name: 'CreateAccount',
  components: {
    HomeIcon,
    CreateAccountForm,
  },
  async beforeRouteEnter(to, from, next) {
    const token = to.query?.token || null;

    try {
      if (!token) {
        next('/');
      } else {
        await registrationRepository.authorizeInvitationToken(token);
        next();
      }
    } catch (error) {
      next('/');
    }
  },
  data() {
    return {
      portalJabarUrl: process.env.VUE_APP_PORTAL_JABAR_URL,
      token: this.$route.query.token || null,
    };
  },
};
</script>
