<template>
  <div class="container">
    <div class="menuBar">
      <MyMenuBar></MyMenuBar>
    </div>
    <div class="content">
      <RouterView
        @paramsChanged="changeParams"
        @groupsChanged="changeGroups"
        @parameterAdded="addParameter"
        :data="data"
        :isLoading="isLoading"
      />
      <Toast />
    </div>
  </div>
</template>

<script setup>
import scriptParameters from './mocks/scriptParameters.js';
import MyMenuBar from './components/MyMenuBar.vue';
import { useToast } from 'primevue/usetoast';
import { getDataFromServer } from '@services/index.js';

import { ref } from 'vue';

let data = ref(scriptParameters);

const isLoading = ref(true);
setTimeout(() => (isLoading.value = false), 0);
const toast = useToast();
const changeParams = (newData, name) => {
  isLoading.value = true;
  data.value[name] = newData;
  isLoading.value = false;
  toast.add({
    severity: 'success',
    summary: 'Server response',
    detail: 'Data Changed',
    life: 3000,
  });
};

const changeGroups = (newData, name) => {
  isLoading.value = true;
  data.value[name] = newData;
  isLoading.value = false;
  toast.add({
    severity: 'success',
    summary: 'Server response',
    detail: 'Data Changed',
    life: 3000,
  });
};

const addParameter = (newParameter) => {
  data.value[newParameter.screen_name] = newParameter;
}
const url = new URL('http://prod3.infoqubes.ru:58005/S7CC/tmpParameters');

getDataFromServer(url, 'mCCMjAS8MzzSbdV3x7sATeU2NnhUDPSksE2')
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

// putNewDataToServer(
//     url,
//     data,
// )
//     .then((result) => {
//       console.log(result)
//     })
//     .catch((error) => {
//       console.log(error);
//     });
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
.container {
  overflow: hidden;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
