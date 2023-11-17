<template>
  <div class="card">
    <Menubar :model="items" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const items = [
  { label: 'Home', command: () => {
      router.push({name: 'Home'});
    }, id: 0 },
  { label: 'Parameters', command: () => {
      router.push({name: 'Parameters'});
    } , id: 1 },
  { label: 'Group Type Name', command: () => {
      router.push({name: 'GroupTypeName'});
    } , id: 2 },
];
</script>

<style lang="scss" scoped></style>
