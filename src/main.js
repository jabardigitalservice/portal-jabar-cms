import Vue from 'vue';
import * as Sentry from '@sentry/vue';
import { DesignSystem } from '@jabardigitalservice/jds-design-system';
import { BrowserTracing } from '@sentry/tracing';
import PortalVue from 'portal-vue';
import { axiosInterceptors } from './repositories/Repository';
import toast from '@/plugins/toast';
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

Sentry.init({
  Vue,
  dsn: process.env.VUE_APP_SENTRY_DSN,
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      // NOTE: this origins should not be hardcoded
      // TODO: find a way to make this values dynamic
      tracingOrigins: ['develop--portal-jabar-cms.netlify.app'],
    }),
  ],
  tracesSampleRate: parseFloat(process.env.VUE_APP_SENTRY_SAMPLE_RATE) || 0.2,
  environment: process.env.VUE_APP_ENV || 'development',
});

store.dispatch('auth/getUser')
  .then(() => {
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  });
