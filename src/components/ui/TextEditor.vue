<template>
  <form @submit.prevent="onSubmit">
    <Editor
      v-model="content"
      api-key="qqntxcbiwdhx7q119jd9ehaq0wajhtoyldixf54ylroitp5y"
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
        console.log(response.data);

        // TODO: Change image url with API response
        success('http://moxiecode.cachefly.net/tinymce/v9/images/logo.png');
      } catch (error) {
        // Show error message and remove image from the document
        failure('Mohon maaf, gagal mengupload gambar', { remove: true });
        console.log(error);
      }
    },
  },
};
</script>
