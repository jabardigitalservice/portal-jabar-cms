<template>
  <main class="w-full pb-20 space-y-4">
    <MemberInvitationSection />
    <MemberListSection />
  </main>
</template>

<script>
import MemberInvitationSection from '@/components/Settings/Member/InvitationSection';
import MemberListSection from '@/components/Settings/Member/ListSection';

export default {
  name: 'MemberSettings',
  components: {
    MemberInvitationSection,
    MemberListSection,
  },
};
</script>
