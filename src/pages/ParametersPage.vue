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
<!--  вывести в таблицу name, is_negative, description, short_name, form, type -->
<script setup>
import { computed } from 'vue';

const props = defineProps({
  data: Object,
});

const rows = computed(() =>
  Object.keys(props.data).map((key) => {
    const item = {};
    item.id = key;
    item.name = props.data[key].name;
    item.isNegative = props.data[key]['is_negative'];
    item.description = props.data[key].description;
    item.shortName = props.data[key]['short_name'];
    item.type = props.data[key].type;
    item.form = props.data[key].form;
    return item;
  }),
);
// type.name.group - группа, остальное - параметры
// вывести отдельно таблицу параметров, отдельно групп
</script>
<style scoped></style>
