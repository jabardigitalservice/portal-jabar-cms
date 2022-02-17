export default {
  namespaced: true,
  state: {
    newsPreview: null,
  },
  getters: {
    newsPreview(state) {
      return state.newsPreview;
    },
  },
  mutations: {
    SET_NEWS_PREVIEW(state, payload) {
      state.newsPreview = payload;
    },
  },
  actions: {
    createNewsPreview({ commit }, payload) {
      commit('SET_NEWS_PREVIEW', payload);
    },
    clearNewsPreview({ commit }) {
      commit('SET_NEWS_PREVIEW', null);
    },
  },
};
