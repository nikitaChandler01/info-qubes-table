<template>
  <div class="card">
<!--    <TabMenu :model="items" v-model:activeIndex="activeIndex" @tab-change="tabChanger" />-->
    <Menubar :model="items" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const activeIndex = ref(0);

const router = useRouter();

const items = [
  { label: 'Home', command: () => {
      router.push({name: 'Home'});
    }, id: 0 },
  { label: 'Parameters', command: () => {
      router.push({name: 'Parameters'});
    } , id: 1 },
  { label: 'Group Type Name', command: () => {
      router.push({name: 'Group_Type_Name'});
    } , id: 2 },
];
// const tabChanger = (event) => {
//   const tableName = event.originalEvent.target.innerText.split(' ').join('_');
//   router.push({ name: tableName });
// };
// onMounted(() => {
//   const currentUrl = window.location.href;
//   const currentPath = currentUrl.split('/').reverse()[0];
//   for (const item of items) {
//     if (currentPath === item.route) {
//       activeIndex.value = item.id;
//     }
//   }
// });
</script>

<style lang="scss" scoped></style>
