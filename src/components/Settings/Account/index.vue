<template>
  <main class="space-y-4 pb-4">
    <PersonalInformationSection />
  </main>
</template>

<script>
import PersonalInformationSection from './PersonalInformationSection';

export default {
  name: 'AccountSettings',
  components: {
    PersonalInformationSection,
  },
};
</script>
