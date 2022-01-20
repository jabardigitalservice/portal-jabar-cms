<template>
  <main>
    <HeaderMenu>
      <div class="flex gap-4">
        <BaseButton
          class="border-green-700 hover:bg-green-50 font-lato text-sm text-green-700"
          @click="togglePreviewModal"
        >
          <template #icon-left>
            <JdsIcon
              name="eye"
              size="16px"
              class="h-4 text-green-700"
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
          <img
            src="@/assets/icons/save.svg"
            alt="Save"
            width="20"
            height="20"
          >
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
            <JdsInputText
              v-model.trim="form.url"
              placeholder="Masukkan link kegiatan"
            >
              <template #prefix-icon>
                <img
                  src="@/assets/icons/link.svg"
                  width="16"
                  height="16"
                  alt="Link"
                >
              </template>
              />
            </JdsInputText>
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
              <div class="flex flex-col gap-2">
                <label
                  for="tag"
                  class="text-[15px] text-gray-800"
                >
                  Tag
                </label>
                <input
                  id="tag"
                  v-model.trim="tag"
                  class="border border-gray-500 rounded-lg px-2 py-1 placeholder:text-gray-600 text-gray-600 bg-gray-50 hover:bg-white hover:border-green-600 focus:outline-none focus:border-green-500 focus:outline-1 focus:outline-offset-[-2px] focus:outline-yellow-500"
                  placeholder="Ketikkan tag disini lalu tekan enter"
                  @keyup.enter="onTagInputEnter()"
                >
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
  </main>
</template>

<script>
import { daysDifference, formatDate, minutesDifference } from '@/lib/date-fns';
import { AGENDA_CATEGORIES } from '@/static/data';
import HeaderMenu from '@/components/ui/HeaderMenu.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseModal from '@/components/ui/BaseModal';
import AgendaPreview from '@/components/Agenda/AgendaPreview.vue';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const agendaRepository = RepositoryFactory.get('agenda');

export default {
  name: 'AgendaForm',
  components: {
    HeaderMenu,
    BaseButton,
    BaseModal,
    AgendaPreview,
  },
  props: {
    mode: {
      type: String,
      default: 'create',
      validator(value) {
        return ['create', 'edit']
          .includes(value) !== -1;
      },
    },
  },
  data() {
    return {
      form: {
        title: '',
        type: 'offline',
        address: '',
        url: '',
        date: '',
        start_hour: '',
        end_hour: '',
        category: '',
        tags: [],
      },
      types: [
        { label: 'Offline', value: 'offline' },
        { label: 'Online', value: 'online' },
      ],
      categories: AGENDA_CATEGORIES,
      tag: '',
      isTodayChecked: false,
      loading: false,
      errorMessage: {
        title: '',
        body: '',
      },
      successMessage: {
        title: '',
        body: '',
      },
      isMessageModalOpen: false,
      isPreviewModalOpen: false,
    };
  },
  computed: {
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
      const hasUrl = this.isTypeOffline ? true : !this.isEmpty(this.form.url);
      const hasDate = !this.isEmpty(this.form.date);
      const hasStartHour = !this.isEmpty(this.form.start_hour);
      const hasEndHour = !this.isEmpty(this.form.end_hour);
      const hasCategory = !this.isEmpty(this.form.category);
      const hasTags = Array.isArray(this.form.tags) && !!this.form.tags.length;

      return hasTitle && hasType && hasAddress && hasUrl && hasDate && hasStartHour && hasEndHour && hasCategory && hasTags;
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

      return minutesDifference(new Date().setHours(...startHour), new Date().setHours(...endHour)) >= 0;
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
      const isToday = daysDifference(this.selectedDate, this.today);
      this.isTodayChecked = !isToday;
    },
  },
  async mounted() {
    if (this.isEditMode) {
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
    }
  },
  methods: {
    isEmpty(string) {
      return string === '';
    },
    setType(type) {
      this.form.type = type;
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
      const data = {
        ...this.form,
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
      try {
        this.loading = true;
        await agendaRepository.createEvent(data);
        this.successMessage = {
          title: 'Tambah Agenda Berhasil',
          body: 'Agenda yang Anda buat berhasil ditambahkan.',
        };
      } catch (error) {
        this.errorMessage = {
          title: 'Tambah Agenda Gagal',
          body: 'Agenda yang Anda buat gagal ditambahkan.',
        };
      } finally {
        this.loading = false;
      }
    },
    async updateEvent(data) {
      try {
        this.loading = true;
        const { id } = this.$route.params;
        await agendaRepository.updateEvent(id, data);
        this.successMessage = {
          title: 'Simpan Agenda Berhasil',
          body: 'Agenda yang Anda buat berhasil disimpan.',
        };
      } catch (error) {
        this.errorMessage = {
          title: 'Simpan Agenda Gagal',
          body: 'Agenda yang Anda buat gagal disimpan.',
        };
      } finally {
        this.loading = false;
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
