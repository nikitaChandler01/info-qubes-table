<template>
  <!-- <Message class="error-message" severity="error">Error Message</Message> -->
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
import scriptParameters from '@/mocks/scriptParameters.js';
import MyMenuBar from '@/components/MyMenuBar.vue';
import { useToast } from 'primevue/usetoast';
import { getDataFromServer, putNewDataToServer } from '@services/index.js';
import { onBeforeMount } from 'vue';
import { ref } from 'vue';

const token = import.meta.env.VITE_SECRET_TOKEN;
const url = import.meta.env.VITE_URL

let data = ref({});

onBeforeMount(async () => {
  getDataFromServer(url, token)
    .then((result) => {
      data.value = result.response.data.scriptParameters;
    })
    .catch((error) => {
      console.log(error);
      component 
    });
    isLoading.value = false;
});

const isLoading = ref(false);
const toast = useToast();
const changeParams = async (newData, name) => {
  isLoading.value = true;
  data.value[name] = newData;
  await putNewDataToServer(url, data.value, token)
    .then((result) => {
      toast.add({
        severity: 'success',
        summary: 'Запрос отправлен',
        detail: 'Данные изменены',
        life: 5000,
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() =>
      getDataFromServer(url, token)
        .then((result) => {
          toast.add({
            severity: 'success',
            summary: 'Ответ получен',
            detail: 'Данные загружены',
            life: 5000,
          });
          data.value = result.response.data.scriptParameters;
          console.log(data.value);
        })
        .catch((error) => {
          console.log(error);
        }),
    );
  isLoading.value = false;
};

const changeGroups = async (newData, name) => {
  console.log(newData)
  isLoading.value = true;
  data.value[name] = newData;
  await putNewDataToServer(url, data.value, token)
    .then(() => {
      toast.add({
        severity: 'success',
        summary: 'Запрос отправлен',
        detail: 'Данные изменены',
        life: 5000,
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() =>
      getDataFromServer(url, token)
        .then((result) => {
          toast.add({
            severity: 'success',
            summary: 'Ответ получен',
            detail: 'Данные загружены',
            life: 5000,
          });
          data.value = result.response.data.scriptParameters;
        })
        .catch((error) => {
          console.log(error);
        }),
    );
  isLoading.value = false;
};

const addParameter = async (newParameter) => {
  isLoading.value = true;
  data.value[newParameter.screen_name] = newParameter;
  await putNewDataToServer(url, data.value, token)
    .catch((error) => {
      console.log(error);
    })
    .then(() =>
      getDataFromServer(url, token)
        .then((result) => {
          data.value = result.response.data.scriptParameters;
        })
        .catch((error) => {
          console.log(error);
        }),
    );
  isLoading.value = false;
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
.container {
  overflow: hidden;
}
.error-message {
  position: absolute;
  right: 0;
  width: 300px;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
