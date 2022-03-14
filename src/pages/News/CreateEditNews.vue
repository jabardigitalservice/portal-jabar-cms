<template>
  <main class="pb-5">
    <HeaderMenu>
      <template
        v-if="isDraft"
        #info
      >
        <p class="ml-4 text-gray-600 text-sm">
          Terakhir disimpan pada: {{ lastEdit }}
        </p>
      </template>
      <div class="flex gap-4">
        <BaseButton
          type="button"
          :disabled="!isFormValid"
          class="border-green-700 hover:bg-green-50 font-lato text-sm text-green-700"
          @click="onNewsPreview"
        >
          <template #icon-left>
            <ReviewIcon :class="[isFormValid ? 'fill-green-700' : 'fill-gray-700']" />
          </template>
          <p>
            Pratinjau
          </p>
        </BaseButton>
        <BaseButton
          v-if="isEditMode ? isDraft : true"
          type="button"
          :disabled="!isFormValid"
          class="border-green-700 hover:bg-green-50 font-lato text-sm text-green-700"
          @click="setConfirmationModalDetail('SUBMISSION')"
        >
          <PublishIcon :class="[isFormValid ? 'fill-green-700' : 'fill-gray-700']" />
          <p>
            Ajukan untuk Diterbitkan
          </p>
        </BaseButton>
        <BaseButton
          type="button"
          :disabled="isSaveButtonDisabled"
          class="bg-green-700 hover:bg-green-600 font-lato text-sm text-white"
          @click="onSubmit('DRAFT')"
        >
          <DraftIcon :class="[!isSaveButtonDisabled ? 'fill-white' : 'fill-gray-700']" />
          <p>
            {{ saveButtonLabel }}
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
              v-model="form.title"
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
                    type="button"
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
        <!-- editor skeleton -->
        <div
          v-show="isEditorLoading"
          class="bg-white rounded-lg border border-gray-200 flex flex-col gap-6 p-4"
        >
          <div class="flex gap-4">
            <div class="w-6 h-6 rounded-lg bg-gray-200 animate-pulse" />
            <div class="w-6 h-6 rounded-lg bg-gray-200 animate-pulse" />
            <div class="w-20 h-6 rounded-lg bg-gray-200 animate-pulse" />
            <div
              v-for="i of 8"
              :key="i"
              class="w-6 h-6 rounded-lg bg-gray-200 animate-pulse"
            />
          </div>
          <div class="flex flex-col gap-5">
            <div class="w-5/12 h-4 rounded-lg bg-gray-200 animate-pulse" />
            <div class="w-8/12 h-4 rounded-lg bg-gray-200 animate-pulse" />
            <div class="w-10/12 h-4 rounded-lg bg-gray-200 animate-pulse" />
            <div class="w-9/12 h-4 rounded-lg bg-gray-200 animate-pulse" />
            <div class="w-11/12 h-4 rounded-lg bg-gray-200 animate-pulse" />
            <div class="w-10/12 h-4 rounded-lg bg-gray-200 animate-pulse" />
            <div class="w-8/12 h-4 rounded-lg bg-gray-200 animate-pulse" />
            <div class="w-9/12 h-4 rounded-lg bg-gray-200 animate-pulse" />
            <div class="w-10/12 h-4 rounded-lg bg-gray-200 animate-pulse" />
            <div class="w-11/12 h-4 rounded-lg bg-gray-200 animate-pulse" />
          </div>
        </div>
        <!-- end of skeleton -->
        <Editor
          v-model="form.content"
          placeholder="Tulis isi berita di sini"
          v-bind="{...tinyMceConfig}"
        />
      </div>
      <div>
        <div class="p-4 rounded-lg bg-white mb-4">
          <div class="flex flex-col mb-4">
            <h2 class="font-roboto font-medium text-green-700 mb-3">
              Waktu Penayangan Berita
            </h2>
            <div class="flex flex-col gap-4">
              <JdsSelect
                v-model="form.duration"
                label="Durasi Penayangan"
                placeholder="Pilih durasi"
                :options="newsDuration"
              />
            </div>
          </div>
          <div>
            <div class="flex justify-between items-center mb-1">
              <p class="text-[15px] text-blue-gray-800">
                Waktu Penayangan <span class="text-gray-500">(Opsional)</span>
              </p>
              <div class="relative">
                <div
                  v-show="!hasDuration"
                  class="bg-transparent absolute top-0 w-full h-full z-[1] cursor-not-allowed"
                />
                <JdsToggle @change="toggleDateInput" />
              </div>
            </div>
            <div class="grid grid-cols-2 items-center gap-x-4 gap-y-1">
              <div
                class="w-full flex-grow relative"
                :class="{ 'news__date-input--disable': !showDateInput }"
              >
                <div
                  v-show="!showDateInput"
                  class="bg-transparent absolute top-0 w-full h-full z-[1] cursor-not-allowed"
                />
                <JdsDateInput v-model="form.startDate" />
              </div>
              <p
                v-show="hasDuration"
                class="text-sm whitespace-nowrap w-full text-blue-gray-800"
                :class="{ 'text-gray-400': !showDateInput }"
              >
                sampai <span class="font-bold">{{ endOfDuration }}</span>
              </p>
              <p
                v-show="isDateHasPassed"
                class="text-sm text-red-600 col-span-2"
              >
                Tanggal tidak valid
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
              <div class="flex flex-col gap-2 relative">
                <label
                  for="tag"
                  class="text-[15px] text-blue-gray-800"
                >
                  Tag <span class="text-gray-500">(Opsional)</span>
                </label>
                <input
                  id="tag"
                  v-model.trim="tag"
                  class="border border-gray-500 rounded-lg px-2 py-1 placeholder:text-gray-600 text-gray-600 bg-gray-50 hover:bg-white hover:border-green-600 focus:outline-none focus:border-green-500 focus:outline-1 focus:outline-offset-[-2px] focus:outline-yellow-500"
                  placeholder="Tambahkan tag lalu tekan 'enter'"
                  @keyup.enter="onTagInputEnter"
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
                  <span class="capitalize">{{ author.name }}</span> - {{ author.unit }}
                </p>
              </div>
              <JdsSelect
                v-model="form.areaId"
                label="Lokasi"
                placeholder="Pilih lokasi"
                filterable
                filter-type="contain"
                :options="locationOptions"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
    <ProgressModal
      :open="loading"
      :value="progress"
    />
    <BaseModal
      :open="isMessageModalOpen"
      @close="messageAction"
    >
      <div class="w-full h-full px-2 pb-4">
        <h1 class="font-roboto font-medium text-green-700 text-[21px] leading-[34px] mb-6">
          {{ message.title }}
        </h1>
        <div class="flex items-center gap-4">
          <JdsIcon
            :name="messageIconName"
            :class="messageIconClassName"
          />
          <p class="text-sm leading-6 to-blue-gray-800">
            {{ message.body }}
          </p>
        </div>
      </div>
    </BaseModal>
    <BaseModal :open="isConfirmationModalOpen">
      <div class="w-full h-full px-2 pb-4">
        <h1 class="font-roboto font-medium text-green-700 text-[21px] leading-[34px] mb-6">
          {{ confirmationModalDetail.title }}
        </h1>
        <div class="flex items-center">
          <div class="flex flex-col gap-1">
            <p class="text-sm leading-6 text-blue-gray-800">
              {{ confirmationModalDetail.subtitle }}
            </p>
            <p class="font-bold text-blue-gray-800">
              {{ confirmationModalDetail.message }}
            </p>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="flex w-full h-full items-center justify-end gap-4 p-2">
          <BaseButton
            type="button"
            class="border border-green-700 hover:bg-green-50 text-sm text-green-700"
            @click="onCancel(confirmationModalDetail.type)"
          >
            {{ confirmationModalDetail.cancelButtonLabel }}
          </BaseButton>
          <BaseButton
            type="button"
            class="bg-green-700 hover:bg-green-600 text-sm text-white"
            @click="onConfirm(confirmationModalDetail.type)"
          >
            {{ confirmationModalDetail.confirmButtonLabel }}
          </BaseButton>
        </div>
      </template>
    </BaseModal>
  </main>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
