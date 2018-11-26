import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import yogasessions from './views/yogasessions.vue';
import yogasession from './views/yogasession.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/yogasessions',
      name: 'yogasessions',
      component: yogasessions,
    },
    {
      path: '/yogasession/:id',
      name: 'yogasession',
      component: yogasession
    }
  ],
});
