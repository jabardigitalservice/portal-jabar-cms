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
            <ReviewIcon class="fill-green-700" />
          </template>
          <p>
            Pratinjau
          </p>
        </BaseButton>
        <BaseButton class="border-green-700 hover:bg-green-50 font-lato text-sm text-green-700">
          <PublishIcon class="fill-green-700" />
          <p>
            Ajukan untuk Diterbitkan
          </p>
        </BaseButton>
        <BaseButton class="bg-green-700 hover:bg-green-600 font-lato text-sm text-white">
          <DraftIcon class="fill-white" />
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
              <div
                v-if="hasImagePreview"
                class="rounded-md aspect-w-16 aspect-h-9"
              >
                <div class="grid place-content-center">
                  <img :src="imagePreview">
                </div>
              </div>
              <div
                v-else
                class="bg-gray-50 rounded-md border-2 border-dashed border-gray-200 aspect-w-16 aspect-h-9"
              >
                <div class="grid place-content-center">
                  <JdsSpinner
                    v-if="loading"
                    size="45"
                  />
                  <img
                    v-else
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
                    Ukuran maksimal 5 MB, dengan resolusi 1600x900. File yang didukung adalah .jpg dan .png
                  </p>
                </div>
                <div
                  v-if="hasImagePreview"
                  class="flex items-center gap-4"
                >
                  <BaseButton
                    class="text-red-500 font-lato text-sm !border-none"
                    @click="removeImage"
                  >
                    <template #icon-left>
                      <JdsIcon
                        name="trash"
                        size="16px"
                      />
                    </template>
                    <p>
                      Hapus
                    </p>
                  </BaseButton>
                  <label>
                    <div class="h-[38px] px-4 flex items-center rounded-lg border whitespace-nowrap font-bold bg-white hover:bg-green-50 text-green-700 border border-green-700 font-lato text-sm text-white cursor-pointer">
                      <div class="flex gap-4">
                        <JdsIcon
                          name="pencil"
                          size="16px"
                        />
                        <p>Ubah</p>
                      </div>
                    </div>
                    <input
                      :value="form.image.filename"
                      type="file"
                      accept="image/png, image/jpg"
                      class="hidden"
                      @change="onImageUpload"
                    >
                  </label>
                </div>
                <div
                  v-else
                  class="flex items-center gap-4"
                >
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
                      :value="form.image.filename"
                      type="file"
                      accept="image/png, image/jpg"
                      class="hidden"
                      @change="onImageUpload"
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
            placeholder="Tulis isi berita di sini"
            v-bind="{...tinyMceConfig}"
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
              <p class="text-[15px] text-blue-gray-800">
                Waktu Penayangan
              </p>
            </div>
            <div class="flex items-center gap-4">
              <JdsDateInput v-model="form.start_date" />
              <p class="text-sm whitespace-nowrap w-full text-blue-gray-800">
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
                  class="text-[15px] text-blue-gray-800"
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
        <div class="p-4 rounded-lg bg-white mb-4">
          <div class="flex flex-col">
            <h2 class="font-roboto font-medium text-green-700 mb-3">
              Penulis dan Lokasi
            </h2>
            <div class="flex flex-col gap-4">
              <div>
                <p class="text-[15px] mb-1 text-blue-gray-800">
                  Penulis
                </p>
                <p class="text-sm font-bold text-blue-gray-800">
                  Nasir Abdurachman - DP3AKB
                </p>
              </div>
              <JdsSelect
                label="Lokasi"
                placeholder="Pilih lokasi"
                filterable
              />
            </div>
          </div>
        </div>
      </div>
    </form>
    <BaseModal
      :open="isError"
      @close="clearError"
    >
      <div class="w-full h-full px-2 pb-4">
        <h1 class="font-roboto font-medium text-green-700 text-[21px] leading-[34px] mb-6">
          {{ error.title }}
        </h1>
        <div class="flex items-center gap-4">
          <JdsIcon
            name="warning"
            class="text-red-600"
          />
          <p class="text-sm leading-6 to-blue-gray-800">
            {{ error.message }}
          </p>
        </div>
      </div>
    </BaseModal>
  </main>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
