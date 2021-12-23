import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../pages/HomePage'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Login'),
    meta: {
      layout: 'AppLayoutPublic',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
