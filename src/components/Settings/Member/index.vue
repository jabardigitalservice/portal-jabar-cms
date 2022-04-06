<template>
  <main class="w-full pb-20 space-y-4">
    <Restricted permission="user.invite">
      <MemberInvitationSection />
    </Restricted>
    <MemberListSection />
  </main>
</template>

<script>
import MemberInvitationSection from '@/components/Settings/Member/InvitationSection';
import MemberListSection from '@/components/Settings/Member/ListSection';
import Restricted from '@/common/components/Restricted';

export default {
  name: 'MemberSettings',
  components: {
    MemberInvitationSection,
    MemberListSection,
    Restricted,
  },
};
</script>
