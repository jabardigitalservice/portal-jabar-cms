<template>
  <main class="w-full pb-20">
    <HeaderMenu>
      <div
        v-if="hasMember && !isPending"
        class="min-w-0 flex gap-3"
      >
        <!-- TODO: Add action on button clicked -->
        <BaseButton
          class="text-sm text-green-700 border-green-700 hover:bg-green-50"
          @click="toggleChangeEmailModal"
        >
          Ubah Email
        </BaseButton>
        <!-- TODO: Add action on button clicked -->
        <BaseButton
          class="text-sm text-green-700 border-green-700 hover:bg-green-50"
          @click="toggleDeactivateMemberModal"
        >
          Nonaktifkan Akun
        </BaseButton>
        <BaseButton
          v-if="isContributor"
          class="text-sm bg-green-700 hover:bg-green-600 text-white"
          @click="toggleSetAdminModal"
        >
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
                <div
                  v-show="loading"
                  class="h-4 w-1/3 rounded-lg animate-pulse bg-gray-200"
                />
                <div v-show="!loading">
                  {{ detail.value }}
                </div>
              </td>
            </tr>
          </tbody>
        </JdsSimpleTable>
      </div>
    </section>
    <DeactivateMemberModal
      :open="isDeactivateMemberModalOpen"
      :member-email="memberDetail.email.value"
      @close="toggleDeactivateMemberModal"
    />
    <ChangeEmailModal
      :open="isChangeEmailModalOpen"
      :member-name="memberDetail.name.value"
      :member-email="memberDetail.email.value"
      @close="toggleChangeEmailModal"
    />
    <SetAdminModal
      :id="member.id"
      :open="isSetAdminModalOpen"
      :member-name="memberDetail.name.value"
      @success:action="onSuccess"
      @close="toggleSetAdminModal"
    />
  </main>
</template>

<script>
import HeaderMenu from '@/common/components/HeaderMenu';
import BaseButton from '@/common/components/BaseButton';
import DeactivateMemberModal from '@/components/Settings/Member/DeactivateMemberModal';
import ChangeEmailModal from '@/components/Settings/Member/ChangeEmailModal';
import SetAdminModal from '@/components/Settings/Member/SetAdminModal';
import UserAdminIcon from '@/assets/icons/user-admin.svg?inline';
import { formatDate } from '@/common/helpers/date.js';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const userRepository = RepositoryFactory.get('user');

export default {
  name: 'MemberDetail',
  components: {
    HeaderMenu,
    BaseButton,
    UserAdminIcon,
    DeactivateMemberModal,
    ChangeEmailModal,
    SetAdminModal,
  },
  data() {
    return {
      member: {},
      loading: false,
      isDeactivateMemberModalOpen: false,
      isChangeEmailModalOpen: false,
      isSetAdminModalOpen: false,
    };
  },
  computed: {
    memberDetail() {
      return {
        name: {
          label: 'Nama',
          value: this.member.name,
        },
        occupation: {
          label: 'Jabatan',
          value: this.member.occupation,
        },
        nip: {
          label: 'NIP',
          value: this.member.nip,
        },
        role: {
          label: 'Role/Keanggotaan',
          value: this.member.role?.name || '',
        },
        email: {
          label: 'Email',
          value: this.member.email,
        },
        status: {
          label: 'Status',
          value: this.getStatusLabel(this.member.status),
        },
        last_active: {
          label: 'Terakhir Aktif',
          value: this.member.last_active
            ? formatDate(this.member.last_active, 'dd/MM/yyyy - HH:mm')
            : null,
        },
      };
    },
    hasMember() {
      return Object.keys(this.member).length > 0;
    },
    isPending() {
      return this.member.status === 'PENDING';
    },
    isContributor() {
      return this.member.role?.name === 'Contributor';
    },
  },
  created() {
    this.fetchMember();
  },
  methods: {
    async fetchMember() {
      try {
        this.loading = true;
        const { id } = this.$route.params;
        const response = await userRepository.getUserById(id);
        const { data } = response.data;

        this.member = data;
      } catch (error) {
        this.$toast({
          type: 'error',
          message: 'Gagal mendapatkan data Member, silakan coba beberapa saat lagi',
        });
      } finally {
        this.loading = false;
      }
    },
    getStatusLabel(status) {
      const statusMap = {
        ACTIVE: 'Aktif',
        INACTIVE: 'Tidak Aktif',
        PENDING: 'Menunggu Konfirmasi',
      };

      return statusMap[status] ?? null;
    },
    toggleDeactivateMemberModal() {
      this.isDeactivateMemberModalOpen = !this.isDeactivateMemberModalOpen;
    },
    toggleChangeEmailModal() {
      this.isChangeEmailModalOpen = !this.isChangeEmailModalOpen;
    },
    toggleSetAdminModal() {
      this.isSetAdminModalOpen = !this.isSetAdminModalOpen;
    },
    onSuccess() {
      this.fetchMember();
    },
  },
};
</script>
