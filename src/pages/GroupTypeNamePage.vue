<template>
  <DataTable :value="rows" tableStyle="min-width: 50%">
    <Column field="id" header="Parameter/Параметр" />
    <Column field="name" header="Name/Имя параметра" />
    <Column field="isNegative" header="isNegative" />
    <Column field="description" header="Description/Описание" />
    <Column field="shortName" header="Short Name/Сокращение" />
    <Column field="type.name" header="type name" />
    <Column field="form.name" header="form name" />
  </DataTable>
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { computed } from 'vue';
const props = defineProps({
  data: Object,
});
const rows = computed(() => []);
const dataKeys = Object.keys(props.data);
for (const key of dataKeys) {
  if (props.data[key].type.name === 'group') {
    const item = {};
    item.id = key;
    item.name = props.data[key].name;
    item.isNegative = props.data[key]['is_negative'];
    item.description = props.data[key].description;
    item.shortName = props.data[key]['short_name'];
    item.type = props.data[key].type;
    item.form = props.data[key].form;
    rows.value.push(item);
  }
}

console.log(rows);
</script>

<style lang="scss" scoped></style>
