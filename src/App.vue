<template>
  <div class="container">
    <div class="menuBar">
      <MyMenuBar></MyMenuBar>
    </div>
    <div class="content">
      <RouterView :data="scriptParameters" :isLoading="isLoading" />
    </div>
  </div>
</template>

<script setup>
import scriptParameters from './mocks/scriptParameters.js';
import MyMenuBar from './components/myMenuBar.vue';
import { ref } from 'vue';

const isLoading = ref(false);
// setTimeout(() => isLoading.value = false, 3000)
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
.container {
  overflow: hidden;
}
</style>
