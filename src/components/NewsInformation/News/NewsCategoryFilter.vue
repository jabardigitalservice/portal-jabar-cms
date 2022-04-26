<template>
  <section class="news-filter min-w-0 flex gap-3 items-center justify-center">
    <FilterIcon class="w-5 h-5 fill-blue-gray-800" />
    <p class="font-lato text-sm">
      Filter :
    </p>
    <BaseButton
      class="bg-green-700 hover:bg-green-600 font-lato text-sm text-white rounded-full"
      @click="toggleFilterModal"
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
            Filter Berita
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
      <section class="min-w-[400px]">
        <!-- Category Select Box -->
        <div class="w-full">
          <div class="min-w-0 w-full flex gap-3 items-center mb-4">
            <p class="font-lato text-sm text-blue-gray-700 leading-none whitespace-nowrap">
              Kategori Berita
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
      </section>
      <template #footer>
        <!-- Cancel and Submit buttons -->
        <div class="w-full flex gap-3">
          <BaseButton
            class="border-green-700 hover:bg-green-50 bg-white w-full"
            @click="closeFilterModal"
          >
            <p class="w-full text-sm font-normal text-green-700 text-center">
              Batal
            </p>
          </BaseButton>
          <BaseButton
            class="bg-green-700 hover:bg-green-600 w-full"
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
import clonedeep from 'lodash.clonedeep';
import FilterIcon from '@/assets/icons/filter.svg?inline';
import BaseButton from '@/common/components/BaseButton';
import BaseModal from '@/common/components/BaseModal';
import { NEWS_CATEGORIES } from '@/common/constants';

const defaultFilterParams = {
  cat: [],
};

export default {
  name: 'NewsCategoryFilter',
  components: {
    FilterIcon,
    BaseButton,
    BaseModal,
  },
  data() {
    return {
      isFilterOpen: false,
      // Actual/original state that store filter params
      filter: clonedeep(defaultFilterParams),
      // Temporary filter state for rendering purposes
      tempFilter: clonedeep(defaultFilterParams),
      filterCount: 0,
      categories: NEWS_CATEGORIES,
    };
  },
  computed: {
    checkAllCategories: {
      get() {
        return this.tempFilter.cat.length === this.categories.length;
      },
      set(value) {
        const checked = [];
        if (value) {
          this.categories.forEach((category) => {
            checked.push(category.value);
          });
        }
        this.tempFilter = {
          ...this.tempFilter,
          cat: checked,
        };
      },
    },

    isCategoryIndeterminate() {
      if (this.tempFilter.cat.length && this.tempFilter.cat.length < this.categories.length) {
        return true;
      }
      return false;
    },

    filterButtonLabel() {
      return this.filterCount > 0 ? 'Diterapkan' : 'Belum ada filter';
    },
  },
  methods: {
    isCategorySelected(category) {
      return this.tempFilter.cat.includes(category);
    },

    setSelectedCategory(category) {
      let checked = [];

      if (this.tempFilter.cat.includes(category)) {
        checked = this.tempFilter.cat.filter((item) => item !== category);
      } else {
        checked = [...this.tempFilter.cat, category];
      }

      this.tempFilter = {
        ...this.tempFilter,
        cat: checked,
      };
    },

    toggleFilterModal() {
      this.isFilterOpen = !this.isFilterOpen;
    },

    closeFilterModal() {
      this.isFilterOpen = false;

      // Revert to actual/original filter state on closing modal
      this.tempFilter = clonedeep(this.filter);
    },

    submitFilter() {
      // Mutate actual/original filter state to match temporary filter state
      this.filter = clonedeep(this.tempFilter);

      this.$emit('change:filter', this.filter);
      this.updateFilterCount();
      this.closeFilterModal();
    },

    resetFilter() {
      this.tempFilter = clonedeep(defaultFilterParams);
    },

    updateFilterCount() {
      this.filterCount = this.filter.cat.length;
    },
  },

};
</script>

<style>
/**
 * Override default Jds-Checkbox styling
 */
.news-filter .jds-checkbox__option-label {
  font-size: 14px !important;
  font-weight: normal !important;
  color: #424242 !important;
}
</style>
