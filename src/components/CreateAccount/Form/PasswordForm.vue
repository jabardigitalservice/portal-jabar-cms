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
          :value="password"
          :type="passwordInputType['password']"
          placeholder="Masukkan kata sandi"
          class="text-sm placeholder:text-gray-600 p-2 w-full focus:outline-none focus-within:placeholder:text-gray-500"
          :class="[errors.password ? 'bg-red-50' : 'bg-gray-50 focus-within:bg-gray-50']"
          @input="$emit('password', $event.target.value)"
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
    <!-- Tooltip -->
    <div
      v-show="!isEmpty(password)"
      class="flex relative mb-2"
    >
      <div class="bg-gray-900 px-3 pt-3 pb-2 rounded-lg text-white text-xs">
        <div class="grid grid-cols-3 gap-2 mb-2">
          <div
            class="h-1 rounded-lg"
            :class="[lowBarClassName]"
          />
          <div
            class="h-1 rounded-lg"
            :class="[mediumBarClassName]"
          />
          <div
            class="h-1 rounded-lg"
            :class="[strongBarClassName]"
          />
        </div>
        <p>Kata sandi Anda <span :class="passwordStrengthLabelClassName">{{ passwordStrength.label }}</span></p>
      </div>
      <div class="absolute top-1 left-3 w-3 h-3 -mt-2 rotate-45 bg-gray-900" />
    </div>
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
export default {
  name: 'PasswordForm',
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
    };
  },
  computed: {
    lowBarClassName() {
      switch (this.passwordStrength.type) {
        case 'low':
          return 'bg-red-600';
        case 'medium':
          return 'bg-yellow-600';
        case 'strong':
          return 'bg-green-600';
        default:
          return 'bg-gray-600';
      }
    },
    mediumBarClassName() {
      switch (this.passwordStrength.type) {
        case 'medium':
          return 'bg-yellow-600';
        case 'strong':
          return 'bg-green-600';
        default:
          return 'bg-gray-600';
      }
    },
    strongBarClassName() {
      switch (this.passwordStrength.type) {
        case 'strong':
          return 'bg-green-600';
        default:
          return 'bg-gray-600';
      }
    },
    passwordStrengthLabelClassName() {
      switch (this.passwordStrength.type) {
        case 'low':
          return 'text-red-500';
        case 'medium':
          return 'text-yellow-500';
        case 'strong':
          return 'text-green-500';
        default:
          return '';
      }
    },
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
  },
};
</script>
