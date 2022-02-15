<template>
  <div class="flex gap-3">
    <button
      title="Bulan Sebelumnya"
      class="w-8 h-8 rounded-full p-2 flex items-center justify-center hover:bg-green-50"
      @click="onPrevMonth"
    >
      <JdsIcon
        name="chevron-left"
        size="16px"
        fill="#069550"
      />
    </button>
    <button
      title="Bulan Setelahnya"
      class="w-8 h-8 rounded-full p-2 flex items-center justify-center hover:bg-green-50"
      @click="onNextMonth"
    >
      <JdsIcon
        name="chevron-right"
        size="16px"
        fill="#069550"
      />
    </button>
    <p class="font-roboto font-bold text-2xl leading-8 text-blue-gray-800">
      {{ month }}
      <span class="text-blue-gray-400 font-medium">
        {{ year }}
      </span>
    </p>
  </div>
</template>

<script>
import { formatDate } from '@/common/helpers/date';

export default {
  data() {
    return {
      date: new Date(),
    };
  },
  computed: {
    firstDate() {
      const firstDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
      return formatDate(firstDate, 'yyyy-MM-dd');
    },
    lastDate() {
      const lastDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
      return formatDate(lastDate, 'yyyy-MM-dd');
    },
    month() {
      return formatDate(this.date, 'MMMM');
    },
    year() {
      return formatDate(this.date, 'yyyy');
    },
  },
  watch: {
    date: {
      handler() {
        this.$emit('update-month-filter', {
          start_date: this.firstDate,
          end_date: this.lastDate,
        });
      },
    },
  },
  methods: {
    onPrevMonth() {
      const prevDate = new Date(this.date.getFullYear(), this.date.getMonth() - 1, 1);
      this.date = prevDate;
    },
    onNextMonth() {
      const nextDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1);
      this.date = nextDate;
    },
  },
};
</script>
