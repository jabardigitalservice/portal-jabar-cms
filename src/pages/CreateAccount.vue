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
      <main>
        <!-- TODO: Add create account form -->
      </main>
    </div>
  </div>
</template>

<script>
import { RepositoryFactory } from '@/repositories/RepositoryFactory';
import HomeIcon from '@/assets/icons/home.svg?inline';

const registrationRepository = RepositoryFactory.get('registration');

export default {
  name: 'CreateAccount',
  components: {
    HomeIcon,
  },
  async beforeRouteEnter(to, from, next) {
    const { token } = to.query || null;

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
  computed: {
    token() {
      return this.$route.query.token || null;
    },
  },
};
</script>
