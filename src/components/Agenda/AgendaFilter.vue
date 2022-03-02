<template>
  <section class="agenda-filter min-w-0 flex gap-3 items-center justify-center">
    <FilterIcon class="w-5 h-5 fill-blue-gray-800" />
    <p class="font-lato text-sm">
      Filter :
    </p>
    <BaseButton
      class="bg-green-700 hover:bg-green-600 font-lato text-sm text-white rounded-full"
      @click="toggleFilterDropdown"
    >
      <div class="min-w-0 flex gap-2 items-center">
        <p class="font-normal">
          {{ filterButtonLabel }}
        </p>
        <div
          v-show="filterCount"
          class="w-5 h-5 rounded-full bg-red-500 text-white"
        >
          {{ filterCount }}
        </div>
      </div>
      <template #icon-right>
        <JdsIcon
          name="chevron-down"
          size="16px"
          fill="#fff"
          class="h-4 w-4"
        />
      </template>
    </BaseButton>

    <!-- Filter Modal -->
    <BaseModal :open="isFilterOpen">
      <template #header>
        <!-- Title and Reset Button -->
        <div class="min-w-0 w-full p-4 pb-0 flex items-center justify-between">
          <h2 class="font-roboto font-bold text-blue-gray-800">
            Filter Agenda
          </h2>
          <BaseButton
            class="border-transparent hover:bg-green-50"
            @click="resetFilter"
          >
            <p class="font-normal text-sm text-green-700">
              Hapus semua filter
            </p>
          </BaseButton>
        </div>
      </template>
      <section class="agenda-filter min-w-[400px]">
        <!-- Category Select Box -->
        <div class="w-full mb-6">
          <div class="min-w-0 w-full flex gap-3 items-center mb-4">
            <p class="font-lato text-sm text-blue-gray-700 leading-none whitespace-nowrap">
              Kategori Agenda
            </p>
            <div class="w-full border border-gray-100" />
          </div>
          <div class="w-full">
            <JdsCheckbox
              v-model="checkAllCategories"
              :indeterminate="isCategoryIndeterminate"
              text="Pilih Semua Kategori"
              class="mb-3"
            />
            <div class="min-w-0 w-full pl-[28px] flex flex-col gap-4">
              <JdsCheckbox
                v-for="(category, index) in categories"
                :key="index"
                :text="category.label"
                :checked="isCategorySelected(category.value)"
                @change="setSelectedCategory(category.value)"
              />
            </div>
          </div>
        </div>
        <!-- Start and End Date Picker -->
        <div class="w-full mb-6">
          <div class="min-w-0 w-full flex gap-3 items-center mb-4">
            <p class="font-lato text-sm text-blue-gray-700 leading-none whitespace-nowrap">
              Tanggal
            </p>
            <div class="w-full border border-gray-100" />
          </div>
          <div class="date-input relative min-w-0 w-full grid grid-cols-2 gap-3">
            <JdsDateInput
              v-model="filter.start_date"
              label="Tanggal Awal"
              @input="isDatePickerTouched = true"
            />
            <div>
              <JdsDateInput
                v-model="filter.end_date"
                label="Tanggal Akhir"
                @input="isDatePickerTouched = true"
              />
              <div
                v-show="isDatePickerTouched && !isSelectedDateValid"
                class="py-2"
              >
                <p class="text-sm text-red-500">
                  Tanggal yang dipilih tidak valid
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- Agenda Type -->
        <div class="w-full mb-[120px]">
          <div class="min-w-0 w-full flex gap-3 items-center mb-4">
            <p class="font-lato text-sm text-blue-gray-700 leading-none whitespace-nowrap">
              Tipe Agenda
            </p>
            <div class="w-full border border-gray-100" />
          </div>
          <div class="w-full">
            <JdsCheckbox
              v-model="checkAllTypes"
              :indeterminate="isTypeIndeterminate"
              text="Pilih Semua Tipe"
              class="mb-3"
            />
            <div class="min-w-0 w-full pl-[28px] flex flex-col gap-4">
              <JdsCheckbox
                v-for="(type,index) in types"
                :key="index"
                :text="type.label"
                :checked="isTypeSelected(type.value)"
                @change="setSelectedType(type.value)"
              />
            </div>
          </div>
        </div>
      </section>
      <template #footer>
        <!-- Cancel and Submit buttons -->
        <div class="w-full flex gap-3">
          <BaseButton
            class="border-green-700 hover:bg-green-50 bg-white w-full"
            @click="toggleFilterDropdown"
          >
            <p class="w-full text-sm font-normal text-green-700 text-center">
              Batal
            </p>
          </BaseButton>
          <BaseButton
            class="bg-green-700 hover:bg-green-600 w-full"
            :disabled="!isFilterValid"
            @click="submitFilter"
          >
            <p class="w-full text-sm font-normal text-white text-center">
              Terapkan
            </p>
          </BaseButton>
        </div>
      </template>
    </BaseModal>
  </section>
</template>

<script>
import FilterIcon from '@/assets/icons/filter.svg?inline';
import BaseButton from '@/common/components/BaseButton';
import BaseModal from '@/common/components/BaseModal';
import { AGENDA_CATEGORIES, AGENDA_TYPES } from '@/common/constants';
import { daysDifference, formatDate } from '@/common/helpers/date';

