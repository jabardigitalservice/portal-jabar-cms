<template>
  <main class="space-y-4 pb-4">
    <PersonalInformationSection />
    <NotificationSection />
    <PrivacyAndSecuritySection />
    <Restricted permission="user.request-to-be-admin">
      <RequestUpgradeRoleSection />
    </Restricted>
  </main>
</template>

<script>
import PersonalInformationSection from './PersonalInformationSection';
import NotificationSection from './NotificationSection';
import PrivacyAndSecuritySection from './PrivacyAndSecuritySection';
import RequestUpgradeRoleSection from './RequestUpgradeRoleSection';
import Restricted from '@/common/components/Restricted';

export default {
  name: 'AccountSettings',
  components: {
    PersonalInformationSection,
    NotificationSection,
    PrivacyAndSecuritySection,
    RequestUpgradeRoleSection,
    Restricted,
  },
};
</script>
