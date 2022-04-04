<template>
  <div>
    <!-- Password input -->
    <div class="flex flex-col flex-grow gap-1 mb-4">
      <label
        for="password"
        class="text-[15px] font-medium mb-1"
        :class="[errors.password ? 'text-red-600' : 'text-gray-800']"
      >
        Kata Sandi
      </label>
      <div
        class="border border-gray-500 rounded-lg overflow-hidden flex items-stretch"
        :class="[errors.password ? 'bg-red-50 border border-red-600' : 'bg-gray-50 focus-within:border-green-700']"
      >
        <input
          id="password"
          ref="password"
          :value="password"
          :type="passwordInputType['password']"
          autocomplete="off"
          placeholder="Masukkan kata sandi"
          class="text-sm placeholder:text-gray-600 p-2 w-full focus:outline-none focus-within:placeholder:text-gray-500"
          :class="[errors.password ? 'bg-red-50' : 'bg-gray-50 focus-within:bg-gray-50']"
          @input="onInput"
          @focus="openTooltip"
          @blur="closeTooltip"
        >
        <div
          v-show="isPasswordIconVisible['password']"
          class="p-2 flex justify-center items-center cursor-pointer"
          @click="togglePasswordInputVisibility('password')"
        >
          <JdsIcon
            :name="passwordIconName['password']"
            size="16px"
          />
        </div>
      </div>
      <p
        v-show="errors.password"
        class="text-red-600 text-sm"
      >
        {{ errors.password }}
      </p>
    </div>
    <PasswordTooltip
      :show="isTooltipOpen"
      :password-strength="passwordStrength"
    />
    <!-- Password confirmation input -->
    <div class="flex flex-col flex-grow gap-1 mb-4">
      <label
        for="passwordConfirmation"
        class="text-[15px] font-medium mb-1"
        :class="[errors.passwordConfirmation ? 'text-red-600' : 'text-gray-800']"
      >
        Ulangi Kata Sandi
      </label>
      <div
        class="border border-gray-500 rounded-lg overflow-hidden flex items-stretch"
        :class="[errors.passwordConfirmation ? 'bg-red-50 border border-red-600' : 'bg-gray-50 focus-within:border-green-700']"
      >
        <input
          id="passwordConfirmation"
          :value="passwordConfirmation"
          :type="passwordInputType['passwordConfirmation']"
          autocomplete="off"
          placeholder="Ulangi kata sandi"
          class="text-sm placeholder:text-gray-600 p-2 w-full focus:outline-none focus-within:placeholder:text-gray-500"
          :class="[errors.passwordConfirmation ? 'bg-red-50' : 'bg-gray-50 focus-within:bg-gray-50']"
          @input="$emit('password-confirmation', $event.target.value)"
        >
        <div
          v-show="isPasswordIconVisible['passwordConfirmation']"
          class="p-2 flex justify-center items-center cursor-pointer"
          @click="togglePasswordInputVisibility('passwordConfirmation')"
        >
          <JdsIcon
            :name="passwordIconName['passwordConfirmation']"
            size="16px"
          />
        </div>
      </div>
      <p
        v-show="errors.passwordConfirmation"
        class="text-red-600 text-sm"
      >
        {{ errors.passwordConfirmation }}
      </p>
    </div>
  </div>
</template>

<script>
import PasswordTooltip from '@/common/components/PasswordTooltip';

export default {
  name: 'PasswordForm',
  components: {
    PasswordTooltip,
  },
  props: {
    password: {
      type: String,
      required: false,
      default: '',
    },
    passwordConfirmation: {
      type: String,
      required: false,
      default: '',
    },
    errors: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data() {
    return {
      isPasswordInputVisible: {
        password: false,
        passwordConfirmation: false,
      },
      isPasswordIconVisible: {
        password: false,
        passwordConfirmation: false,
      },
      passwordInputType: {
        password: 'password',
        passwordConfirmation: 'password',
      },
      passwordIconName: {
        password: 'eye',
        passwordConfirmation: 'eye',
      },
      passwordStrength: {
        type: '',
        label: '',
      },
      isTooltipOpen: false,
    };
  },
  watch: {
    password() {
      this.setPasswordIconVisibility('password', this.password !== '');
      this.setPasswordStrength(this.checkPasswordStrength(this.password));
      this.$emit('password-strength', this.checkPasswordStrength(this.password));
    },
    passwordConfirmation() {
      this.setPasswordIconVisibility('passwordConfirmation', this.passwordConfirmation !== '');
    },
  },
  methods: {
    isEmpty(string) {
      return string === '';
    },
    checkPasswordStrength(string) {
      // contain at least 1 lowercase alphabetical character
      const isContainLowerCase = /(?=.*[a-z])/.test(string);
      // contain at least 1 uppercase alphabetical character
      const isContainUpperCase = /(?=.*[A-Z])/.test(string);
      // contain at least 1 numeric character
      const isContainNumber = /(?=.*[0-9])/.test(string);
      // contain at least 1 special character
      const isContainSymbol = /(?=.*[!@#$%^&*])/.test(string);

      if (string.length >= 6 && isContainLowerCase && isContainUpperCase && isContainNumber && isContainSymbol) {
        return 'strong';
      }

      if (string.length >= 6 && (isContainLowerCase || isContainUpperCase) && isContainNumber) {
        return 'medium';
      }

      return 'low';
    },
    setPasswordIconVisibility(name, value) {
      this.isPasswordIconVisible[name] = value;
    },
    setPasswordStrength(type) {
      switch (type) {
        case 'low':
          this.passwordStrength = {
            type: 'low',
            label: 'tidak cukup kuat',
          };
          break;
        case 'medium':
          this.passwordStrength = {
            type: 'medium',
            label: 'cukup kuat',
          };
          break;
        case 'strong':
          this.passwordStrength = {
            type: 'strong',
            label: 'sangat kuat',
          };
          break;
        default:
          this.passwordStrength = {
            type: '',
            label: '',
          };
      }
    },
    togglePasswordInputVisibility(name) {
      this.isPasswordInputVisible[name] = !this.isPasswordInputVisible[name];
      this.passwordInputType[name] = this.isPasswordInputVisible[name] ? 'text' : 'password';
      this.passwordIconName[name] = this.isPasswordInputVisible[name] ? 'eye-off' : 'eye';
    },
    openTooltip() {
      this.isTooltipOpen = !this.isEmpty(this.$refs.password.value);
    },
    closeTooltip() {
      this.isTooltipOpen = false;
    },
    onInput() {
      this.$emit('password', this.$refs.password.value);
      this.openTooltip();
    },
  },
};
</script>