import Compressor from 'compressorjs';
import debounce from 'lodash.debounce';
import isequal from 'lodash.isequal';
import { daysDifference, formatDate } from '@/common/helpers/date';
import HeaderMenu from '@/common/components/HeaderMenu';
import BaseButton from '@/common/components/BaseButton';
import BaseModal from '@/common/components/BaseModal';
import ProgressModal from '@/common/components/ProgressModal';
import { NEWS_CATEGORIES, NEWS_DURATION } from '@/common/constants';
import ReviewIcon from '@/assets/icons/review.svg?inline';
import PublishIcon from '@/assets/icons/publish.svg?inline';
import DraftIcon from '@/assets/icons/draft.svg?inline';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const areaRepository = RepositoryFactory.get('area');
const mediaRepository = RepositoryFactory.get('media');
const newsRepository = RepositoryFactory.get('news');
const tagRepository = RepositoryFactory.get('tag');

export default {
  name: 'CreateEditNews',
  components: {
    HeaderMenu,
    BaseButton,
    BaseModal,
    ProgressModal,
    Editor,
    ReviewIcon,
    PublishIcon,
    DraftIcon,
  },
  beforeRouteLeave(to, from, next) {
    this.targetRoute = to;

    if (!this.hasTitle || this.isFormSubmitted || this.isConfirmToLeave || this.isFormDataChanged) {
      next();
    } else {
      this.setConfirmationModalDetail('LEAVE');
      next(false);
    }
  },
  data() {
    return {
      form: {
        title: '',
        image: '',
        content: '',
        duration: null,
        startDate: null,
        endDate: null,
        category: '',
        tags: [],
        areaId: null,
      },
      initialForm: null,
      newsId: null,
      newsDuration: NEWS_DURATION,
      newsCategories: NEWS_CATEGORIES,
      showDateInput: false,
      locationOptions: [],
      tag: '',
      tagSuggestions: [],
      tinyMceConfig: Object.freeze({
        'api-key': process.env.VUE_APP_TINY_MCE_API_KEY,
        init: {
          setup: this.tinyMceSetup,
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
      progress: 0,
      message: { type: '', title: '', body: '' },
      isMessageModalOpen: false,
      isConfirmationModalOpen: false,
      confirmationModalDetail: {},
      isConfirmToLeave: false,
      isFormSubmitted: false,
      targetRoute: null,
      isFormDataChanged: false,
      newsStatus: null,
      newsUpdatedAt: null,
      isEditorLoading: true,
    };
  },
  computed: {
    mode() {
      return this.$route.meta?.mode || 'create';
    },
    isEditMode() {
      return this.mode === 'edit';
    },
    isDraft() {
      return this.newsStatus === 'DRAFT';
    },
    lastEdit() {
      return formatDate(this.newsUpdatedAt, "dd/MM/yyyy' - 'HH:mm");
    },
    saveButtonLabel() {
      return this.isEditMode ? 'Simpan Perubahan' : 'Simpan Berita';
    },
    availableCharacter() {
      return 250 - this.form.title.length;
    },
    hasTags() {
      return Array.isArray(this.form.tags) && !!this.form.tags.length;
    },
    infiniteDuration() {
      return this.form.duration === -1;
    },
    hasDuration() {
      return this.form.duration !== '';
    },
    isDateHasPassed() {
      return this.showDateInput && daysDifference(this.selectedDate, new Date()) < 0;
    },
    selectedDate() {
      return this.normalizeDate(this.form.startDate);
    },
    imagePreview() {
      if (!this.form.image) return null;

      // create object url if the image is a blob
      if (typeof this.form.image === 'object') {
        return URL.createObjectURL(this.form.image);
      }

      // return the image if the image is not a blob
      return this.form.image;
    },
    endOfDuration() {
      return this.form.endDate || 'tanpa batas';
    },
    hasImagePreview() {
      return !!this.imagePreview;
    },
    hasTagSuggestions() {
      return this.tagSuggestions.length > 0;
    },
    isSuccess() {
      return this.message.type === 'SUCCESS';
    },
    isError() {
      return this.message.type === 'ERROR';
    },
    messageIconName() {
      return this.isSuccess ? 'check-mark-circle' : 'warning';
    },
    messageIconClassName() {
      return this.isSuccess ? 'text-green-600' : 'text-red-600';
    },
    requiredFields() {
      const { image, duration, category, areaId } = this.form;
      const title = this.form.title.trim();
      const content = this.sanitizeHTML(this.form.content).slice(0, 160).trim();

      return [title, image, duration, content, category, areaId];
    },
    hasTitle() {
      return this.form.title !== '';
    },
    isFormValid() {
      return this.requiredFields.every((field) => !this.isEmpty(field));
    },
    author() {
      const { name, unit } = this.$store.getters['auth/user'];

      return { name, unit: unit.name };
    },
    newsPreview() {
      const data = {
        ...this.form,
        id: this.newsId,
        author: this.author,
        image: this.imagePreview,
        content: this.isEditMode ? this.form.content : this.insertNewsPrefix(this.form.content),
      };

      return data;
    },
    isSaveButtonDisabled() {
      if (this.isEditMode) {
        return this.isFormDataChanged;
      }
      return !this.hasTitle;
    },
  },
  watch: {
    form: {
      handler() {
        if (this.isEditMode) {
          const form = {
            ...this.form,
            content: this.sanitizeHTML(this.form.content),
          };
          const initialForm = {
            ...this.initialForm,
            content: this.sanitizeHTML(this.initialForm.content),
          };
          this.isFormDataChanged = isequal(form, initialForm);
        }
        this.$store.dispatch('news/createNewsPreview', this.newsPreview);
      },
      deep: true,
    },
    'form.duration': function () {
      if (!this.form.startDate) {
        this.setStartDate();
      }
      this.setEndDate();
    },
    selectedDate() {
      this.setEndDate();
    },
    tag() {
      if (this.tag) {
        this.getTagSuggestions();
      } else {
        this.tagSuggestions = [];
      }
    },
    isSuccess() {
      this.setMessageModalVisibility(this.isSuccess);
    },
    isError() {
      this.setMessageModalVisibility(this.isError);
    },
  },
  async created() {
    this.getLocationOptions();
    this.$store.dispatch('news/clearNewsPreview');

    if (this.isEditMode) {
      const { id } = this.$route.params;
      const response = await newsRepository.getNewsById(id);
      const { data } = response.data;

      const formData = {
        title: data.title,
        image: data.image,
        content: data.content,
        duration: data.duration,
        startDate: formatDate(data.start_date, 'dd/MM/yyyy'),
        endDate: data.end_date ? formatDate(data.end_date, 'dd/MM/yyyy') : null,
        category: data.category,
        tags: data.tags,
        areaId: data.area.id,
      };

      this.newsId = id;
      this.newsStatus = data.status;
      this.newsUpdatedAt = data.updated_at;
      this.form = { ...formData };
      this.initialForm = Object.freeze({ ...formData });
    } else {
      // This is just a temporary id only for visiting the preview page
      // because the preview page needs an id
      this.newsId = Math.floor(Math.random() * (100 - 1 + 1) + 1);
    }
  },
  destroyed() {
    this.$store.dispatch('news/clearNewsPreview');
  },
  methods: {
    tinyMceSetup(editor) {
      editor.on('init', () => {
        this.isEditorLoading = false;
      });
    },
    normalizeDate(initialDate) {
      if (!initialDate) return null;

      const date = initialDate.split('/');
      const year = date[2];
      const month = date[1] - 1;
      const day = date[0];

      return new Date(year, month, day);
    },
    sanitizeHTML(html) {
      const container = document.createElement('div');
      container.insertAdjacentHTML('beforeend', html);

      return container.textContent;
    },
    insertNewsPrefix(html) {
      try {
        const container = document.createElement('div');
        container.innerHTML = html;

        const paragraphs = container.querySelectorAll('p');

        /**
       * Filter only paragraph that only contain a text,
       * not a break or new line element,
       * and doesn't have image as it's children.
       */
        const textOnlyParagraphs = Array.from(paragraphs)
          .filter((item) => item.innerText.trim() !== '' && !item.contains(item.querySelector('img')));

        if (textOnlyParagraphs.length) {
          const firstParagraph = textOnlyParagraphs[0];

          const selectedLocation = this.locationOptions
            .find((item) => item.value === this.form.areaId);

          const prefixText = `<span><strong>PORTALJABAR, ${selectedLocation.label} - </strong></span>`;

          // Insert prefix before the first paragraph's text content
          firstParagraph.insertAdjacentHTML('afterbegin', prefixText);

          return container.innerHTML;
        }

        return html;
      } catch (error) {
        return html;
      }
    },
    isEmpty(data) {
      return data === '' || data === null;
    },
    setStartDate() {
      this.form.startDate = formatDate(new Date(), 'dd/MM/yyyy');
    },
    setEndDate() {
      const startDate = new Date(this.selectedDate);
      let endDate = null;

      if (this.hasDuration && !this.infiniteDuration) {
        endDate = formatDate(startDate.setDate(startDate.getDate() + this.form.duration), 'dd/MM/yyyy');
      }

      this.form.endDate = endDate;
    },
    toggleDateInput() {
      this.showDateInput = !this.showDateInput;
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
    onTagInputEnter() {
      const tag = this.tag.trim().split(' ').join('-').toLowerCase();
      if (!this.isEmpty(tag)) {
        this.setTags(tag);
        this.clearTag();
      }
    },
    setTags(tag) {
      this.form.tags = [
        ...this.form.tags,
        { tag_name: tag },
      ];
    },
    setTagSuggestions(tagSuggestions) {
      this.tagSuggestions = tagSuggestions;
    },
    removeTag(index) {
      this.form.tags.splice(index, 1);
    },
    clearTag() {
      this.tag = '';
    },
    clearTagSuggestions() {
      this.tagSuggestions = [];
    },
    setLocationOptions(options) {
      this.locationOptions = options;
    },
    setMessageModalVisibility(value) {
      this.isMessageModalOpen = value;
    },
    setMessage(type, title, body) {
      this.message.type = type;
      this.message.title = title;
      this.message.body = body;
    },
    clearMessage() {
      this.message.type = '';
      this.message.title = '';
      this.message.body = '';
    },
    setConfirmationModalDetail(type) {
      if (type === 'LEAVE') {
        this.confirmationModalDetail = {
          type,
          title: 'Simpan Berita',
          subtitle: 'Apakah Anda ingin menyimpan berita ini terlebih dahulu?',
          message: '',
          cancelButtonLabel: 'Tidak',
          confirmButtonLabel: 'Ya, simpan berita',
        };
      }

      if (type === 'SUBMISSION') {
        this.confirmationModalDetail = {
          type,
          title: 'Terbitkan Berita',
          subtitle: 'Apakah Anda yakin ingin menerbitkan berita ini?',
          message: this.form.title,
          cancelButtonLabel: 'Batal',
          confirmButtonLabel: 'Ya, terbitkan berita',
        };
      }

      this.isConfirmationModalOpen = true;
    },
    resetConfirmationModalDetail() {
      this.confirmationModalDetail = {};
    },
    closeConfirmationModal() {
      this.resetConfirmationModalDetail();
      this.isConfirmationModalOpen = false;
    },
    closeMessageModal() {
      this.setMessageModalVisibility(false);
    },
    messageAction() {
      if (this.isSuccess) {
        this.$router.push('/berita-dan-informasi');
        this.clearMessage();
      } else {
        this.closeMessageModal();
        this.clearMessage();
      }
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

      // validate file format
      const isValidFormat = ['image/png', 'image/jpg', 'image/jpeg'].includes(file.type);
      if (!isValidFormat) {
        this.setMessage('ERROR', 'Gagal memilih file', 'Maaf file yang anda masukkan tidak didukung');
        return;
      }

      // validate file size
      if (file.size > MAX_SIZE) {
        this.setMessage('ERROR', 'Gagal memilih file', 'Ukuran file yang Anda pilih melebihi 5 MB');
        return;
      }

      // validate file resolution
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = async () => {
        if (image.width > MAX_WIDTH || image.height > MAX_HEIGHT) {
          this.setMessage('ERROR', 'Gagal memilih file', 'Resolusi file yang Anda pilih melebihi 1600x900');
          return;
        }

        try {
          const compressedImage = await this.compressImage(file, {
            quality: 0.6,
            width: 1600,
            height: 900,
          });
          this.setImage(compressedImage);
        } catch (err) {
          this.setMessage('ERROR', 'Gagal memilih file', 'Terjadi kesalahan dalam memilih gambar');
        }
      };
    },
    async onContentImageUpload(blobInfo, success, failure) {
      try {
        const compressedImage = await this.compressImage(blobInfo.blob(), {
          quality: 0.6,
          maxWidth: 1200,
          maxHeight: 900,
        });
        const fileUri = await this.uploadMedia(compressedImage);
        success(fileUri);
      } catch (err) {
        // Show error message and remove image from the document
        failure('Gagal menambahkan gambar', { remove: true });
      }
    },
    setImage(result) {
      this.form.image = result;
    },
    removeImage() {
      this.form.image = '';
    },
    async uploadMedia(image) {
      const formData = new FormData();
      formData.append('file', image, image.name);
      const response = await mediaRepository.uploadMedia(formData);
      const fileUri = response.data?.file_download_uri || null;
      return fileUri;
    },
    async getLocationOptions() {
      const params = {
        depth: 2,
        parent_code_kemendagri: 32,
        per_page: 30,
      };

      try {
        const response = await areaRepository.getAreas(params);
        const options = response.data?.data.map((area) => ({ label: area.name, value: area.id }));
        this.setLocationOptions(options);
      } catch (error) {
        this.setLocationOptions([]);
      }
    },
    onCancel(type) {
      this.closeConfirmationModal();
      if (type === 'LEAVE') {
        this.isConfirmToLeave = true;
        this.$router.push(this.targetRoute);
      }
    },
    async onConfirm(type) {
      this.closeConfirmationModal();

      if (type === 'LEAVE') {
        try {
          await this.onSubmit('DRAFT');
          this.isFormSubmitted = true;
        } catch (error) {
          this.isFormSubmitted = false;
        }
      }

      if (type === 'SUBMISSION') {
        try {
          await this.onSubmit('REVIEW');
          this.isFormSubmitted = true;
        } catch (error) {
          this.isFormSubmitted = false;
        }
      }
    },
    async onSubmit(status) {
      if (!this.isFormValid && status !== 'DRAFT') return;
      this.loading = true;
      this.progress = 20;

      const { title, content, duration, category, tags, endDate, areaId } = this.form;
      let { image } = this.form;
      const normalizeEndDate = this.normalizeDate(endDate);

      // upload the image first before submitting the form
      // if the image is a blob
      if (image && typeof image === 'object') {
        try {
          this.progress = 50;
          image = await this.uploadMedia(image);
        } catch (error) {
          this.progress = 100;
          this.loading = false;
          this.setMessage('ERROR', 'Gagal menyimpan berita', 'Terjadi kesalahan dalam menyimpan berita');
        }
      }

      const data = {
        title,
        excerpt: this.sanitizeHTML(content).slice(0, 160),
        image,
        content: this.isEditMode ? content : this.insertNewsPrefix(content),
        duration,
        start_date: this.selectedDate ? formatDate(this.selectedDate, 'yyyy-MM-dd') : null,
        end_date: normalizeEndDate ? formatDate(normalizeEndDate, 'yyyy-MM-dd') : null,
        category,
        tags: tags.map((tag) => tag.tag_name),
        area_id: areaId,
        status,
      };

      if (this.isEditMode) {
        this.updateNews(this.newsId, data);
      } else {
        this.saveNews(data);
      }
    },
    async updateNews(id, data) {
      if (this.isError) return;
      this.progress = 100;

      try {
        await newsRepository.updateNews(id, data);
        const messageTitle = data.status === 'DRAFT' ? 'Simpan Berita Berhasil' : 'Ajukan Berita Berhasil';
        const messageBody = data.status === 'DRAFT' ? 'Berita yang Anda buat berhasil disimpan.' : 'Berita yang Anda buat sedang menunggu untuk direview.';
        this.setMessage('SUCCESS', messageTitle, messageBody);
        this.isFormSubmitted = true;
      } catch (error) {
        const messageTitle = data.status === 'DRAFT' ? 'Simpan Berita Gagal' : 'Ajukan Berita Gagal';
        const messageBody = data.status === 'DRAFT' ? 'Berita yang Anda buat gagal disimpan.' : 'Berita yang Anda buat gagal diajukan.';
        this.setMessage('ERROR', messageTitle, messageBody);
      } finally {
        this.loading = false;
      }
    },
    async saveNews(data) {
      if (this.isError) return;
      this.progress = 100;

      try {
        await newsRepository.createNews(data);
        const messageTitle = data.status === 'DRAFT' ? 'Simpan Berita Berhasil' : 'Ajukan Berita Berhasil';
        const messageBody = data.status === 'DRAFT' ? 'Berita yang Anda buat berhasil disimpan.' : 'Berita yang Anda buat sedang menunggu untuk direview.';
        this.setMessage('SUCCESS', messageTitle, messageBody);
        this.isFormSubmitted = true;
      } catch (error) {
        const messageTitle = data.status === 'DRAFT' ? 'Simpan Berita Gagal' : 'Ajukan Berita Gagal';
        const messageBody = data.status === 'DRAFT' ? 'Berita yang Anda buat gagal disimpan.' : 'Berita yang Anda buat gagal diajukan.';
        this.setMessage('ERROR', messageTitle, messageBody);
      } finally {
        this.loading = false;
      }
    },
    onNewsPreview() {
      if (this.isFormValid) {
        const url = `/berita-dan-informasi/${this.newsId}/pratinjau?mode=local`;
        window.open(url, '_blank').focus();
      }
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
.news__form .jds-date-input {
  width: 100%;
}
.news__form .news__date-input--disable .jds-date-input__input input {
  color: #BDBDBD !important;
}
.news__form .news__date-input--disable .jds-date-input__input svg {
  fill: #BDBDBD !important;
}
</style>
