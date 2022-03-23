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
        <div class="flex flex-col flex-grow">
          <label
            for="email"
            class="text-sm font-medium mb-2"
            :class="[validationErrorMessage ? 'text-red-600' : 'text-blue-gray-800']"
          >
            Masukkan email anggota yang belum terdaftar
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="focus:outline-none border p-2 rounded-md font-lato text-sm text-blue-gray-800"
            :class="[validationErrorMessage ? 'bg-red-50 border-red-700' : 'bg-white border-gray-400 focus:border-green-700']"
            placeholder="Masukkan alamat email"
          >
          <p
            v-show="validationErrorMessage"
            class="text-red-600 text-xs mt-1"
          >
            {{ validationErrorMessage }}
          </p>
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
            :disabled="!isValidEmail || isLoading"
            @click="sendInvitation"
          >
            <JdsSpinner
              v-show="isLoading"
              size="16px"
            />
            Kirim
          </BaseButton>
        </div>
      </template>
    </BaseModal>
    <!-- Message modal -->
    <BaseModal :open="hasMessageModalContent">
      <div class="w-full p-2">
        <h1 class="font-roboto text-xl leading-8 font-medium text-green-700 mb-6">
          {{ messageModalContent.title }}
        </h1>
        <div class="flex gap-4">
          <JdsIcon
            :name="messageModalIconName"
            size="xs"
            class="self-start py-1"
            :class="messageModalIconClass"
          />
          <p class="font-lato text-sm text-blue-gray-800 mb-4 max-w-md">
            {{ messageModalContent.description }}
          </p>
        </div>
      </div>
      <template #footer>
        <div class="w-full h-full flex items-center justify-center">
          <BaseButton
            class="bg-green-700 hover:bg-green-600 text-sm text-white"
            @click="closeMessageModalContent"
          >
            Ok, saya mengerti
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
import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const registrationRepository = RepositoryFactory.get('registration');

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
      isLoading: false,
      validationErrorMessage: '',
      messageModalContent: {
        type: '',
        title: '',
        description: '',
      },
    };
  },
  computed: {
    hasMessageModalContent() {
      return !!this.messageModalContent.type;
    },
    messageModalIconName() {
      return this.messageModalContent.type === 'success' ? 'check-mark-circle' : 'times-circle';
    },
    messageModalIconClass() {
      return this.messageModalContent.type === 'success' ? 'text-green-700' : 'text-red-700';
    },
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
      this.validationErrorMessage = '';
      this.isMemberInvitationModalOpen = false;
    },
    setMessageModalContent(content) {
      this.messageModalContent.type = content.type;
      this.messageModalContent.title = content.title;
      this.messageModalContent.description = content.description;
    },
    closeMessageModalContent() {
      this.closeMemberInvitationModal();
      this.clearMessageModalContent();
    },
    clearMessageModalContent() {
      this.messageModalContent.type = '';
      this.messageModalContent.title = '';
      this.messageModalContent.description = '';
    },
    setValidationErrorMessage(message) {
      this.validationErrorMessage = message;
    },
    async sendInvitation() {
      this.isLoading = true;
      try {
        await registrationRepository.createInvitation({ email: this.email });
        this.setMessageModalContent({
          type: 'success',
          title: 'Anggota Berhasil Diundang!',
          description: `Link untuk anggota baru telah dikirimkan ke email: ${this.email}`,
        });
      } catch (error) {
        if (error.response) {
          this.setValidationErrorMessage('Email yang Anda masukkan sudah terdaftar sebagai anggota');
        } else {
          this.setMessageModalContent({
            type: 'error',
            title: 'Anggota Gagal Diundang!',
            description: 'Terjadi kesalahan saat melakukan pengajuan anggota',
          });
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
