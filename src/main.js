import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/index.js';
import PrimeVue from 'primevue/config';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import TabMenu from 'primevue/tabmenu';
import Menubar from 'primevue/menubar';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import 'primevue/resources/themes/lara-light-teal/theme.css';

const app = createApp(App);
app
  .use(PrimeVue)
  .use(router)
  .component('DataTable', DataTable)
  .component('Column', Column)
  .component('TabMenu', TabMenu)
  .component('Menubar', Menubar)
  .component('Dropdown', Dropdown)
  .component('InputText', InputText)
  .component('Textarea', Textarea)
  .mount('#app');
