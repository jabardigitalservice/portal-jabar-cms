<template>
  <div>
    <!-- Name input -->
    <div class="flex flex-col gap-1 mb-4">
      <label
        for="name"
        class="text-sm font-medium mb-1"
        :class="[errors.name ? 'text-red-600' : 'text-gray-800']"
      >
        Nama Anda
      </label>
      <div
        class="border border-gray-500 rounded-lg overflow-hidden flex items-stretch"
        :class="[errors.name ? 'bg-red-50 border border-red-600' : 'bg-gray-50 focus-within:border-green-700']"
      >
        <input
          id="name"
          :value="name"
          type="text"
          maxlength="100"
          autocomplete="off"
          placeholder="Masukkan nama Anda"
          class="text-sm placeholder:text-gray-600 p-2 w-full focus:outline-none focus-within:placeholder:text-gray-500"
          :class="[errors.name ? 'bg-red-50' : 'bg-gray-50 focus-within:bg-gray-50']"
          @input="$emit('name', $event.target.value)"
        >
      </div>
      <p
        v-show="errors.name"
        class="text-sm text-red-600"
      >
        {{ errors.name }}
      </p>
    </div>
    <!-- Occupation input -->
    <div class="flex flex-col gap-1 mb-4">
      <label
        for="occupation"
        class="text-sm font-medium mb-1"
        :class="[errors.occupation ? 'text-red-600' : 'text-gray-800']"
      >
        Jabatan
      </label>
      <div
        class="border border-gray-500 rounded-lg overflow-hidden flex items-stretch"
        :class="[errors.occupation ? 'bg-red-50 border border-red-600' : 'bg-gray-50 focus-within:border-green-700']"
      >
        <input
          id="occupation"
          :value="occupation"
          type="text"
          maxlength="35"
          autocomplete="off"
          placeholder="Masukkan jabatan Anda"
          class="text-sm placeholder:text-gray-600 p-2 w-full focus:outline-none focus-within:placeholder:text-gray-500"
          :class="[errors.occupation ? 'bg-red-50' : 'bg-gray-50 focus-within:bg-gray-50']"
          @input="$emit('occupation', $event.target.value)"
        >
      </div>
      <p
        v-show="errors.occupation"
        class="text-sm text-red-600"
      >
        {{ errors.occupation }}
      </p>
    </div>
    <!-- NIP input -->
    <div class="flex flex-col gap-1 mb-4">
      <label
        for="nip"
        class="text-sm font-medium mb-1"
        :class="[errors.nip ? 'text-red-600' : 'text-gray-800']"
      >
        NIP
      </label>
      <div
        class="border border-gray-500 rounded-lg overflow-hidden flex items-stretch"
        :class="[errors.nip ? 'bg-red-50 border border-red-600' : 'bg-gray-50 focus-within:border-green-700']"
      >
        <input
          id="nip"
          :value="nip"
          type="number"
          autocomplete="off"
          placeholder="Masukkan NIP Anda"
          class="text-sm placeholder:text-gray-600 p-2 w-full focus:outline-none focus-within:placeholder:text-gray-500"
          :class="[errors.nip ? 'bg-red-50' : 'bg-gray-50 focus-within:bg-gray-50']"
          @input="$emit('nip', $event.target.value)"
        >
      </div>
      <p
        v-show="errors.nip"
        class="text-sm text-red-600"
      >
        {{ errors.nip }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailInformationForm',
  props: {
    name: {
      type: String,
      required: false,
      default: '',
    },
    occupation: {
      type: String,
      required: false,
      default: '',
    },
    nip: {
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
};
</script>
