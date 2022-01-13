<template>
  <main>
    <form class="grid grid-cols-3 gap-4">
      <div class="col-span-2">
        <div class="p-4 rounded-lg bg-white mb-4">
          <div class="flex flex-col">
            <h2 class="font-roboto font-medium text-green-700 mb-3">
              Judul Agenda/Event
            </h2>
            <JdsInputText
              v-model="form.title"
              placeholder="Masukkan judul berita"
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
              v-model="form.location"
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
              v-model="form.url"
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
                  v-model="tag"
                  class="border border-gray-500 rounded-lg px-2 py-1 placeholder:text-gray-600 text-gray-600 bg-gray-50 hover:bg-white hover:border-green-600 focus:outline-none focus:border-green-500 focus:outline-1 focus:outline-offset-[-2px] focus:outline-yellow-500"
                  placeholder="Ketikkan tag disini lalu tekan enter"
                  @keyup.enter="onTagInputEnter()"
                >
                <div class="border border-gray-500 rounded-lg px-2 py-1 h-24 text-gray-600 bg-gray-50 hover:bg-white hover:border-green-600 focus:outline-none focus:border-green-500 focus:outline-1 focus:outline-offset-[-2px] focus:outline-yellow-500">
                  Belum ada tag
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
import { AGENDA_CATEGORIES } from '@/static/data';

export default {
  name: 'CreateAgenda',
  data() {
    return {
      form: {
        title: '',
        type: 'offline',
        location: '',
        url: '',
        date: '',
        startHour: '00:00',
        endHour: '00:00',
        category: '',
        tags: [],
      },
      types: [
        { label: 'Offline', value: 'offline' },
        { label: 'Online', value: 'online' },
      ],
      categories: AGENDA_CATEGORIES,
      tag: '',
    };
  },
  computed: {
    isTypeOffline() {
      return this.form.type === 'offline';
    },
  },
  methods: {
    setType(type) {
      this.form.type = type;
    },
    setTags(tag) {
      this.form.tags.push(tag);
    },
    clearTag() {
      this.tag = '';
    },
    onTagInputEnter() {
      this.setTags(this.tag);
      this.clearTag();
    },
  },
};
</script>

<style>
.jds-form-control-label {
  margin-bottom: 4px !important;
}
.jds-select,
.jds-popover__activator,
.jds-input-text {
  width: 100% !important;
}
.jds-text-area__input-wrapper > textarea {
  border: 1px solid #16a34a;
}
.jds-popover__content {
  background-color: white;
  z-index: 10 !important;
}
</style>
