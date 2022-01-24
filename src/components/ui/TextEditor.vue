<template>
  <form @submit.prevent="onSubmit">
    <Editor
      v-model="content"
      api-key="qqntxcbiwdhx7q119jd9ehaq0wajhtoyldixf54ylroitp5y"
      cloud-channel="5"
      :init="{
        height: 500,
        menubar: false,
        images_upload_url: 'https://api-staging.com',
        /* we override default upload handler to simulate successful upload*/
        images_upload_handler: onUpload,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount autosave'
        ],
        toolbar:
          'restoredraft | undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | preview | image | link | media | help',
        autosave_ask_before_unload: true
      }"
    />
    <button>
      Simpan
    </button>
  </form>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';

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
    onUpload(blobInfo, success /** ,failure */) {
      setTimeout(() => {
      /* no matter what you upload, we will turn it into TinyMCE logo :) */
        success('http://moxiecode.cachefly.net/tinymce/v9/images/logo.png');
      }, 2000);
    },
  },
};
</script>
