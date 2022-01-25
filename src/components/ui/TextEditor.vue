<template>
  <form @submit.prevent="onSubmit">
    <Editor
      v-model="content"
      api-key="qqntxcbiwdhx7q119jd9ehaq0wajhtoyldixf54ylroitp5y"
      cloud-channel="5"
      :init="{
        height: 500,
        skin_url: '/tinymce-skin-ipj/',
        language: 'id',
        menubar: false,
        /* we override default upload handler to simulate successful upload*/
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar:
          'undo redo | formatselect | bold italic bullist numlist blockquote backcolor | \
          alignleft aligncenter alignright alignjustify | \
          outdent indent | link image media | removeformat | preview | ',
        images_upload_url: 'https://loremipsum.com',
        images_upload_handler: onUpload
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
      // console.log(blobInfo.blob());
      setTimeout(() => {
        // TODO: Create upload function here
        success('http://moxiecode.cachefly.net/tinymce/v9/images/logo.png');
      }, 2000);
    },
  },
};
</script>
