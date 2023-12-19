<template>
  <component :severity="severity" :is="currentMessage" :isLoading="isLoading">{{
    errorMessage
  }}</component>
  <!-- <Message severity="error">Error Message</Message> -->
  <div class="container">
    <div class="menu-bar">
      <TabMenu :model="tables" />
    </div>
    <div class="content">
      <component
        :is="currentTab"
        @rowDeleted="removeRow"
        @dataChanged="changeData"
        @dataAdded="addData"
        :data="data"
        :isLoading="isLoading"
      />
      <Toast />
    </div>
  </div>
</template>

<script setup>
import ParametersPage from '@pages/ParametersPage.vue';
import GroupsPage from '@pages/GroupsPage.vue';
import { useToast } from 'primevue/usetoast';
import { getDataFromServer, putNewDataToServer } from '@services/index.js';
import { ref, shallowRef } from 'vue';
import { getRoute } from '@services/services';
import { errorStatuses } from '@mocks/errorStatuses.js';

const token = import.meta.env.VITE_SECRET_TOKEN;
const url = getRoute('tmpParameters');
let data = ref({});
const errorMessage = ref('');
const currentMessage = ref();
const severity = ref('');
const currentTab = shallowRef(ParametersPage);
const tables = [
  {
    label: 'Управление параметрами',
    command: () => {
      currentTab.value = ParametersPage;
    },
  },
  {
    label: 'Управление группами',
    command: () => {
      currentTab.value = GroupsPage;
    },
  },
  { label: 'Привязка параметров', command: () => {} },
];
const isLoading = ref(true);
const toast = useToast();
getDataFromServer(url, token)
  .then((result) => {
    // TODO: написать логику по разным ответам сервера.
    data.value = result.response.data.scriptParameters;
    isLoading.value = false;
  })
  .catch((error) => {
    currentMessage.value = Message;
    errorMessage.value = `${errorStatuses[error.response.status]}`;
    severity.value = 'error';
    //TODO: добавить сообщение об ошибке в случае ошибки
    console.log(error);
  });

const changeData = (newData, type, name, id) => {
  isLoading.value = true;
  newData.type.name === 'group' ? (data.value[id] = newData) : (data.value[id] = newData);
  putNewDataToServer(url, data.value, token)
    .catch((error) => {
      //TODO: добавить сообщение об ошибке в случае ошибки

      console.log(error);
    })
    .then((result) => {
      // TODO: написать логику по разным ответам сервера.
      data.value = result.response.data.newScriptParameters.parameters;
      isLoading.value = false;
      if (type === 'Параметр') {
        toast.add({
          severity: 'success',
          summary: `${type} "${name}" изменён`,
          life: 5000,
        });
      } else {
        toast.add({
          severity: 'success',
          summary: `${type} "${name}" изменена`,
          life: 5000,
        });
      }
    });
};

const addData = (newParameter, type, name, id) => {
  isLoading.value = true;
  newParameter.type.name === 'group'
    ? (data.value[id] = newParameter)
    : (data.value[id] = newParameter);
  putNewDataToServer(url, data.value, token)
    .catch((error) => {
      //TODO: добавить сообщение об ошибке в случае ошибки
      console.log(error);
    })
    .then((result) => {
      // TODO: написать логику по разным ответам сервера.
      data.value = result.response.data.newScriptParameters.parameters;
      isLoading.value = false;
      if (type === 'Параметр') {
        toast.add({
          severity: 'success',
          summary: `${type} "${name}" добавлен`,
          life: 5000,
        });
      } else {
        toast.add({
          severity: 'success',
          summary: `${type} "${name}" добавлена`,
          life: 5000,
        });
      }
    });
};
const removeRow = (id, newGroups, type, name) => {
  isLoading.value = true;
  delete data.value[id];
  Object.assign(data.value, newGroups);
  putNewDataToServer(url, data.value, token)
    .catch((error) => {
      //TODO: добавить сообщение об ошибке в случае ошибки
      console.log(error);
    })
    .then((result) => {
      // TODO: написать логику по разным ответам сервера.
      data.value = result.response.data.newScriptParameters.parameters;
      isLoading.value = false;
      if (type === 'Параметр') {
        toast.add({
          severity: 'success',
          summary: `${type} "${name}" удалён`,
          life: 5000,
        });
      } else {
        toast.add({
          severity: 'success',
          summary: `${type} "${name}" удалена`,
          life: 5000,
        });
      }
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
.p-message {
  position: absolute;
  z-index: 999;
  width: 50%;
  right: 0;
  top: -20px;
  opacity: 0.9;
}
</style>
