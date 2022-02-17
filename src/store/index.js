import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import auth from './modules/auth';
import alert from './modules/alert';
import news from './modules/news';

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
  reducer: (state) => ({ news: state.news }),
});

export default new Vuex.Store({
  modules: {
    auth,
    alert,
    news,
  },
  plugins: [vuexLocalStorage.plugin],
});
