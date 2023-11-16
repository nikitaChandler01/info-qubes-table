import { createRouter, createWebHistory } from 'vue-router';
import ParametersPage from '../pages/ParametersPage.vue';
import HomePage from '../pages/HomePage.vue';
import GroupTypeNamePage from '../pages/GroupTypeNamePage.vue';

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
    {
      name: 'Group_Type_Name',
      path: '/group-type-name',
      component: GroupTypeNamePage,
      props: true,
    },
  ],
});
