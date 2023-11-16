import { createRouter, createWebHistory } from 'vue-router';
import { createApp } from 'vue';
import App from './App.vue';
import ParametersPage from './pages/ParametersPage.vue';
import HomePage from './pages/HomePage.vue';
import GroupTypeNamePage from './pages/GroupTypeNamePage.vue';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-teal/theme.css';

const router = createRouter({
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

const app = createApp(App);
app.use(PrimeVue);
app.use(router);
app.mount('#app');
