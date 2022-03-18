<template>
  <main class="w-full pb-20">
    <MemberListSection />
  </main>
</template>

<script>
import MemberListSection from '@/components/Settings/Member/ListSection';

export default {
  name: 'MemberSettings',
  components: {
    MemberListSection,
  },
};
</script>
