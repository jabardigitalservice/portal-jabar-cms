<template>
  <div class="bg-white w-[443px] p-8 rounded-lg flex flex-col gap-6">
    <!-- Title -->
    <div class="flex flex-col gap-3">
      <h1 class="text-green-700 font-bold text-2xl">
        Buat Akun {{ isFormDirty }}
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
        @click="onClickNext"
      >
        Lanjutkan
      </BaseButton>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/common/components/BaseButton';
import DetailInformationForm from '@/components/CreateAccount/Form/DetailInformationForm';
import PasswordForm from '@/components/CreateAccount/Form/PasswordForm';

export default {
  name: 'CreateAccountForm',
  components: {
    BaseButton,
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
      errors: {},
      isFormDirty: false,
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
      if (this.isFormDirty) {
        if (this.name === '') this.setErrors('name', 'Nama harus diisi');
        else this.errors.name = '';
      }
    },
    occupation() {
      if (this.isFormDirty) {
        if (this.occupation === '') this.setErrors('occupation', 'Jabatan harus diisi');
        else this.errors.occupation = '';
      }
    },
    nip() {
      if (this.isFormDirty) {
        if (this.nip.length !== 18) this.setErrors('nip', 'NIP harus 18 digit');
        else this.errors.nip = '';
      }
    },
    password: {
      immediate: true,
      async handler() {
        await this.$nextTick();
        if (this.isFormDirty) {
          if (this.password === '') this.setErrors('password', 'Kata sandi harus diisi');
          if (this.passwordStrength === 'low') this.setErrors('password', 'Kata sandi anda tidak cukup kuat');
          else this.errors.password = '';
        }
      },
    },
    passwordConfirmation() {
      if (this.isFormDirty) {
        if (this.passwordConfirmation === '') this.setErrors('passwordConfirmation', 'Kata sandi harus diisi');
        if (this.password !== this.passwordConfirmation) this.setErrors('passwordConfirmation', 'Kata sandi tidak sama');
        else this.errors.passwordConfirmation = '';
      }
    },
  },
  methods: {
    setErrors(name, message) {
      this.errors = {
        ...this.errors,
        [name]: message,
      };
    },
    clearErrors() {
      this.errors = {};
    },
    onClickBack() {
      // decrement the step
      if (!this.firstStep) this.step -= 1;
    },
    onClickNext() {
      this.clearErrors();
      this.isFormDirty = false;

      if (this.firstStep) {
        // validate the step 1 input
        if (this.name === '') this.setErrors('name', 'Nama harus diisi');
        if (this.occupation === '') this.setErrors('occupation', 'Jabatan harus diisi');
        if (this.nip.length !== 18) this.setErrors('nip', 'NIP harus 18 digit');
        this.isFormDirty = true;

        if (!this.hasErrors) {
          this.isFormDirty = false;
          // increment the step
          this.step += 1;
        }
      } else {
        // validate the step 2 input
        if (this.password === '') this.setErrors('password', 'Kata sandi harus diisi');
        if (this.passwordStrength === 'low') this.setErrors('password', 'Kata sandi anda tidak cukup kuat');
        if (this.passwordConfirmation === '') this.setErrors('passwordConfirmation', 'Kata sandi harus diisi');
        if (this.password !== this.passwordConfirmation) this.setErrors('passwordConfirmation', 'Kata sandi tidak sama');
        this.isFormDirty = true;

        // submit the form
        if (!this.hasErrors) this.createAccount();
      }
    },
    createAccount() {
      // TODO: submit the form
    },
  },
};
</script>
