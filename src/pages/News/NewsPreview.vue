<template>
  <NewsPreview :news="news" />
</template>

<script>
import NewsPreview from '@/components/NewsInformation/News/NewsPreview';
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
    };
  },
  async created() {
    if (this.$route.query.mode === 'local') {
      this.news = this.$store.getters['news/newsPreview'];
    } else {
      const { id } = this.$route.params;
      const response = await newsRepository.getNewsById(id);
      const { data } = response.data;
      this.news = data;
    }
  },
};
</script>
