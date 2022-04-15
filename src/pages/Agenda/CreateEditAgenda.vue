<template>
  <main>
    <HeaderMenu>
      <div class="flex gap-4">
        <BaseButton
          :disabled="!isFormValid"
          class="border-green-700 hover:bg-green-50 font-lato text-sm text-green-700"
          @click="togglePreviewModal"
        >
          <template #icon-left>
            <JdsIcon
              name="eye"
              size="16px"
              class="h-4"
              :class="[!isFormValid ? 'text-gray-600' : 'text-green-700']"
            />
          </template>
          <p>
            Pratinjau
          </p>
        </BaseButton>
        <BaseButton
          :disabled="!isFormValid"
          class="bg-green-700 hover:bg-green-600 font-lato text-sm text-white"
          @click="onSubmit"
        >
          <SaveIcon
            class="w-5 h-5"
            :class="!isFormValid ? 'fill-gray-600' : 'fill-white'"
          />
          <p>
            {{ submitButtonLabel }}
          </p>
        </BaseButton>
      </div>
    </HeaderMenu>
    <form class="agenda__form grid grid-cols-3 gap-4">
      <div class="col-span-2">
        <div class="p-4 rounded-lg bg-white mb-4">
          <div class="flex flex-col">
            <h2 class="font-roboto font-medium text-green-700 mb-3">
              Judul Agenda/Event
            </h2>
            <JdsInputText
              v-model.trim="form.title"
              placeholder="Masukkan judul agenda/event"
            />
          </div>
        </div>
        <div class="p-4 rounded-lg bg-white mb-4">
          <div class="flex flex-col">
            <h2 class="font-roboto font-medium text-green-700 mb-3">
              Tipe Agenda/Event
            </h2>
            <JdsRadioButtonGroup
              :items="types"
              placeholder-key="label"
              name="radio-button-group"
              orientation="horizontal"
              :value="form.type"
              @change="setType"
            />
          </div>
        </div>
        <div class="p-4 rounded-lg bg-white mb-4">
          <div
            v-if="isTypeOffline"
            class="flex flex-col"
          >
            <h2 class="font-roboto font-medium text-green-700 mb-3">
              Tempat Pelaksanaan
            </h2>
            <JdsTextArea
              v-model.trim="form.address"
              placeholder="Masukkan tempat pelaksanaan atau alamat lengkap tempat pelaksanaan"
            />
          </div>
          <div
            v-else
            class="flex flex-col"
          >
            <h2 class="font-roboto font-medium text-green-700 mb-3">
              Link Agenda
            </h2>
            <div class="flex flex-col gap-1">
              <JdsInputText
                v-model.trim="form.url"
                placeholder="Masukkan link kegiatan"
              >
                <template #prefix-icon>
                  <LinkIcon class="w-4 h-4 fill-gray-600" />
                </template>
                />
              </JdsInputText>
              <p
                v-show="!isUrlValid"
                class="text-sm text-red-600"
              >
                Link kegiatan tidak valid
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="p-4 rounded-lg bg-white mb-4">
          <div class="flex flex-col">
            <h2 class="font-roboto font-medium text-green-700 mb-3">
              Tanggal dan Waktu Pelaksanaan
            </h2>
            <div class="grid grid-cols-1 gap-y-4">
              <div class="col-span-2 gap-x-6 gap-y-1 grid grid-cols-2">
                <JdsDateInput
                  v-model="form.date"
                  label="Pilih Tanggal"
                />
                <JdsCheckbox
                  v-model="isTodayChecked"
                  class="self-end py-[10px]"
                  text="Hari ini"
                />
                <p
                  v-show="isDateHasPassed"
                  class="text-sm text-red-600 col-span-2"
                >
                  Tanggal tidak valid
                </p>
              </div>
              <div class="col-span-2 gap-x-6 gap-y-1 grid grid-cols-2">
                <div class="flex flex-col gap-1">
                  <label
                    for="start-time"
                    class="text-[15px] text-gray-800"
                  >
                    Waktu Dimulai
                  </label>
                  <input
                    id="start-time"
                    v-model="form.start_hour"
                    type="time"
                    class="border border-gray-500 rounded-lg px-2 py-1 bg-gray-50 hover:bg-white hover:border-green-600 focus:outline-none focus:border-green-500 focus:outline-1 focus:outline-offset-[-2px] focus:outline-yellow-500"
                  >
                </div>
                <div class="flex flex-col gap-1">
                  <label
                    for="end-time"
                    class="text-[15px] text-gray-800"
                  >
                    Waktu Berakhir
                  </label>
                  <input
                    id="end-time"
                    v-model="form.end_hour"
                    type="time"
                    :disabled="!hasStartHour"
                    class="border border-gray-500 rounded-lg px-2 py-1 bg-gray-50 hover:bg-white hover:border-green-600 focus:outline-none focus:border-green-500 focus:outline-1 focus:outline-offset-[-2px] focus:outline-yellow-500"
                    :class="{'cursor-not-allowed': !hasStartHour}"
                  >
                </div>
                <p
                  v-show="isTimeHasPassed"
                  class="text-sm text-red-600 col-span-2"
                >
                  Waktu pelaksanaan tidak valid
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="p-4 rounded-lg bg-white mb-4">
          <div class="flex flex-col">
            <h2 class="font-roboto font-medium text-green-700 mb-3">
              Kategori Agenda
            </h2>
            <div class="flex flex-col gap-4">
              <JdsSelect
                v-model="form.category"
                label="Kategori Agenda"
                placeholder="Pilih kategori"
                :options="categories"
              />
              <div class="flex flex-col gap-2 relative">
                <label
                  for="tag"
                  class="text-[15px] text-gray-800"
                >
                  Tag <span class="text-gray-500">(Opsional)</span>
                </label>
                <input
                  id="tag"
                  v-model.trim="tag"
                  class="border border-gray-500 rounded-lg px-2 py-1 placeholder:text-gray-600 text-gray-600 bg-gray-50 hover:bg-white hover:border-green-600 focus:outline-none focus:border-green-500 focus:outline-1 focus:outline-offset-[-2px] focus:outline-yellow-500"
                  placeholder="Ketikkan tag disini lalu tekan enter"
                  @keyup.enter="onTagInputEnter()"
                >
                <div
                  v-show="hasTagSuggestions"
                  class="absolute w-full mt-[72px] z-20"
                >
                  <JdsOptions
                    class="w-full"
                    :options="tagSuggestions"
                    @click:option="onTagSuggestionsClick"
                  />
                </div>
                <div class="border border-gray-500 overflow-y-auto rounded-lg p-2 h-[88px] text-gray-600 bg-gray-50 hover:bg-white hover:border-green-600 focus:outline-none focus:border-green-500 focus:outline-1 focus:outline-offset-[-2px] focus:outline-yellow-500">
                  <div
                    v-if="hasTags"
                    class="flex gap-1 flex-wrap"
                  >
                    <div
                      v-for="(tag, index) in form.tags"
                      :key="index"
                      class="bg-gray-200 text-gray-700 text-sm rounded-3xl px-[10px] py-[6px] flex items-center justify-center gap-1"
                    >
                      {{ tag.tag_name }}
                      <JdsIcon
                        name="times"
                        size="12px"
                        class="pt-[2px] cursor-pointer"
                        @click="removeTag(index)"
                      />
                    </div>
                  </div>
                  <p v-else>
                    Belum ada tag
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    <AgendaPreview
      :open="isPreviewModalOpen"
      :event="form"
      @close="togglePreviewModal"
    />
    <BaseModal :open="isMessageModalOpen">
      <div class="w-full h-full px-2 pb-4">
        <h1 class="font-roboto font-medium text-green-700 text-[21px] leading-[34px] mb-6">
          {{ messageTitle }}
        </h1>
        <div class="flex items-center gap-4">
          <JdsIcon
            :name="messageIconName"
            :class="messageIconClassName"
          />
          <p class="text-sm leading-6 to-blue-gray-800">
            {{ messageBody }}
          </p>
        </div>
      </div>
      <template #footer>
        <div class="flex w-full h-full items-center justify-center gap-4 p-2">
          <BaseButton
            class="bg-green-700 hover:bg-green-600 text-sm text-white"
            @click="messageAction"
          >
            Saya Mengerti
          </BaseButton>
        </div>
      </template>
    </BaseModal>
    <BaseModal :open="isConfirmationModalOpen">
      <div class="w-full h-full px-2 pb-4">
        <h1 class="font-roboto font-medium text-green-700 text-[21px] leading-[34px] mb-6">
          Simpan Agenda
        </h1>
        <div class="flex items-center gap-4">
          <p class="text-sm leading-6 to-blue-gray-800">
            Apakah Anda ingin menyimpan agenda ini terlebih dahulu?
          </p>
        </div>
      </div>
      <template #footer>
        <div class="flex w-full h-full items-center justify-end gap-4 p-2">
          <BaseButton
            class="border border-green-700 hover:bg-green-50 text-sm text-green-700"
            @click="onCancel"
          >
            Tidak perlu simpan
          </BaseButton>
          <BaseButton
            class="bg-green-700 hover:bg-green-600 text-sm text-white"
            @click="onConfirm"
          >
            Ya, simpan agenda
          </BaseButton>
        </div>
      </template>
    </BaseModal>
    <BaseModal :open="isUnauthorizedModalOpen">
      <div class="w-full h-full px-2 pb-4">
        <h1 class="font-roboto font-medium text-green-700 text-[21px] leading-[34px] mb-6">
          Pengubahan tidak diizinkan!
        </h1>
        <p class="text-gray-800 text-sm">
          Anda tidak punya akses untuk mengubah agenda ini.
        </p>
      </div>
      <template #footer>
        <div class="flex w-full h-full items-center justify-center gap-4 p-2">
          <BaseButton
            type="button"
            class="bg-green-700 hover:bg-green-600 text-sm text-white"
            @click="$router.push('/agenda');"
          >
            Saya mengerti
          </BaseButton>
        </div>
      </template>
    </BaseModal>
    <ProgressModal
      :open="loading"
      :value="progress"
    />
  </main>