import Compressor from 'compressorjs';
import { formatDate } from '@/common/helpers/date';
import HeaderMenu from '@/common/components/HeaderMenu';
import BaseButton from '@/common/components/BaseButton';
import BaseModal from '@/common/components/BaseModal';
import { NEWS_CATEGORIES, NEWS_DURATION } from '@/common/constants';
import ReviewIcon from '@/assets/icons/review.svg?inline';
import PublishIcon from '@/assets/icons/publish.svg?inline';
import DraftIcon from '@/assets/icons/draft.svg?inline';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const mediaRepository = RepositoryFactory.get('media');

export default {
  name: 'CreateEditNews',
  components: {
    HeaderMenu,
    BaseButton,
    BaseModal,
    Editor,
    ReviewIcon,
    PublishIcon,
    DraftIcon,
  },
  data() {
    return {
      form: {
        title: '',
        image: '',
        content: '',
        start_date: formatDate(new Date(), 'dd/MM/yyyy'),
        category: '',
        tags: [],
      },
      newsDuration: NEWS_DURATION,
      newsCategories: NEWS_CATEGORIES,
      duration: null,
      tag: '',
      tinyMceConfig: Object.freeze({
        'api-key': process.env.VUE_APP_TINY_MCE_API_KEY,
        init: {
          height: 500,
          skin_url: '/tinymce-skin-ipj/',
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            `undo redo | formatselect | bold italic bullist numlist blockquote strikethrough backcolor |
            alignleft aligncenter alignright alignjustify |
            outdent indent | link image media | fullscreen `,
          images_upload_handler: this.onContentImageUpload,
          image_caption: true,
        },
      }),
      loading: false,
      error: {
        title: '',
        message: '',
      },
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
    imagePreview() {
      return this.form.image ? URL.createObjectURL(this.form.image) : null;
    },
    hasImagePreview() {
      return !!this.imagePreview;
    },
    isError() {
      return !!this.error.title && !!this.error.message;
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
    clearError() {
      this.error.title = '';
      this.error.message = '';
    },
    compressImage(file, config) {
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line no-new
        new Compressor(file, {
          strict: true,
          checkOrientation: true,
          quality: config.quality,
          maxWidth: config.maxWidth,
          maxHeight: config.maxWidth,
          width: config.width,
          height: config.height,
          resize: 'cover',
          success(result) {
            resolve(result);
          },
          error: (error) => {
            reject(error);
          },
        });
      });
    },
    async onImageUpload(event) {
      const [file] = event.target.files;
      const MAX_SIZE = 5000000; // 5 MB
      const MAX_WIDTH = 1600;
      const MAX_HEIGHT = 900;

      // validate file size
      if (file.size > MAX_SIZE) {
        this.error.title = 'Gagal memilih file';
        this.error.message = 'Ukuran file yang Anda pilih melebihi 5 MB';
      }

      // validate file resolution
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        if (image.width > MAX_WIDTH || image.height > MAX_HEIGHT) {
          this.error.title = 'Gagal memilih file';
          this.error.message = 'Resolusi file yang Anda pilih melebihi 1600x900';
        }
      };

      if (!this.isError) {
        this.loading = true;
        try {
          const result = await this.compressImage(file, {
            quality: 0.6,
            maxWidth: 1600,
            maxHeight: 900,
            width: 1600,
            height: 900,
          });
          this.setImage(result);
        } catch (err) {
          this.error.title = 'Gagal memilih file';
          this.error.message = 'Terjadi kesalahan dalam memilih gambar';
        } finally {
          this.loading = false;
        }
      }
    },
    async onContentImageUpload(blobInfo, success, failure) {
      try {
        const compressedImage = await this.compressImage(blobInfo.blob(), {
          quality: 0.6,
          maxWidth: 1200,
          maxHeight: 900,
        });

        const formData = new FormData();
        formData.append('file', compressedImage, compressedImage.name);
        const response = await mediaRepository.uploadMedia(formData);
        const fileUri = response.data?.file_download_uri || null;
        success(fileUri);
      } catch (err) {
        // Show error message and remove image from the document
        failure(err.message, { remove: true });
      } finally {
        this.loading = false;
      }
    },
    setImage(result) {
      this.form.image = result;
    },
    removeImage() {
      this.form.image = '';
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
.news__form .jds-form-control-label {
  margin-bottom: 4px !important;
  color: #022B55 !important;
}
</style>
