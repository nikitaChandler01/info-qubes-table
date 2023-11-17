<template>
  <DataTable
    class="table"
    :loading="isLoading"
    :value="rows"
    scrollable
    scrollHeight="46vh"
    showGridlines
    editMode="cell"
    @cell-edit-complete="onCellEditComplete"
  >
    <Column v-for="col in columns" :key="col.field" :field="col.field" :header="col.header">
      <template #editor="{ data, field }">
        <template v-if="field === col.field">
          <InputText v-model="data[field]" autofocus />
        </template>
      </template>
    </Column>
  </DataTable>

  <DataTable
    class="table"
    :loading="isLoading"
    :value="rowsGroup"
    scrollable
    scrollHeight="46vh"
    showGridlines
    editMode="cell"
    @cell-edit-complete="onCellEditComplete"
  >
    <Column v-for="col in columns" :key="col.field" :field="col.field" :header="col.header">
      <template #editor="{ data, field }">
        <template v-if="field === col.field">
          <InputText :name="col.field" type="text" v-model="data[field]" autofocus />
        </template>
      </template>
    </Column>
  </DataTable>
</template>
<!--  вывести в таблицу name, is_negative, description, short_name, form, type -->
<script setup>
import { computed, ref } from 'vue';
import InputText from 'primevue/InputText';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
});

const dataKeys = computed(() => {
  return Object.keys(props.data);
});
const columns = ref([
  { field: 'id', header: 'Parameter/Параметр' },
  { field: 'name', header: 'Name/Имя параметра' },
  { field: 'isNegative', header: 'isNegative' },
  { field: 'description', header: 'Description/Описание' },
  { field: 'shortName', header: 'Short Name/Сокращение' },
  { field: 'type.name', header: 'type name' },
  { field: 'form.name', header: 'form name' },
]);
const rows = ref(
  dataKeys.value.map((key) => {
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

const rowsGroup = ref([]);

for (const key of dataKeys.value) {
  if (props.data[key].type.name === 'group') {
    const item = {};
    item.id = key;
    item.name = props.data[key].name;
    item.isNegative = props.data[key]['is_negative'];
    item.description = props.data[key].description;
    item.shortName = props.data[key]['short_name'];
    item.type = props.data[key].type;
    item.form = props.data[key].form;
    rowsGroup.value.push(item);
  }
}
const onCellEditComplete = (event) => {
  console.log(event);
  let { data, newValue, field } = event;
  data[field] = newValue;
};
</script>
<style>
.table {
  width: 100%;
  border: 1px solid #e5e7eb;
}
th {
  width: calc(100vw / 7);
}
.table:first-child {
  margin-bottom: 10px;
}
</style>
