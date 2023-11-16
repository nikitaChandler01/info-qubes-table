<template>
  <div class="card">
    <TabMenu :model="items" v-model:activeIndex="activeIndex" @tab-change="tabChanger" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const activeIndex = ref(0);

const router = useRouter();

const items = [
  { label: 'Home', route: 'home', id: 0 },
  { label: 'Parameters', route: 'parameters', id: 1 },
  { label: 'Group Type Name', route: 'group-type-name', id: 2 },
];
const tabChanger = (event) => {
  const tableName = event.originalEvent.target.innerText.split(' ').join('_');
  router.push({ name: tableName });
};
onMounted(() => {
  const currentUrl = window.location.href;
  const currentPath = currentUrl.split('/').reverse()[0];
  for (const item of items) {
    if (currentPath === item.route) {
      activeIndex.value = item.id;
    }
  }
});
</script>

<style lang="scss" scoped></style>
