<template>
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
        @update:pagination="onUpdatePagination($event)"
      />
    </div>
  </section>
</template>

<script>
import MemberTable from '@/components/Settings/Member/ListSection/MemberTable';
import { formatDate } from '@/common/helpers/date.js';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const userRepository = RepositoryFactory.get('user');

export default {
  name: 'MemberListSection',
  components: {
    MemberTable,
  },
  data() {
    return {
      loading: false,
      members: [],
      meta: {
        total_count: 3,
        total_page: 1,
        current_page: 1,
        per_page: 10,
      },
      params: {
        per_page: 10,
        page: 1,
      },
    };
  },
  computed: {
    items() {
      if (Array.isArray(this.members) && !!this.members.length) {
        const items = this.members.map((member) => ({
          ...member,
          last_active: member.last_active ? formatDate(member.last_active, 'dd/MM/yyyy - HH:mm') : null,
        }));

        return items;
      }

      return [];
    },
  },
  mounted() {
    this.fetchMembers();
  },
  methods: {
    async fetchMembers() {
      try {
        this.loading = true;

        const response = await userRepository.getMemberList(this.params);
        const { data, meta } = response.data;

        this.members = data;
        this.meta = meta;
      } catch (error) {
        this.$toast({
          type: 'error',
          message: 'Gagal mendapatkan data Member, silakan coba beberapa saat lagi',
        });
      } finally {
        this.loading = false;
      }
    },

    setParams(data) {
      const newParams = { ...this.params, ...data };
      this.params = { ...newParams };
    },

    onUpdatePagination(data) {
      this.setParams(data);
      this.fetchMembers();
    },
  },
};
</script>
