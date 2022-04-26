<template>
  <BaseModal :open="open">
    <div class="w-full h-full px-2 pb-4">
      <h1 class="font-roboto font-medium text-green-700 text-[21px] leading-[34px] mb-6">
        Sedang diproses
      </h1>
      <p class="text-sm leading-6 text-blue-gray-800 text-center">
        Mohon tunggu, sedang diproses
      </p>
    </div>
    <template #footer>
      <progress
        max="100"
        :value="value"
      />
    </template>
  </BaseModal>
</template>

<script>
import BaseModal from '@/common/components/BaseModal';

export default {
  name: 'ProgressModal',
  components: { BaseModal },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
progress {
  width: 100%;
}
progress::-webkit-progress-bar {
  background-color: #F5F5F5;
  border-radius: 4px;
}
progress::-moz-progress-bar {
  background-color: #F5F5F5;
  border-radius: 4px;
}
progress::-webkit-progress-value {
  background-color: #069550;
  border-radius: 4px;
  -webkit-transition : width 0.2s ease;
  -moz-transition : width 0.2s ease;
  -o-transition : width 0.2s ease;
  transition : width 0.2s ease;
}
</style>
