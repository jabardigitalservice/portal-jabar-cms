<template>
  <main class="w-full pb-20">
    <HeaderMenu>
      <div class="min-w-0 flex gap-3">
        <!-- TODO: Add action on button clicked -->
        <BaseButton class="text-sm text-green-700 border-green-700 hover:bg-green-50">
          Ubah Email
        </BaseButton>
        <!-- TODO: Add action on button clicked -->
        <BaseButton
          class="text-sm text-green-700 border-green-700 hover:bg-green-50"
          @click="toggleDeactivateMemberModal"
        >
          Nonaktifkan Akun
        </BaseButton>
        <!-- TODO: Add action on button clicked -->
        <BaseButton class="text-sm bg-green-700 hover:bg-green-600 text-white">
          <template #icon-left>
            <UserAdminIcon class="w-5 h-5 fill-white" />
          </template>
          Jadikan Admin
        </BaseButton>
      </div>
    </HeaderMenu>
    <section class="px-6 py-4 rounded-lg bg-white mb-4">
      <div class="rounded-lg overflow-hidden border border-gray-200">
        <JdsSimpleTable class="!table-auto">
          <thead>
            <tr>
              <th
                colspan="2"
                class="!font-roboto !text-sm"
              >
                Detail Akun
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="detail in memberDetail"
              :key="detail.label"
            >
              <td class="min-w-[228px] font-lato leading-6 text-blue-gray-500 font-bold text-sm">
                {{ detail.label }}
              </td>
              <td class="w-full font-lato leading-6 text-blue-gray-800 text-sm">
                {{ detail.value }}
              </td>
            </tr>
          </tbody>
        </JdsSimpleTable>
      </div>
    </section>
    <DeactivateMemberModal
      :open="isDeactivateMemberModalOpen"
      @close="toggleDeactivateMemberModal"
    />
  </main>
</template>

<script>
import HeaderMenu from '@/common/components/HeaderMenu';
import BaseButton from '@/common/components/BaseButton';
import DeactivateMemberModal from '@/components/Settings/Member/DeactivateMemberModal';
import { formatDate } from '@/common/helpers/date.js';
import UserAdminIcon from '@/assets/icons/user-admin.svg?inline';

export default {
  name: 'MemberDetail',
  components: {
    HeaderMenu,
    BaseButton,
    UserAdminIcon,
    DeactivateMemberModal,
  },
  data() {
    return {
      member: {},
      isDeactivateMemberModalOpen: false,
    };
  },
  computed: {
    memberDetail() {
      // TODO: change default value to null
      return {
        name: {
          label: 'Nama',
          value: this.member?.name || 'Asep Sanusi',
        },
        occupation: {
          label: 'Jabatan',
          value: this.member?.occupation || 'Kepala Divisi',
        },
        nip: {
          label: 'NIP',
          value: this.member?.nip || '123456 123456 1 001',
        },
        role: {
          label: 'Role/Keanggotaan',
          value: this.member?.role || 'Administrator',
        },
        email: {
          label: 'Email',
          value: this.member?.email || 'asep@sanusi.com',
        },
        status: {
          label: 'Status',
          value: this.member?.status || 'Aktif',
        },
        last_active: {
          label: 'Terakhir Aktif',
          value: this.member?.last_active || formatDate(new Date(), 'dd/MM/yyyy - HH:mm'),
        },
      };
    },
  },
  methods: {
    toggleDeactivateMemberModal() {
      this.isDeactivateMemberModalOpen = !this.isDeactivateMemberModalOpen;
    },
  },

};
</script>
