<template>
  <section class="px-6 py-4 bg-white rounded-lg">
    <h2 class="text-xl text-green-700 font-medium">
      Pengajuan Anggota
    </h2>
    <div class="flex justify-between items-center py-4 gap-4">
      <div class="flex flex-col flex-grow gap-3">
        <p class="font-lato text-sm text-blue-gray-800">
          Saat ini akun Anda merupakan <span class="font-bold">Administrator</span> untuk <span class="font-bold">Dinas Pemberdayaan Perempuan Perlindungan Anak dan Keluarga</span>.
        </p>
        <div class="flex gap-6 items-center">
          <BaseButton
            class="border-green-700 hover:bg-green-50 text-sm text-green-700"
            @click="openMemberInvitationModal"
          >
            Undang Anggota Baru
          </BaseButton>
          <a
            href="#"
            class="font-lato text-sm text-blue-700 underline hover:text-blue-800"
          >
            Pelajari lebih lanjut tentang akun Anda
          </a>
        </div>
      </div>
    </div>
    <!-- Member invitation modal -->
    <BaseModal :open="isMemberInvitationModalOpen">
      <div class="w-full">
        <h1 class="font-roboto font-medium text-green-700 text-[21px] leading-[34px] mb-4">
          Pengajuan Anggota
        </h1>
        <p class="text-sm leading-6 text-blue-gray-800">
          Masukkan alamat email yang ingin Anda undang ke tim
        </p>
        <p class="text-sm leading-6 text-blue-gray-800 mb-5 font-bold">
          Dinas Pemberdayaan Perempuan Perlindungan Anak dan Keluarga
        </p>
        <div
          class="flex flex-col flex-grow gap-2"
        >
          <label
            for="email"
            class="text-blue-gray-800 text-sm font-medium"
          >
            Masukkan email anggota yang belum terdaftar
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="focus:outline-none focus:border-green-700 border border-gray-400 p-2 rounded-md font-lato text-sm text-blue-gray-800"
            placeholder="Masukkan alamat email"
          >
        </div>
      </div>
      <template #footer>
        <div class="flex w-full h-full items-center justify-end gap-4">
          <BaseButton
            class="border-green-700 hover:bg-green-50 text-sm text-green-700"
            @click="closeMemberInvitationModal"
          >
            Batal
          </BaseButton>
          <BaseButton
            class="bg-green-700 hover:bg-green-600 text-sm text-white"
            :disabled="!isValidEmail"
            @click="sendInvitation"
          >
            Kirim
          </BaseButton>
        </div>
      </template>
    </BaseModal>
  </section>
</template>

<script>
import BaseButton from '@/common/components/BaseButton';
import BaseModal from '@/common/components/BaseModal';
import { isValidEmail } from '@/common/helpers/validation';

export default {
  name: 'MemberInvitationSection',
  components: {
    BaseButton,
    BaseModal,
  },
  data() {
    return {
      email: '',
      isMemberInvitationModalOpen: false,
      isValidEmail: false,
    };
  },
  watch: {
    email() {
      this.isValidEmail = isValidEmail(this.email);
    },
  },
  methods: {
    openMemberInvitationModal() {
      this.isMemberInvitationModalOpen = true;
    },
    closeMemberInvitationModal() {
      this.email = '';
      this.isMemberInvitationModalOpen = false;
    },
    sendInvitation() {
      // TODO: submit the request
    },
  },
};
</script>
