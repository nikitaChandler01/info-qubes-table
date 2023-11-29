<template>
  <div class="container">
    <div class="menuBar">
      <MyMenuBar></MyMenuBar>
    </div>
    <div class="content">
      <RouterView @paramsChanged="changeParams" @groupsChanged="changeGroups" :data="data" :isLoading="isLoading" />
      <Toast />
    </div>
  </div>
</template>

<script setup>
import scriptParameters from './mocks/scriptParameters.js';
import MyMenuBar from './components/myMenuBar.vue';
import { useToast } from "primevue/usetoast";

import { ref } from 'vue';

let data = ref(scriptParameters);

const isLoading = ref(true);
setTimeout(() => isLoading.value = false, 0)
const toast = useToast();
const changeParams = (newData, name) => {
  isLoading.value = true;
  data.value[name] = newData;
  isLoading.value = false;
  toast.add({ severity: 'success', summary: 'Server response', detail: 'Data Changed', life: 3000 });
};
const changeGroups = (newData, name) => {
  isLoading.value = true;
  data.value[name] = newData;
  isLoading.value = false;
  toast.add({ severity: 'success', summary: 'Server response', detail: 'Data Changed', life: 3000 });
};

// получение данных
// const getDataFromServer = async function (
//     urlToRequestDataFromServer,
//     currentToken
// ) {
//   try {
//     const json = await axios(urlToRequestDataFromServer, {
//       // headers: {
//       //   Authorization: currentToken.replace(/"/g, ''),
//       // },
//       validateStatus: function (status) {
//         return status < 500; // Resolve only if the status code is less than 500
//       }
//     });
//
//     return {
//       response: json,
//     };
//   } catch (error) {
//     console.log('Ошибка получения данных', error);
//     return error
//   }
// };
//
//
// getDataFromServer (url)
//     .then((result) => {
//       console.log(result)
//     })
//     .catch((error) => {
//       console.log(error);
//     });


//сохранение данных

// export const putNewDataToServer = async function (
//     urlToRequestDataFromServer,
//     data
// ) {
//   try {
//     const json = await axios.put(
//         urlToRequestDataFromServer,
//         data,
//         {
//           // headers: {
//           //   Authorization: currentToken.replace(/"/g, ''),
//           // },
//           validateStatus: function (status) {
//             return status < 500; // Resolve only if the status code is less than 500
//           }
//         }
//     );
//
//     return {
//       response: json,
//     };
//   } catch (error) {
//     console.log('Ошибка получения данных', error);
//     return error
//   }
// };

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
