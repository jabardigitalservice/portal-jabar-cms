<template>
  <form @submit.prevent="onSubmit">
    <Editor
      v-model="content"
      :api-key="apiKey"
      cloud-channel="5"
      placeholder="Tulis isi berita di sini"
      :init="{
        height: 500,
        skin_url: '/tinymce-skin-ipj/',
        language: 'id',
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
        images_upload_handler: onImageUpload
      }"
    />
    <button>
      Simpan
    </button>
  </form>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const mediaRepository = RepositoryFactory.get('media');

export default {
  name: 'TextEditor',
  components: {
    Editor,
  },
  data() {
    return {
      apiKey: process.env.VUE_APP_TINY_MCE_API_KEY || 'no-api-key',
      content: '',
    };
  },
  methods: {
    onSubmit() {
      console.log(this.content);
    },
    async onImageUpload(blobInfo, success, failure) {
      try {
        const formData = new FormData();
        formData.append('file', blobInfo.blob(), blobInfo.filename());

        const response = await mediaRepository.uploadMedia(formData);
        const fileUri = response.data?.file_download_uri || null;

        success(fileUri);
      } catch (error) {
        // Show error message and remove image from the document
        failure('Mohon maaf, gagal mengupload gambar', { remove: true });
        console.log(error);
      }
    },
  },
};
</script>
