import Vue from 'vue';
import { DesignSystem } from '@jabardigitalservice/jds-design-system';
import PortalVue from 'portal-vue';
import toast from '@/plugins/toast';
import { axiosInterceptors } from './repositories/Repository';
import router from './router';
import store from './store';
import App from './App';
import './assets/styles/main.css';

Vue.use(DesignSystem);
Vue.use(PortalVue);
Vue.use(toast);
axiosInterceptors(store);

Vue.config.productionTip = false;

if (process.env.VUE_APP_ENV === 'local') {
  const { worker } = require('./mocks/browser');
  worker.start();
}

store.dispatch('auth/getUser')
  .then(() => {
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  });
