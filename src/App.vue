<template>
  <div class="menu_bar">
    <MyMenuBar></MyMenuBar>
  </div>
  <div class="content">
    <RouterView :data="scriptParameters" />
  </div>
</template>

<script setup>
import scriptParameters from './mocks/scriptParameters.js';
import MyMenuBar from './components/myMenuBar.vue'
</script>

<style scoped>
</style>
