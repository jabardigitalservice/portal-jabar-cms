<template>
  <main class="space-y-4 pb-4">
    <PersonalInformationSection />
    <NotificationSection />
  </main>
</template>

<script>
import PersonalInformationSection from './PersonalInformationSection';
import NotificationSection from './NotificationSection';

export default {
  name: 'AccountSettings',
  components: {
    PersonalInformationSection,
    NotificationSection,
  },
};
</script>
