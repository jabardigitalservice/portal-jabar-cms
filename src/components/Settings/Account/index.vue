<template>
  <main class="space-y-4 pb-4">
    <PersonalInformationSection />
    <NotificationSection />
    <PrivacyAndSecuritySection />
    <RequestUpgradeRoleSection />
  </main>
</template>

<script>
import PersonalInformationSection from './PersonalInformationSection';
import NotificationSection from './NotificationSection';
import PrivacyAndSecuritySection from './PrivacyAndSecuritySection';
import RequestUpgradeRoleSection from './RequestUpgradeRoleSection';

export default {
  name: 'AccountSettings',
  components: {
    PersonalInformationSection,
    NotificationSection,
    PrivacyAndSecuritySection,
    RequestUpgradeRoleSection,
  },
};
</script>
