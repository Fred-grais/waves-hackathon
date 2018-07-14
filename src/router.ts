import Vue from 'vue';
import Router from 'vue-router';
import Index from './views/Index.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'accounts_list',
      component: Index,
    },
  ],
});