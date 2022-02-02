<template>
  <main class="pb-5">
    <HeaderMenu>
      <template #info>
        <p class="ml-4 text-gray-600 text-sm">
          Terakhir disimpan pada: 12/01/2022 - 15:00
        </p>
      </template>
      <div class="flex gap-4">
        <BaseButton class="border-green-700 hover:bg-green-50 font-lato text-sm text-green-700">
          <template #icon-left>
            <img
              src="@/assets/icons/review.svg"
              alt="Pratinjau"
              width="20"
              height="20"
            >
          </template>
          <p>
            Pratinjau
          </p>
        </BaseButton>
        <BaseButton class="border-green-700 hover:bg-green-50 font-lato text-sm text-green-700">
          <img
            src="@/assets/icons/publish.svg"
            alt="Ajukan"
            width="20"
            height="20"
          >
          <p>
            Ajukan untuk Diterbitkan
          </p>
        </BaseButton>
        <BaseButton class="bg-green-700 hover:bg-green-600 font-lato text-sm text-white">
          <img
            src="@/assets/icons/draft.svg"
            alt="Simpan"
            width="20"
            height="20"
          >
          <p>
            {{ submitButtonLabel }}
          </p>
        </BaseButton>
      </div>
    </HeaderMenu>
    <form class="news__form grid grid-cols-3 gap-4">
      <div class="col-span-2">
        <div class="p-4 rounded-lg bg-white mb-4">
          <div class="flex flex-col">
            <h2 class="font-roboto font-medium text-green-700 mb-3">
              Judul Berita
            </h2>
            <textarea
              v-model.trim="form.title"
              placeholder="Masukkan judul berita"
              rows="4"
              maxlength="250"
              class="border border-gray-500 rounded-lg px-2 py-1 bg-gray-50 mb-1 hover:bg-white hover:border-green-600 focus:outline-none focus:border-green-500 focus:outline-1 focus:outline-offset-[-2px] focus:outline-yellow-500"
            />
            <p class="text-xs text-gray-600">
              Tersisa {{ availableCharacter }} karakter
            </p>
          </div>
        </div>
        <div class="p-4 rounded-lg bg-white mb-4">
          <div class="flex flex-col">
            <h2 class="font-roboto font-medium text-green-700 mb-3">
              Hero Banner
            </h2>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-gray-50 rounded-md border-2 border-dashed border-gray-200 aspect-w-16 aspect-h-9">
                <div class="grid place-content-center">
                  <img
                    src="@/assets/icons/image.svg"
                    alt="Gambar hero banner"
                    width="45"
                    height="45"
                  >
                </div>
              </div>
              <div>
                <div class="text-blue-gray-800 mb-3">
                  <p class="font-roboto font-medium leading-7">
                    Upload file
                  </p>
                  <p class="text-sm leading-6">
                    Ukuran maksimal 5 Mb, dengan resolusi 1600x900. File yang didukung adalah .jpg dan .png
                  </p>
                </div>
                <div class="flex items-center gap-4">
                  <label>
                    <div class="h-[38px] px-4 flex items-center rounded-lg border whitespace-nowrap font-bold bg-green-700 hover:bg-green-600 font-lato text-sm text-white cursor-pointer">
                      <div class="flex gap-4">
                        <JdsIcon
                          name="plus"
                          size="16px"
                          class="h-4"
                        />
                        <p>Pilih File</p>
                      </div>
                    </div>
                    <input
                      type="file"
                      accept="image/png, image/jpg"
                      class="hidden"
                    >
                  </label>
                  <p class="text-blue-gray-800 text-sm">
                    Belum ada file terpilih
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="min-h-[500px]">
          <Editor
            v-model="form.content"
            :api-key="tinyMceApiKey"
            cloud-channel="5"
            placeholder="Tulis isi berita di sini"
            :init="{
              height: 500,
              skin_url: '/tinymce-skin-ipj/',
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar:
                'undo redo | formatselect | bold italic bullist numlist blockquote strikethrough backcolor | \
                alignleft aligncenter alignright alignjustify | \
                outdent indent | link image media | fullscreen ',
            }"
          />
        </div>
      </div>
      <div>
        <div class="p-4 rounded-lg bg-white mb-4">
          <div class="flex flex-col mb-4">
            <h2 class="font-roboto font-medium text-green-700 mb-3">
              Waktu Penayangan Berita
            </h2>
            <div class="flex flex-col gap-4">
              <JdsSelect
                v-model="duration"
                label="Durasi Penayangan"
                placeholder="Pilih durasi"
                :options="newsDuration"
              />
            </div>
          </div>
          <div>
            <div class="flex justify-between items-center mb-1">
              <p class="text-[15px] text-gray-800">
                Waktu Penayangan
              </p>
            </div>
            <div class="flex items-center gap-4">
              <JdsDateInput v-model="form.start_date" />
              <p class="text-sm whitespace-nowrap w-full">
                sampai <span class="font-bold">{{ endDate }}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="p-4 rounded-lg bg-white mb-4">
          <div class="flex flex-col">
            <h2 class="font-roboto font-medium text-green-700 mb-3">
              Kategori/Topik dan Tag Berita
            </h2>
            <div class="flex flex-col gap-4">
              <JdsSelect
                v-model="form.category"
                label="Kategori/Topik"
                placeholder="Pilih kategori/topik"
                :options="newsCategories"
                filterable
              />
              <div class="flex flex-col gap-2">
                <label
                  for="tag"
                  class="text-[15px] text-gray-800"
                >
                  Tag (Opsional)
                </label>
                <input
                  id="tag"
                  v-model.trim="tag"
                  class="border border-gray-500 rounded-lg px-2 py-1 placeholder:text-gray-600 text-gray-600 bg-gray-50 hover:bg-white hover:border-green-600 focus:outline-none focus:border-green-500 focus:outline-1 focus:outline-offset-[-2px] focus:outline-yellow-500"
                  placeholder="Tambahkan tag lalu tekan 'enter'"
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
  </main>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
