import { createRouter, createWebHistory } from 'vue-router';
import ParametersPage from '../pages/ParametersPage.vue';
import HomePage from '../pages/HomePage.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: HomePage,
    },
    {
      name: 'Parameters',
      path: '/parameters',
      component: ParametersPage,
      props: true,
    },
    
  ],
});