</template>

<script>
import debounce from 'lodash.debounce';
import ProgressModal from '@/common/components/ProgressModal';
import {
  daysDifference, formatDate, isToday, minutesDifference,
} from '@/common/helpers/date';
import { AGENDA_CATEGORIES } from '@/common/constants';
import HeaderMenu from '@/common/components/HeaderMenu';
import BaseButton from '@/common/components/BaseButton';
import BaseModal from '@/common/components/BaseModal';
import AgendaPreview from '@/components/Agenda/AgendaPreview.vue';
import SaveIcon from '@/assets/icons/save.svg?inline';
import LinkIcon from '@/assets/icons/link.svg?inline';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const agendaRepository = RepositoryFactory.get('agenda');
const tagRepository = RepositoryFactory.get('tag');

export default {
  name: 'CreateEditAgenda',
  components: {
    HeaderMenu,
    BaseButton,
    BaseModal,
    AgendaPreview,
    SaveIcon,
    LinkIcon,
    ProgressModal,
  },
  beforeRouteLeave(to, from, next) {
    this.targetRoute = to;

    if (!this.isInputValid || this.isFormSubmitted || this.isConfirmToLeave) {
      next();
    } else {
      this.isConfirmationModalOpen = true;
      next(false);
    }
  },
  data() {
    return {
      form: {
        title: '',
        type: 'offline',
        address: '',
        url: '',
        date: formatDate(new Date(), 'dd/MM/yyyy'),
        start_hour: '',
        end_hour: '',
        category: '',
        tags: [],
      },
      isUrlValid: true,
      isUrlInputTouched: false,
      isUrlBeingValidated: false,
      types: [
        { label: 'Offline', value: 'offline' },
        { label: 'Online', value: 'online' },
      ],
      categories: AGENDA_CATEGORIES,
      tag: '',
      tagSuggestions: [],
      isTodayChecked: true,
      loading: false,
      progress: 0,
      errorMessage: {
        title: '',
        body: '',
      },
      successMessage: {
        title: '',
        body: '',
      },
      isUnauthorizedModalOpen: false,
      isMessageModalOpen: false,
      isPreviewModalOpen: false,
      isConfirmationModalOpen: false,
      isConfirmToLeave: false,
      isFormSubmitted: false,
      targetRoute: null,
    };
  },
  computed: {
    mode() {
      return this.$route.meta?.mode || 'create';
    },
    isEditMode() {
      return this.mode === 'edit';
    },
    submitButtonLabel() {
      return this.isEditMode ? 'Simpan Perubahan' : 'Tambah Agenda';
    },
    isTypeOffline() {
      return this.form.type === 'offline';
    },
    hasTags() {
      return Array.isArray(this.form.tags) && !!this.form.tags.length;
    },
    hasTagSuggestions() {
      return this.tagSuggestions.length > 0;
    },
    hasStartHour() {
      return !!this.form.start_hour;
    },
    hasEndHour() {
      return !!this.form.end_hour;
    },
    isInputValid() {
      const hasTitle = !this.isEmpty(this.form.title);
      const hasType = !this.isEmpty(this.form.type);
      const hasAddress = this.isTypeOffline ? !this.isEmpty(this.form.address) : true;
      const hasValidUrl = this.isTypeOffline || (!this.isEmpty(this.form.url) && this.isUrlValid && !this.isUrlBeingValidated);
      const hasDate = !this.isEmpty(this.form.date);
      const hasStartHour = !this.isEmpty(this.form.start_hour);
      const hasEndHour = !this.isEmpty(this.form.end_hour);
      const hasCategory = !this.isEmpty(this.form.category);

      return hasTitle && hasType && hasAddress && hasValidUrl && hasDate && hasStartHour && hasEndHour && hasCategory;
    },
    today() {
      return new Date().setHours(0, 0, 0, 0);
    },
    isSuccess() {
      return !!this.successMessage.title && !!this.successMessage.body;
    },
    isError() {
      return !!this.errorMessage.title && !!this.errorMessage.body;
    },
    isLoading() {
      return this.loading;
    },
    messageTitle() {
      return this.isSuccess ? this.successMessage.title : this.errorMessage.title;
    },
    messageBody() {
      return this.isSuccess ? this.successMessage.body : this.errorMessage.body;
    },
    messageIconName() {
      return this.isSuccess ? 'check-mark-circle' : 'warning';
    },
    messageIconClassName() {
      return this.isSuccess ? 'text-green-600' : 'text-red-600';
    },
    selectedDate() {
      const date = this.form.date.split('/');
      const year = date[2];
      // month is zero based, we need to subtract 1
      const month = date[1] - 1;
      const day = date[0];

      return new Date(year, month, day);
    },
    isDateHasPassed() {
      return daysDifference(this.selectedDate, this.today) < 0;
    },
    isTimeHasPassed() {
      if (!this.hasEndHour) return false;

      const startHour = this.form.start_hour.split(':');
      const endHour = this.form.end_hour.split(':');
      const isStartHourHasPassed = isToday(this.selectedDate) && minutesDifference(new Date().setHours(...startHour), new Date()) < 0;
      const isEndHourHasPassed = minutesDifference(new Date().setHours(...startHour), new Date().setHours(...endHour)) >= 0;

      return this.isDateHasPassed || isStartHourHasPassed || isEndHourHasPassed;
    },
    isFormValid() {
      return this.isInputValid && !this.isDateHasPassed && !this.isTimeHasPassed;
    },
  },
  watch: {
    isTodayChecked() {
      if (this.isTodayChecked) {
        this.setDate(formatDate(this.today, 'dd/MM/yyyy'));
      }
    },
    isSuccess() {
      this.setMessageModalVisibility(this.isSuccess);
    },
    isError() {
      this.setMessageModalVisibility(this.isError);
    },
    'form.date': function () {
      this.isTodayChecked = isToday(this.selectedDate);
    },
    'form.url': function () {
      if (this.form.url !== '') {
        this.isUrlBeingValidated = true;
        this.validateUrl();
      }
    },
    tag() {
      if (this.tag) {
        this.getTagSuggestions();
      } else {
        this.clearTagSuggestions();
      }
    },
  },
  async mounted() {
    if (this.isEditMode) {
      try {
        const { id } = this.$route.params;
        const response = await agendaRepository.getEventById(id);
        const { data } = response.data;
        this.form = {
          title: data.title,
          type: data.type,
          address: data.address,
          url: data.url,
          date: formatDate(data.date, 'dd/MM/yyyy'),
          start_hour: data.start_hour,
          end_hour: data.end_hour,
          category: data.category,
          tags: data.tags,
        };
      } catch (error) {
        if (error.response?.status === 403) {
          this.isUnauthorizedModalOpen = true;
        }
      }
    }
  },
  methods: {
    appendUrl(url) {
      if (url.startsWith('http') || url === '') return url;

      return `https://${url}`;
    },
    validateUrl: debounce(function () {
      const url = this.appendUrl(this.form.url);
      const response = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/g);

      this.isUrlValid = response !== null;
      this.isUrlInputTouched = true;
      this.isUrlBeingValidated = false;
    }, 500),
    isEmpty(string) {
      return string === '';
    },
    setType(type) {
      this.form.type = type;
    },
    getTagSuggestions: debounce(async function () {
      try {
        const response = await tagRepository.getTagSuggestions({ q: this.tag });
        const tagSuggestions = response.data.map((tag) => tag.name).slice(0, 5);
        this.setTagSuggestions(tagSuggestions);
      } catch (error) {
        this.clearTagSuggestions();
      }
    }, 500),
    onTagSuggestionsClick(tag) {
      this.setTags(tag);
      this.clearTag();
      this.clearTagSuggestions();
    },
    setTagSuggestions(tagSuggestions) {
      this.tagSuggestions = tagSuggestions;
    },
    clearTagSuggestions() {
      this.tagSuggestions = [];
    },
    setTags(tag) {
      this.form.tags.push({ tag_name: tag });
    },
    setDate(date) {
      this.form.date = date;
    },
    removeTag(index) {
      this.form.tags.splice(index, 1);
    },
    clearTag() {
      this.tag = '';
    },
    setMessageModalVisibility(value) {
      this.isMessageModalOpen = value;
    },
    togglePreviewModal() {
      this.isPreviewModalOpen = !this.isPreviewModalOpen;
    },
    clearErrorMessage() {
      this.errorMessage = { title: '', body: '' };
    },
    clearSuccessMessage() {
      this.successMessage = { title: '', body: '' };
    },
    clearAllMessages() {
      this.clearErrorMessage();
      this.clearSuccessMessage();
    },
    onTagInputEnter() {
      const tag = this.tag.trim().split(' ').join('-').toLowerCase();
      if (!this.isEmpty(tag)) {
        this.setTags(tag);
        this.clearTag();
      }
    },
    closeModal() {
      this.setMessageModalVisibility(false);
    },
    messageAction() {
      if (this.isSuccess) {
        this.$router.push('/agenda');
        this.clearAllMessages();
      } else {
        this.closeModal();
        this.clearAllMessages();
      }
    },
    onSubmit() {
      this.loading = true;
      this.progress = 20;
      const data = {
        ...this.form,
        url: this.appendUrl(this.form.url),
        date: formatDate(this.selectedDate, 'yyyy-MM-dd'),
        tags: this.form.tags.map((tag) => tag.tag_name),
      };
      if (this.isEditMode) {
        this.updateEvent(data);
      } else {
        this.createEvent(data);
      }
    },
    async createEvent(data) {
      this.progress = 50;
      try {
        await agendaRepository.createEvent(data);
        this.successMessage = {
          title: 'Tambah Agenda Berhasil',
          body: 'Agenda yang Anda buat berhasil ditambahkan.',
        };
        this.isFormSubmitted = true;
      } catch (error) {
        this.errorMessage = {
          title: 'Tambah Agenda Gagal',
          body: 'Agenda yang Anda buat gagal ditambahkan.',
        };
      } finally {
        this.loading = false;
        this.progress = 100;
      }
    },
    async updateEvent(data) {
      this.progress = 50;
      try {
        const { id } = this.$route.params;
        await agendaRepository.updateEvent(id, data);
        this.successMessage = {
          title: 'Simpan Agenda Berhasil',
          body: 'Agenda yang Anda buat berhasil disimpan.',
        };
        this.isFormSubmitted = true;
      } catch (error) {
        this.errorMessage = {
          title: 'Simpan Agenda Gagal',
          body: 'Agenda yang Anda buat gagal disimpan.',
        };
      } finally {
        this.loading = false;
        this.progress = 100;
      }
    },
    onCancel() {
      this.isConfirmationModalOpen = false;
      this.isConfirmToLeave = true;
      this.$router.push(this.targetRoute);
    },
    async onConfirm() {
      this.isConfirmationModalOpen = false;
      try {
        await this.onSubmit();
        this.isFormSubmitted = true;
      } catch (error) {
        this.isFormSubmitted = false;
      }
    },
  },
};
</script>

<style>
.agenda__form .jds-popover,
.agenda__form .jds-date-input {
  width: 100%;
}
.agenda__form .jds-form-control-label {
  margin-bottom: 4px !important;
}
.agenda__form .jds-select,
.agenda__form .jds-popover__activator,
.agenda__form .jds-input-text {
  width: 100% !important;
}
.agenda__form .jds-text-area__input-wrapper > textarea {
  border: 1px solid #9E9E9E;
}
.agenda__form .jds-text-area__input-wrapper > textarea:hover {
  border: 1px solid #16a34a;
}
.agenda__form .jds-popover__content {
  background-color: white;
  z-index: 10 !important;
}
.agenda__form .jds-calendar {
  max-width: none !important;
}
.agenda__form .jds-calendar .jds-calendar__list-of-days,
.agenda__form .jds-calendar .jds-calendar__days {
  display: grid !important;
  grid-template-columns: repeat(7, 1fr) !important;
}
</style>