import { formatDate } from '@/common/helpers/date';
import HeaderMenu from '@/common/components/HeaderMenu';
import BaseButton from '@/common/components/BaseButton';
import { NEWS_CATEGORIES, NEWS_DURATION } from '@/common/constants';

export default {
  name: 'CreateEditNews',
  components: {
    HeaderMenu,
    BaseButton,
    Editor,
  },
  data() {
    return {
      form: {
        title: '',
        content: '',
        start_date: formatDate(new Date(), 'dd/MM/yyyy'),
        category: '',
        tags: [],
      },
      newsDuration: NEWS_DURATION,
      newsCategories: NEWS_CATEGORIES,
      duration: null,
      tag: '',
      tinyMceApiKey: process.env.VUE_APP_TINY_MCE_API_KEY,
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
      return this.isEditMode ? 'Simpan Perubahan' : 'Simpan Berita';
    },
    availableCharacter() {
      return 250 - this.form.title.length;
    },
    hasTags() {
      return Array.isArray(this.form.tags) && !!this.form.tags.length;
    },
    endDate() {
      const duration = this.duration || 5;
      const startDate = new Date(this.selectedDate);
      const endDate = formatDate(startDate.setDate(startDate.getDate() + duration - 1), 'dd-MM-yyyy');

      return this.duration === 0 ? 'tanpa batas' : endDate;
    },
    selectedDate() {
      const date = this.form.start_date.split('/');
      const year = date[2];
      const month = date[1] - 1;
      const day = date[0];

      return new Date(year, month, day);
    },
  },
  methods: {
    isEmpty(string) {
      return string === '';
    },
    onTagInputEnter() {
      const tag = this.tag.trim().split(' ').join('-').toLowerCase();
      if (!this.isEmpty(tag)) {
        this.setTags(tag);
        this.clearTag();
      }
    },
    setTags(tag) {
      this.form.tags.push({ tag_name: tag });
    },
    removeTag(index) {
      this.form.tags.splice(index, 1);
    },
    clearTag() {
      this.tag = '';
    },
  },
};
</script>

<style>
.news__form .jds-popover,
.news__form .jds-popover__activator,
.news__form .jds-select,
.news__form .jds-input-text {
  width: 100% !important;
}
.news__form .jds-popover__content {
  z-index: 10 !important;
  background-color: white !important;
}
.news__form .jds-select__options.jds-options--filterable {
  max-height: 200px !important;
}
.news__form .jds-calendar {
  max-width: none !important;
}
.news__form .jds-calendar .jds-calendar__list-of-days,
.news__form .jds-calendar .jds-calendar__days {
  display: grid !important;
  grid-template-columns: repeat(7, 1fr) !important;
}
</style>