export default {
  name: 'AgendaFilter',
  components: {
    FilterIcon,
    BaseButton,
    BaseModal,
  },
  data() {
    return {
      isFilterOpen: false,
      isDatePickerTouched: false,
      filter: {
        cat: [],
        type: [],
        start_date: null,
        end_date: null,
      },
      filterCount: 0,
      categories: AGENDA_CATEGORIES,
      types: AGENDA_TYPES,
      popoverOptions: {
        strategy: 'fixed',
        placement: 'bottom-start',
        modifiers: [
          {
            name: 'offset',
            options: { offset: [-8, 8] },
          },
        ],
      },
    };
  },
  computed: {
    checkAllCategories: {
      get() {
        return this.filter.cat.length === this.categories.length;
      },
      set(value) {
        const checked = [];
        if (value) {
          this.categories.forEach((category) => {
            checked.push(category.value);
          });
        }
        this.filter = {
          ...this.filter,
          cat: checked,
        };
      },
    },

    isCategoryIndeterminate() {
      if (this.filter.cat.length && this.filter.cat.length < this.categories.length) {
        return true;
      }
      return false;
    },

    checkAllTypes: {
      get() {
        return this.filter.type.length === this.types.length;
      },
      set(value) {
        const checked = [];
        if (value) {
          this.types.forEach((type) => {
            checked.push(type.value);
          });
        }
        this.filter = {
          ...this.filter,
          type: checked,
        };
      },
    },

    isTypeIndeterminate() {
      if (this.filter.type.length && this.filter.type.length < this.types.length) {
        return true;
      }
      return false;
    },

    isSelectedDateValid() {
      const { start_date: start, end_date: end } = this.filter;

      if (start && end) {
        const startDate = this.convertStringToDate(start);
        const endDate = this.convertStringToDate(end);

        return daysDifference(endDate, startDate) >= 0;
      }

      return false;
    },

    isFilterValid() {
      if (this.isDatePickerTouched) {
        return this.isSelectedDateValid;
      }

      return true;
    },

    filterButtonLabel() {
      return this.filterCount > 0 ? 'Diterapkan' : 'Belum ada filter';
    },
  },
  methods: {
    isCategorySelected(category) {
      return this.filter.cat.includes(category);
    },

    setSelectedCategory(category) {
      let checked = [];

      if (this.filter.cat.includes(category)) {
        checked = this.filter.cat.filter((item) => item !== category);
      } else {
        checked = [...this.filter.cat, category];
      }

      this.filter = {
        ...this.filter,
        cat: checked,
      };
    },

    isTypeSelected(type) {
      return this.filter.type.includes(type);
    },

    setSelectedType(type) {
      let checked = [];

      if (this.filter.type.includes(type)) {
        checked = this.filter.type.filter((item) => item !== type);
      } else {
        checked = [...this.filter.type, type];
      }

      this.filter = {
        ...this.filter,
        type: checked,
      };
    },

    toggleFilterDropdown() {
      this.isFilterOpen = !this.isFilterOpen;
    },

    submitFilter() {
      const { start_date: startDate, end_date: endDate } = this.filter;

      const filterObj = { ...this.filter };

      if (startDate && endDate) {
        filterObj.start_date = formatDate(this.convertStringToDate(startDate), 'yyyy/MM/dd');
        filterObj.end_date = formatDate(this.convertStringToDate(endDate), 'yyyy/MM/dd');
      }

      this.$emit('change:filter', filterObj);
      this.updateFilterCount();
      this.toggleFilterDropdown();
    },

    resetFilter() {
      this.filter = {
        cat: [],
        type: [],
        start_date: null,
        end_date: null,
      };
      this.resetDatePicker();
      this.filterCount = 0;
      this.isDatePickerTouched = false;
    },

    /**
     * NOTE:
     * There is an issue with `JdsDateInput` component,
     * the value displayed in the date picker is not reset back to default
     * when we change the bound model to `null` or `undefined`.
     *
     * One solution we can do is to reset the values
     * manually using the DOM element selector
     */
    resetDatePicker() {
      const datePickers = document.querySelectorAll('.agenda-filter .jds-date-input #date');

      datePickers.forEach((datePicker) => {
        datePicker.value = null;
      });
    },

    updateFilterCount() {
      let count = 0;

      Object.keys(this.filter).forEach((item) => {
        if (Array.isArray(this.filter[item])) {
          if (this.filter[item].length) {
            count += 1;
          }
        } else if (this.filter[item]) {
          count += 1;
        }
      });

      this.filterCount = count;
    },

    convertStringToDate(string) {
      const date = string.split('/');
      const year = date[2];
      // month is zero based, we need to subtract 1
      const month = date[1] - 1;
      const day = date[0];

      return new Date(year, month, day);
    },
  },

};
</script>

<style>
/**
 * Override default Jds-Popover styling
 */
.agenda-filter .jds-popover__content {
  z-index: 20 !important;
}

/**
 * Override default Jds-Checkbox styling
 */
.agenda-filter .jds-checkbox__option-label {
  font-size: 14px !important;
  font-weight: normal !important;
  color: #424242 !important;
}

/**
 * Override default Jds-DateInput styling
 */
.agenda-filter .date-input .jds-popover {
  visibility: unset !important;
}

.agenda-filter .date-input .jds-form-control-label {
  font-size: 14px !important;
  margin-bottom: 4px !important;
}

.agenda-filter .date-input .jds-popover__content {
  background-color: white;
  z-index: 10 !important;
}
.agenda-filter .date-input .jds-calendar {
  max-width: none !important;
}
.agenda-filter .date-input .jds-calendar .jds-calendar__list-of-days,
.agenda-filter .date-input .jds-calendar .jds-calendar__days {
  display: grid !important;
  grid-template-columns: repeat(7, 1fr) !important;
}
</style>
