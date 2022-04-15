<template>
  <div>
    <NewsPreview
      :news="news"
      :loading="loading"
    />
    <BaseModal :open="isUnauthorizedModalOpen">
      <div class="w-full h-full px-2 pb-4">
        <h1 class="font-roboto font-medium text-green-700 text-[21px] leading-[34px] mb-6">
          Anda tidak memiliki izin untuk mengakses halaman ini
        </h1>
        <p class="text-gray-800 text-sm">
          Halaman ini tidak dapat diakses dikarenakan berita ini tidak dibuat oleh Anda.
        </p>
      </div>
      <template #footer>
        <div class="flex w-full h-full items-center justify-center gap-4 p-2">
          <BaseButton
            type="button"
            class="bg-green-700 hover:bg-green-600 text-sm text-white"
            @click="$router.push('/berita-dan-artikel');"
          >
            Saya mengerti
          </BaseButton>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script>
import NewsPreview from '@/components/NewsInformation/News/NewsPreview';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';
import BaseModal from '@/common/components/BaseModal';
import BaseButton from '@/common/components/BaseButton';

const newsRepository = RepositoryFactory.get('news');

export default {
  name: 'NewsPreviewPage',
  components: {
    NewsPreview,
    BaseModal,
    BaseButton,
  },
  data() {
    return {
      news: null,
      loading: false,
      isUnauthorizedModalOpen: false,
    };
  },
  async created() {
    if (this.$route.query.mode === 'local') {
      this.news = this.$store.getters['news/newsPreview'];
    } else {
      try {
        this.loading = true;
        const { id } = this.$route.params;
        const response = await newsRepository.getNewsById(id);
        const { data } = response.data;
        this.news = data;
      } catch (error) {
        if (error.response?.status === 403) {
          this.isUnauthorizedModalOpen = true;
        }
      } finally {
        this.loading = false;
      }
    }
  },
};
</script>
