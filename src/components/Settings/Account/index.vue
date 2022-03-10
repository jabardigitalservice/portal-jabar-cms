<template>
  <main class="space-y-4 pb-4">
    <PersonalInformationSection />
    <PrivacyAndSecuritySection />
  </main>
</template>

<script>
import PersonalInformationSection from './PersonalInformationSection';
import PrivacyAndSecuritySection from './PrivacyAndSecuritySection';

export default {
  name: 'AccountSettings',
  components: {
    PersonalInformationSection,
    PrivacyAndSecuritySection,
  },
};
</script>
