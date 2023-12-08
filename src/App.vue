<template>
  <!-- <Message class="error-message" severity="error">Error Message</Message> -->
  <div class="container">
    <div class="menu-bar">
      <MyMenuBar></MyMenuBar>
    </div>
    <div class="content">
      <RouterView
        @rowDeleted="removeRow"
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
import MyMenuBar from '@/components/MyMenuBar.vue';
import { useToast } from 'primevue/usetoast';
import { getDataFromServer, putNewDataToServer } from '@services/index.js';
import { ref } from 'vue';
import { getRoute } from '@services/services';

const token = import.meta.env.VITE_SECRET_TOKEN
const url = getRoute('tmpParameters');
let data = ref({});

const isLoading = ref(true);
const toast = useToast();
getDataFromServer(url, token)
  .then((result) => {
    data.value = result.response.data.scriptParameters;
    isLoading.value = false;
  })
  .catch((error) => {
    console.log(error);
  });
const changeParams = (newData, name) => {
  isLoading.value = true;
  data.value[name] = newData;
  putNewDataToServer(url, data.value, token)
    .then((result) => {
      data.value = result.response.data.newScriptParameters.parameters;
      isLoading.value = false;
      toast.add({
        severity: 'success',
        summary: 'Данные изменены',
        life: 5000,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const changeGroups = (newData, name) => {
  isLoading.value = true;
  data.value[name] = newData;
  putNewDataToServer(url, data.value, token)
    .then((result) => {
      data.value = result.response.data.newScriptParameters.parameters;
      isLoading.value = false;
      toast.add({
        severity: 'success',
        summary: 'Данные изменены',
        life: 5000,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const addParameter = async (newParameter) => {
  isLoading.value = true;
  data.value[newParameter.screen_name] = newParameter;
  putNewDataToServer(url, data.value, token)
    .catch((error) => {
      console.log(error);
    })
    .then((result) => {
      data.value = result.response.data.newScriptParameters.parameters;
      isLoading.value = false;
      toast.add({
        severity: 'success',
        summary: 'Параметр добавлен',
        life: 5000,
      });
    });
};
const removeRow = (id, newGroups) => {
  isLoading.value = true;
  delete data.value[id];
  Object.assign(data.value, newGroups);
  putNewDataToServer(url, data.value, token)
    .catch((error) => {
      console.log(error);
    })
    .then((result) => {
      data.value = result.response.data.newScriptParameters.parameters;
      isLoading.value = false;
      toast.add({
        severity: 'success',
        summary: 'Параметр удалён',
        life: 5000,
      });
    });
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
.container {
  overflow: hidden;
  height: 100vh;
}
.error-message {
  position: absolute;
  right: 0;
  width: 300px;
}
.content {
  position: relative;
  height: calc(100vh - 70px);
}
.menu-bar {
  position: relative;
  z-index: 100;
}
</style>
