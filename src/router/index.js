import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated'];
  const privateRoute = to.matched.some((record) => !record.meta.public);
  const publicRoute = to.matched.some((record) => record.meta.public);

  if (publicRoute && isAuthenticated) next('/');
  else if (privateRoute && !isAuthenticated) next('/login');
  else next();
});

export default router;
