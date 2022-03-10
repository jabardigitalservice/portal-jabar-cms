<template>
  <main class="space-y-4 pb-4">
    <PersonalInformationSection />
    <NotificationSection />
    <PrivacyAndSecuritySection />
  </main>
</template>

<script>
import PersonalInformationSection from './PersonalInformationSection';
import NotificationSection from './NotificationSection';
import PrivacyAndSecuritySection from './PrivacyAndSecuritySection';

export default {
  name: 'AccountSettings',
  components: {
    PersonalInformationSection,
    NotificationSection,
    PrivacyAndSecuritySection,
  },
};
</script>
