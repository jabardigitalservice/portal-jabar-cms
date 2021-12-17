import Vue from 'vue';
import { DesignSystem } from '@jabardigitalservice/jds-design-system';
import store from './store';
import App from './App';
import router from './router';
import './assets/styles/main.css';

Vue.use(DesignSystem);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
