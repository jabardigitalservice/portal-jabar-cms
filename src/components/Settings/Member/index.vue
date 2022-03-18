<template>
  <main class="w-full pb-20">
    <section class="w-full px-6 py-4 bg-white rounded-lg">
      <h2 class="text-xl text-green-700 font-medium mb-4">
        Anggota Tim Anda
      </h2>
      <div class="w-full overflow-auto">
        <!-- TODO: Get table data from API -->
        <MemberTable
          :items="items"
          :loading="loading"
          :meta="meta"
          class="min-w-[1000px]"
        />
      </div>
    </section>
  </main>
</template>

<script>
import MemberTable from '@/components/Settings/Member/MemberTable';
import { formatDate } from '@/common/helpers/date.js';

export default {
  name: 'MemberSettings',
  components: {
    MemberTable,
  },
  data() {
    return {
      loading: false,
      // TODO: change this dummy data with actual data from API
      members: [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@doe.com',
          role: 'group admin',
          last_active: new Date(),
          status: 'Aktif',
        },
        {
          id: 2,
          name: 'John Smith',
          email: 'john@smith.com',
          role: 'group admin',
          last_active: new Date(),
          status: 'Aktif',
        },
        {
          id: 3,
          name: 'John Lennon',
          email: 'john@lennon.com',
          role: 'group admin',
          last_active: new Date(),
          status: 'Aktif',
        },
      ],
      // TODO: change this dummy data with actual data from API
      meta: {
        total_count: 3,
        total_page: 1,
        current_page: 1,
        per_page: 10,
      },
    };
  },
  computed: {
    items() {
      if (Array.isArray(this.members) && !!this.members.length) {
        const items = this.members.map((member) => ({
          id: member.id,
          name: member.name,
          email: member.email,
          role: member.role,
          last_active: formatDate(member.last_active, 'dd/MM/yyyy - HH:mm'),
          status: member.status,
        }));

        return items;
      }

      return [];
    },
  },
};
</script>
