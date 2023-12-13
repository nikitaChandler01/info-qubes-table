<template>
  <div class="container">
    <div class="menu-bar">
      <TabMenu :model="tables" />
    </div>
    <div class="content">
      <component
        :is="currentTab"
        @rowDeleted="removeRow"
        @paramChanged="changeParams"
        @groupChanged="changeGroups"
        @parameterAdded="addData"
        @groupAdded="addData"
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

const token = import.meta.env.VITE_SECRET_TOKEN;
const url = getRoute('tmpParameters');
let data = ref({});

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

const changeGroups = (newData, id) => {
  isLoading.value = true;
  data.value[id] = newData;
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

const addData = (newParameter, index) => {
  isLoading.value = true;
  newParameter.type.name === 'group'
    ? (data.value[index] = newParameter)
    : (data.value[newParameter.screen_name] = newParameter);
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
const removeRow = (id, newGroups, type, name) => {
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
</style>
