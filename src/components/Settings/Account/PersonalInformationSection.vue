<template>
  <div>
    <section class="px-6 py-4 bg-white rounded-lg">
      <h2 class="text-xl text-green-700 font-medium">
        Informasi Personal
      </h2>
      <div class="flex justify-between border-b border-gray-200 items-center py-4">
        <div class="flex flex-col flex-grow gap-2">
          <p class="text-blue-gray-300">
            Nama
          </p>
          <p class="font-lato text-sm text-blue-gray-800">
            {{ user.name || "-" }}
          </p>
        </div>
        <BaseButton
          class="text-green-700 border-none font-normal"
          @click="setPromptDetail('name')"
        >
          <template #icon-left>
            <JdsIcon
              name="pencil"
              size="xs"
            />
          </template>
          Ubah Nama
        </BaseButton>
      </div>
      <div class="flex justify-between border-b border-gray-200 items-center py-4">
        <div class="flex flex-col flex-grow gap-2">
          <p class="text-blue-gray-300">
            Jabatan
          </p>
          <p class="font-lato text-sm text-blue-gray-800">
            {{ user.occupation || "-" }}
          </p>
        </div>
        <BaseButton
          class="text-green-700 border-none font-normal"
          @click="setPromptDetail('occupation')"
        >
          <template #icon-left>
            <JdsIcon
              name="pencil"
              size="xs"
            />
          </template>
          Ubah Jabatan
        </BaseButton>
      </div>
      <div class="flex justify-between border-b border-gray-200 items-center py-4">
        <div class="flex flex-col flex-grow gap-2">
          <p class="text-blue-gray-300">
            NIP
          </p>
          <p class="font-lato text-sm text-blue-gray-800">
            {{ user.nip || "-" }}
          </p>
        </div>
      </div>
      <div class="flex justify-between border-b border-gray-200 items-center py-4">
        <div class="flex flex-col flex-grow gap-2">
          <p class="text-blue-gray-300">
            Role
          </p>
          <p class="font-lato text-sm text-blue-gray-800">
            {{ user.role.name || "-" }}
          </p>
        </div>
      </div>
      <div class="flex justify-between items-center py-4">
        <div class="flex flex-col flex-grow gap-2">
          <p class="text-blue-gray-300">
            Email
          </p>
          <p class="font-lato text-sm text-blue-gray-800">
            {{ user.email || "-" }}
          </p>
        </div>
      </div>
    </section>
    <BaseModal
      :open="isPromptOpen"
      @close="closePrompt"
    >
      <div class="w-full h-full">
        <h1 class="font-roboto text-xl leading-8 font-medium text-green-700 mb-6 text-blue-gray-800">
          {{ promptDetail.title }}
        </h1>
        <p class="font-lato text-sm text-blue-gray-800 mb-4">
          {{ promptDetail.description }}
        </p>
        <div
          v-if="promptDetail.action === 'name'"
          class="flex flex-col flex-grow gap-2"
        >
          <label
            for="name"
            class="text-blue-gray-800"
          >
            Nama Baru
          </label>
          <input
            id="name"
            v-model="updatedUser['name']"
            type="text"
            class="focus:outline-none border border-gray-400 p-2 rounded-md font-lato text-sm text-blue-gray-800"
            placeholder="Masukkan nama baru"
          >
        </div>
        <div
          v-if="promptDetail.action === 'occupation'"
          class="flex flex-col flex-grow gap-2"
        >
          <label
            for="occupation"
            class="text-blue-gray-800"
          >
            Jabatan Baru
          </label>
          <input
            id="occupation"
            v-model="updatedUser['occupation']"
            type="text"
            class="focus:outline-none border border-gray-400 p-2 rounded-md font-lato text-sm text-blue-gray-800"
            placeholder="Masukkan jabatan"
          >
        </div>
      </div>
      <template #footer>
        <div class="flex gap-4 justify-end">
          <BaseButton
            class="border-green-700 hover:bg-green-50 text-sm text-green-700"
            @click="closePrompt"
          >
            Batal
          </BaseButton>
          <BaseButton
            class="bg-green-700 hover:bg-green-800 text-sm text-white"
            :disabled="!isInputValid"
            @click="promptDetail.buttonClick"
          >
            Simpan Perubahan
          </BaseButton>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseButton from '@/common/components/BaseButton';
import BaseModal from '@/common/components/BaseModal';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const userRepository = RepositoryFactory.get('user');

export default {
  name: 'PersonalInformationSection',
  components: {
    BaseButton,
    BaseModal,
  },
  data() {
    return {
      updatedUser: {
        name: '',
        occupation: '',
      },
      promptDetail: {
        action: '',
        title: '',
        description: '',
        buttonClick: () => {},
      },
      isPromptOpen: false,
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),
    isInputValid() {
      return this.updatedUser[this.promptDetail.action] !== '';
    },
  },
  methods: {
    openPrompt() {
      this.isPromptOpen = true;
    },
    closePrompt() {
      this.isPromptOpen = false;
      this.resetPromptDetail();
      this.clearUpdatedUser();
    },
    setPromptDetail(action) {
      if (action === 'name') {
        this.promptDetail = {
          action: 'name',
          title: 'Ubah Nama',
          description: 'Masukkan nama baru untuk akun Anda.',
          buttonClick: () => this.updateUser(),
        };
      }

      if (action === 'occupation') {
        this.promptDetail = {
          action: 'occupation',
          title: 'Ubah Jabatan',
          description: 'Masukkan jabatan baru untuk akun Anda.',
          buttonClick: () => this.updateUser(),
        };
      }

      this.openPrompt();
    },
    resetPromptDetail() {
      this.promptDetail = {
        action: '',
        title: '',
        description: '',
        buttonClick: () => {},
      };
    },
    clearUpdatedUser() {
      this.updatedUser = {
        name: '',
        occupation: '',
      };
    },
    async updateUser() {
      if (!this.isInputValid) return;

      const actionType = this.promptDetail.action;
      /**
       *  set object payload based on action
       */
      const payload = { [actionType]: this.updatedUser[actionType] };

      try {
        const { data } = await userRepository.updateUser(payload);

        /**
         *  generate certain user data from successful response
         *  so that the field is immediately updated
         */
        this.user[actionType] = data[actionType];

        this.$toast({ type: 'success', message: 'Data telah berhasil diubah' });
        this.closePrompt();
      } catch (error) {
        this.$toast({ type: 'error', message: 'Data gagal diubah' });
        this.closePrompt();
      }
    },
  },
};
</script>
