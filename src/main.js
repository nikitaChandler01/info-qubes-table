import { createApp } from 'vue';
import ToastService from 'primevue/toastservice';
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
import Button from 'primevue/button';
import ColorPicker from 'primevue/colorpicker';
import MultiSelect from 'primevue/multiselect';
import VirtualScroller from 'primevue/virtualscroller';
import Toast from 'primevue/toast';
import Dialog from 'primevue/dialog';
import Message from 'primevue/message';
import 'primevue/resources/themes/saga-blue/theme.css'

import 'primeicons/primeicons.css'

const app = createApp(App);
app
  .use(PrimeVue)
  .use(router)
  .use(ToastService)
  .component('DataTable', DataTable)
  .component('Column', Column)
  .component('TabMenu', TabMenu)
  .component('Menubar', Menubar)
  .component('Dropdown', Dropdown)
  .component('InputText', InputText)
  .component('Textarea', Textarea)
  .component('Button', Button)
  .component('ColorPicker', ColorPicker)
  .component('MultiSelect', MultiSelect)
  .component('VirtualScroller', VirtualScroller)
  .component('Toast', Toast)
  .component('Dialog', Dialog)
  .component('Message', Message)
  .mount('#app');
