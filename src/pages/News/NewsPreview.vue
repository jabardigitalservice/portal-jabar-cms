<template>
  <div>
    <NewsPreview
      :news="news"
      :loading="loading"
    />
  </div>
</template>

<script>
import NewsPreview from '@/components/NewsInformation/News/NewsPreview';
import { EventBus } from '@/common/helpers/event-bus';
import { RepositoryFactory } from '@/repositories/RepositoryFactory';

const newsRepository = RepositoryFactory.get('news');

export default {
  name: 'NewsPreviewPage',
  components: {
    NewsPreview,
  },
  data() {
    return {
      news: null,
      loading: false,
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
          EventBus.$emit('error:forbidden');
        } else {
          this.$toast({ type: 'error', message: 'Mohon maaf, gagal mendapatkan data berita!' });
        }
      } finally {
        this.loading = false;
      }
    }
  },
};
</script>
