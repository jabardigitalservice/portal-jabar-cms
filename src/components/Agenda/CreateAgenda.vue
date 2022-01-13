<template>
  <main>
    <HeaderMenu>
      <div class="flex gap-4">
        <BaseButton
          variant="secondary"
        >
          <template #icon-left>
            <JdsIcon
              name="eye"
              size="16px"
              class="h-4 text-green-700"
            />
          </template>
          <p class="font-lato font-bold text-sm text-green-700">
            Pratinjau
          </p>
        </BaseButton>
        <BaseButton
          :disabled="!isInputValid"
          :class="{'cursor-not-allowed': !isInputValid}"
        >
          <img
            src="@/assets/icons/save.svg"
            alt="Save"
            width="20"
            height="20"
          >
          <p class="font-lato font-bold text-sm text-white">
            Simpan Agenda
          </p>
        </BaseButton>
      </div>
    </HeaderMenu>
    <form class="create-agenda__form grid grid-cols-3 gap-4">
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
            <div class="grid grid-cols-2 grid-rows-2 gap-x-6 gap-y-4">
              <JdsDateInput
                v-model="form.date"
                label="Pilih Tanggal"
              />
              <JdsCheckbox
                v-model="isTodayChecked"
                class="self-end py-2"
                text="Hari ini"
              />
              <div class="flex flex-col gap-1">
                <label
                  for="start-time"
                  class="text-[15px] text-gray-800"
                >
                  Waktu Dimulai
                </label>
                <input
                  id="start-time"
                  v-model="form.startHour"
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
                  v-model="form.endHour"
                  type="time"
                  class="border border-gray-500 rounded-lg px-2 py-1 bg-gray-50 hover:bg-white hover:border-green-600 focus:outline-none focus:border-green-500 focus:outline-1 focus:outline-offset-[-2px] focus:outline-yellow-500"
                >
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
                      v-for="(tagName, index) in form.tags"
                      :key="index"
                      class="bg-gray-200 text-gray-700 text-sm rounded-3xl px-[10px] py-[6px] flex items-center justify-center gap-1"
                    >
                      {{ tagName }}
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
  </main>
</template>

<script>
import { formatDate } from '@/lib/date-fns';
import { AGENDA_CATEGORIES } from '@/static/data';
import HeaderMenu from '@/components/ui/HeaderMenu.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

export default {
  name: 'CreateAgenda',
  components: {
    HeaderMenu,
    BaseButton,
  },
  data() {
    return {
      form: {
        title: '',
        type: 'offline',
        address: '',
        url: '',
        date: '',
        startHour: '',
        endHour: '',
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
    };
  },
  computed: {
    isTypeOffline() {
      return this.form.type === 'offline';
    },
    hasTags() {
      return Array.isArray(this.form.tags) && !!this.form.tags.length;
    },
    isInputValid() {
      const hasTitle = !this.isEmpty(this.form.title);
      const hasType = !this.isEmpty(this.form.type);
      const hasAddress = this.isTypeOffline ? !this.isEmpty(this.form.address) : true;
      const hasUrl = this.isTypeOffline ? true : !this.isEmpty(this.form.url);
      const hasDate = !this.isEmpty(this.form.date);
      const hasStartHour = !this.isEmpty(this.form.startHour);
      const hasEndHour = !this.isEmpty(this.form.endHour);
      const hasCategory = !this.isEmpty(this.form.category);
      const hasTags = Array.isArray(this.form.tags) && !!this.form.tags.length;

      return hasTitle && hasType && hasAddress && hasUrl && hasDate && hasStartHour && hasEndHour && hasCategory && hasTags;
    },
    today() {
      return formatDate(new Date(), 'dd/MM/yyyy');
    },
  },
  watch: {
    isTodayChecked() {
      if (this.isTodayChecked) {
        this.setDate(this.today);
      }
    },
  },
  methods: {
    isEmpty(string) {
      return string === '';
    },
    setType(type) {
      this.form.type = type;
    },
    setTags(tag) {
      this.form.tags.push(tag);
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
    onTagInputEnter() {
      const tag = this.tag.trim().split(' ').join('-').toLowerCase();
      if (!this.isEmpty(tag)) {
        this.setTags(tag);
        this.clearTag();
      }
    },
  },
};
</script>

<style>
.create-agenda__form .jds-form-control-label {
  margin-bottom: 4px !important;
}
.create-agenda__form .jds-select,
.create-agenda__form .jds-popover__activator,
.create-agenda__form .jds-input-text {
  width: 100% !important;
}
.create-agenda__form .jds-text-area__input-wrapper > textarea {
  border: 1px solid #16a34a;
}
.create-agenda__form .jds-popover__content {
  background-color: white;
  z-index: 10 !important;
}
.create-agenda__form .jds-calendar {
  max-width: none !important;
}
.create-agenda__form .jds-calendar .jds-calendar__list-of-days,
.create-agenda__form .jds-calendar .jds-calendar__days {
  display: grid !important;
  grid-template-columns: repeat(7, 1fr) !important;
}
</style>
