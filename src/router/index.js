import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import routes from './routes';

Vue.use(VueRouter);

const beforeEach = async (to, from, next) => {
  const isAuthenticated = await store.getters['auth/isAuthenticated'];

  if (to.matched.some((record) => record.meta.public)) {
    if (isAuthenticated) {
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }

  if (to.matched.some((record) => !record.meta.public)) {
    if (isAuthenticated) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
};

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(beforeEach);

export default router;
