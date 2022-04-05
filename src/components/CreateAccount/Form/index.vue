<template>
  <div
    v-if="!isAccountCreated"
    class="bg-white w-[443px] p-8 rounded-lg flex flex-col gap-6"
  >
    <!-- Title -->
    <div class="flex flex-col gap-3">
      <h1 class="text-green-700 font-bold text-2xl">
        Buat Akun
      </h1>
      <p class="text-sm text-gray-700">
        Lengkapi beberapa informasi di bawah ini untuk membuat dan mengaktifkan akun Anda.
      </p>
    </div>
    <!-- List of steps -->
    <ul class="flex gap-4 items-center">
      <li>
        <div class="flex gap-2 items-center">
          <p
            class="h-8 w-8 flex justify-center items-center rounded-full font-roboto"
            :class="[lastStep ? 'bg-white border border-green-700 text-green-700' : 'bg-green-700 text-white']"
          >
            <JdsIcon
              v-if="lastStep"
              name="check-mark"
              size="xs"
            />
            <template v-else>
              1
            </template>
          </p>
          <p class="font-roboto font-medium text-green-700">
            Informasi Detail
          </p>
          <div
            class="h-[2px] w-4 ml-2"
            :class="[lastStep ? 'bg-green-700' : 'bg-gray-300']"
          />
        </div>
      </li>
      <li>
        <div class="flex gap-2 items-center">
          <p
            class="h-8 w-8 flex justify-center items-center rounded-full font-roboto"
            :class="[lastStep ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-600']"
          >
            2
          </p>
          <p
            class="font-roboto"
            :class="[lastStep ? 'text-green-700 font-bold' : 'text-gray-700']"
          >
            Kata Sandi
          </p>
        </div>
      </li>
    </ul>
    <!-- Step 1 -->
    <DetailInformationForm
      v-show="firstStep"
      :name="name"
      :occupation="occupation"
      :nip="nip"
      :errors="errors"
      @name="name = $event"
      @occupation="occupation = $event"
      @nip="nip = $event"
    />
    <!-- Step 2 -->
    <PasswordForm
      v-show="lastStep"
      :password="password"
      :password-confirmation="passwordConfirmation"
      :errors="errors"
      @password-strength="passwordStrength = $event"
      @password="password = $event"
      @password-confirmation="passwordConfirmation = $event"
    />
    <!-- Action button -->
    <div class="flex gap-5">
      <BaseButton
        class="border text-sm text-center w-full"
        :class="[firstStep ? 'text-gray-400 border-gray-400 cursor-default' : 'text-green-700 border-green-700 hover:bg-green-50' ]"
        @click="onClickBack"
      >
        Kembali
      </BaseButton>
      <BaseButton
        class="bg-green-700 hover:bg-green-800 text-sm text-white text-center w-full"
        :disabled="!isValidInput(step)"
        @click="onClickNext"
      >
        <JdsSpinner
          v-show="isLoading"
          size="16px"
        />
        Lanjutkan
      </BaseButton>
    </div>
  </div>
  <div
    v-else
    class="bg-white w-[443px] p-8 rounded-lg flex flex-col gap-3"
  >
    <h1 class="font-roboto font-bold text-2xl text-green-700">
      Akun Anda Berhasil Dibuat!
    </h1>
    <p class="text-sm text-gray-700 ">
      Selamat akun Anda <span class="font-bold">{{ name }}</span> berhasil dibuat, silahkan menggunakan email dan kata sandi yang telah dibuat
      untuk akun tersebut agar dapat mengakses Content Management System Portal Jabar.
    </p>
    <div class="my-6 flex justify-center items-center">
      <AccountCreatedIcon />
    </div>
    <LinkButton
      href="/login"
      variant="secondary"
      class="text-sm font-bold w-full text-green-700 text-center justify-center"
    >
      Masuk ke Akun
    </LinkButton>
  </div>
</template>

<script>
import BaseButton from '@/common/components/BaseButton';
import LinkButton from '@/common/components/LinkButton';
import DetailInformationForm from '@/components/CreateAccount/Form/DetailInformationForm';
import PasswordForm from '@/components/CreateAccount/Form/PasswordForm';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';
import AccountCreatedIcon from '@/assets/icons/account-created.svg?inline';

const userRepository = RepositoryFactory.get('user');

export default {
  name: 'CreateAccountForm',
  components: {
    BaseButton,
    LinkButton,
    AccountCreatedIcon,
    DetailInformationForm,
    PasswordForm,
  },
  data() {
    return {
      step: 1,
      name: '',
      occupation: '',
      nip: '',
      password: '',
      passwordConfirmation: '',
      passwordStrength: '',
      token: '',
      errors: {},
      isLoading: false,
      isAccountCreated: false,
    };
  },
  computed: {
    firstStep() {
      return this.step === 1;
    },
    lastStep() {
      return this.step === 2;
    },
    hasErrors() {
      return Object.keys(this.errors).length > 0;
    },
  },
  watch: {
    name() {
      if (this.name.trim() === '') this.setErrors('name', 'Nama harus diisi');
      else this.clearErrors('name');
    },
    occupation() {
      if (this.occupation.trim() === '') this.setErrors('occupation', 'Jabatan harus diisi');
      else this.clearErrors('occupation');
    },
    nip() {
      if (this.nip.length !== 18) this.setErrors('nip', 'NIP harus 18 digit');
      else this.clearErrors('nip');
    },
    passwordConfirmation() {
      if (this.passwordConfirmation === '') this.setErrors('passwordConfirmation', 'Kata sandi harus diisi');
      else if (this.password !== this.passwordConfirmation) this.setErrors('passwordConfirmation', 'Kata sandi tidak sama');
      else this.clearErrors('passwordConfirmation');
    },
  },
  created() {
    this.token = this.$route.query.token || '';
  },
  methods: {
    setErrors(name, message) {
      this.errors = {
        ...this.errors,
        [name]: message,
      };
    },
    clearErrors(name) {
      this.errors[name] = '';
    },
    onClickBack() {
      // decrement the step
      if (!this.firstStep) this.step -= 1;
    },
    isValidInput(step) {
      switch (step) {
        case 1:
          return this.name.trim() !== '' && this.occupation.trim() !== '' && this.nip.length === 18;
        case 2:
          return this.password !== '' && this.passwordStrength !== 'low' && this.passwordConfirmation !== '' && this.password === this.passwordConfirmation;
        default:
          return false;
      }
    },
    onClickNext() {
      if (this.isLoading) return;
      if (!this.isValidInput(this.step)) return;

      if (this.firstStep) {
        // Check if user nip exists
        this.isLoading = true;
        userRepository.checkUserNIP(this.nip)
          .then(({ data }) => {
            // increment the step
            if (!data.exist) this.step += 1;
            else this.setErrors('nip', 'NIP telah digunakan');
          })
          .catch(() => this.$toast({ type: 'error', message: 'Mohon maaf, terjadi kesalahan dalam pembuatan akun' }))
          .finally(() => {
            this.isLoading = false;
          });
      } else {
        this.createAccount();
      }
    },
    async createAccount() {
      this.isLoading = true;
      try {
        const body = {
          name: this.name.trim(),
          occupation: this.occupation.trim(),
          nip: this.nip,
          password: this.password,
          token: this.token,
        };
        await userRepository.createUser(body);
        this.isAccountCreated = true;
      } catch (error) {
        if (error.response) this.$toast({ type: 'error', message: 'Token tidak valid' });
        else this.$toast({ type: 'error', message: 'Mohon maaf, terjadi kesalahan dalam pembuatan akun' });
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
