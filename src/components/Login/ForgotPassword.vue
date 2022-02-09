<template>
  <BaseModal :open="open">
    <div class="w-full h-full px-2 pb-4">
      <h1 class="font-roboto font-medium text-green-700 text-[21px] leading-[34px] mb-6">
        Lupa Kata Sandi
      </h1>
      <div class="flex gap-8">
        <div class="w-[68px] h-[55px]">
          <img
            src="@/assets/icons/mailbox.svg"
            alt="Mailbox"
            width="68"
            height="55"
          >
        </div>
        <div
          v-if="!success"
          class="max-w-sm"
        >
          <p class="text-sm leading-6 to-blue-gray-800 mb-4">
            Masukkan alamat email Anda agar dapat kami kirimkan tautan untuk dapat merubah kata sandi.
          </p>
          <div v-if="isError">
            <JdsSectionMessage
              :show="isError"
              variant="error"
              dismissible
              :message="error.message"
              class="mb-5"
              @click:close="closeErrorMessage"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label
              for="email"
              class="text-gray-800 text-[15px]"
            >
              Email
            </label>
            <div
              class="border rounded-lg overflow-hidden flex items-stretch focus-within:border-green-700"
              :class="[isError ? 'border-red-500' : 'border-gray-500']"
            >
              <div class="bg-gray-100 p-2 border-r border-gray-200 flex justify-center items-center">
                <MailIcon
                  width="16"
                  height="16"
                  class="fill-red-700"
                />
              </div>
              <input
                id="email"
                ref="email-input"
                v-model.trim="email"
                type="email"
                placeholder="Contoh: agus.permadi@gmail.com"
                class="text-sm placeholder:text-gray-600 p-2 w-full bg-white focus:outline-none"
              >
            </div>
          </div>
        </div>
        <div
          v-else
          class="max-w-sm"
        >
          <p class="text-sm leading-6 to-blue-gray-800 mb-4">
            Terima kasih telah memasukkan alamat email Anda. Kami telah mengirimkan tautan verifikasi ke <span class="text-[#1E88E5]">{{ email }}</span>
          </p>
        </div>
      </div>
    </div>
    <template #footer>
      <div
        v-if="!success"
        class="flex w-full h-full items-center justify-end gap-4 p-2"
      >
        <BaseButton
          class="border-green-700 hover:bg-green-50 text-sm text-green-700"
          @click="onClose"
        >
          Batal
        </BaseButton>
        <BaseButton
          class="bg-green-700 hover:bg-green-600 text-sm text-white"
          @click="onSubmit"
        >
          Kirim
        </BaseButton>
      </div>
      <div
        v-else
        class="flex w-full h-full items-center justify-center gap-4 p-2"
      >
        <BaseButton
          class="bg-green-700 hover:bg-green-600 text-sm text-white"
          @click="onClose()"
        >
          Saya Mengerti
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import BaseModal from '@/common/components/BaseModal';
import BaseButton from '@/common/components/BaseButton';
import MailIcon from '@/assets/icons/mail.svg?inline';

export default {
  name: 'ForgotPassword',
  components: {
    BaseModal,
    BaseButton,
    MailIcon,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      email: '',
      error: null,
      success: false,
    };
  },
  computed: {
    isValidInput() {
      return this.email !== '' && this.isValidEmail(this.email);
    },
    isError() {
      return !!this.error;
    },
  },
  methods: {
    onClose() {
      this.success = false;
      this.email = '';
      this.$emit('close');
    },
    onSubmit() {
      if (!this.isValidInput) {
        this.error = { message: 'Email belum dimasukkan' };
      } else {
        try {
          // TODO: Send request
          this.success = true;
        } catch (error) {
          this.error = { message: error.message };
        }
      }
    },
    isValidEmail(email) {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(email);
    },
    closeErrorMessage() {
      this.error = null;
    },
  },
};
</script>
