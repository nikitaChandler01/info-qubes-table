<template>
  <DataTable
    scrollable
    scrollHeight="46vh"
    class="table"
    v-model:editingRows="editingRows"
    :value="rows"
    editMode="row"
    dataKey="id"
    @row-edit-save="onRowEditSave"
  >
    <Column field="id" header="Parameter/Параметр" style="width: 10%">
      <template #body="{ data, field }">
        {{ data[field] }}
      </template>
      ></Column
    >
    <Column field="name" header="Name/Имя" style="width: 15%">
      <template #editor="{ data, field }">
        <InputText v-model="data[field]" />
      </template>
    </Column>
    <Column field="isNegative" header="isNegative" style="width: 10%">
      <template #editor="{ data, field }">
        <Dropdown
          v-model="data[field]"
          :options="values.isNegative"
          optionLabel="name"
          optionValue="name"
          placeholder="Выберите значение"
          class="w-full md:w-14rem"
        />
      </template>
    </Column>
    <Column field="description" header="Description/Описание" style="width: 35%">
      <template #editor="{ data, field }">
        <Textarea v-model="data[field]" />
      </template>
    </Column>
    <Column field="shortName" header="Short Name/Сокращение" style="width: 15%">
      <template #editor="{ data, field }">
        <InputText v-model="data[field]" />
      </template>
    </Column>
    <Column field="type" header="type name" style="width: 15%">
      <template #editor="{ data, field }">
        <Dropdown
          v-model="data[field]"
          :options="values.typeName"
          optionLabel="name"
          optionValue="name"
          placeholder="Выберите значение"
          class="w-full md:w-14rem"
        />
      </template>
    </Column>
    <Column field="form" header="form" style="width: 10%">
      <template #editor="{ data, field }">
        <Dropdown
          v-model="data[field]"
          :options="values.formName"
          optionLabel="name"
          optionValue="name"
          placeholder="Выберите значение"
          class="w-full md:w-14rem"
        />
      </template>
    </Column>
    <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center" />
    <Column>
      <template #body="{ data, index }">
        <Button label="Удалить" severity="danger" @click="removeRow(data, index)" />
      </template>
    </Column>
  </DataTable>

  <DataTable
    scrollable
    scrollHeight="46vh"
    class="table"
    v-model:editingRows="editingRows"
    :value="rowsGroup"
    editMode="row"
    dataKey="id"
    @row-edit-save="onRowEditSave"
  >
    <Column field="id" header="Parameter/Параметр" style="width: 10%">
      <template #body="{ data, field }">
        {{ data[field] }}
      </template>
      ></Column
    >
    <Column field="name" header="Name/Имя" style="width: 15%">
      <template #editor="{ data, field }">
        <InputText v-model="data[field]" />
      </template>
    </Column>
    <Column field="isNegative" header="isNegative" style="width: 10%">
      <template #editor="{ data, field }">
        <Dropdown
          v-model="data[field]"
          :options="values.isNegative"
          optionLabel="name"
          optionValue="name"
          placeholder="Выберите значение"
          class="w-full md:w-14rem"
        />
      </template>
    </Column>
    <Column field="description" header="Description/Описание" style="width: 35%">
      <template #editor="{ data, field }">
        <Textarea v-model="data[field]" />
      </template>
    </Column>
    <Column field="shortName" header="Short Name/Сокращение" style="width: 15%">
      <template #editor="{ data, field }">
        <InputText v-model="data[field]" />
      </template>
    </Column>
    <Column field="type" header="type name" style="width: 15%">
      <template #editor="{ data, field }">
        <Dropdown
          v-model="data[field]"
          :options="values.typeName"
          optionLabel="name"
          optionValue="name"
          placeholder="Выберите значение"
          class="w-full md:w-14rem"
        />
      </template>
    </Column>
    <Column field="name" header="Name/Имя" style="width: 10%">
      <template #editor="{ data, field }">
        <Dropdown
          v-model="data[field]"
          :options="values.formName"
          optionLabel="name"
          optionValue="name"
          placeholder="Выберите значение"
          class="w-full md:w-14rem"
        />
      </template>
    </Column>
    <Column
      :rowEditor="true"
      style="width: 10%; min-width: 8rem"
      bodyStyle="text-align:center"
    ></Column>
    <Column>
      <template #body="{ data, index }">
        <Button label="Удалить" severity="danger" @click="removeRow(data, index)" />
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
import { ref, computed } from 'vue';
import translateMapping from '../mocks/translateMapping.js';
import values from '../mocks/dropDownValues.js';
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
const editingRows = ref([]);
const dataCopy = ref(props.data);
const dataKeys = computed(() => Object.keys(dataCopy.value));

const rows = ref([]);
for (const key of dataKeys.value) {
  if (dataCopy.value[key].type.name !== 'group') {
    const item = {};
    item.id = key;
    item.name = dataCopy.value[key].name;
    item.isNegative = translateMapping[dataCopy.value[key]['is_negative']]();
    item.description = dataCopy.value[key].description;
    item.shortName = dataCopy.value[key]['short_name'];
    item.type = translateMapping[dataCopy.value[key].type.name]();
    item.form = translateMapping[dataCopy.value[key].form.name]();
    rows.value.push(item);
  }
}

const rowsGroup = ref([]);

for (const key of dataKeys.value) {
  if (dataCopy.value[key].type.name === 'group') {
    const item = {};
    item.id = key;
    item.name = dataCopy.value[key].name;
    item.isNegative = translateMapping[dataCopy.value[key]['is_negative']]();
    item.description = dataCopy.value[key].description;
    item.shortName = dataCopy.value[key]['short_name'];
    item.type = translateMapping[dataCopy.value[key].type.name]();
    item.form = translateMapping[dataCopy.value[key].form.name];
    dataCopy.value[key].form.name;
    rowsGroup.value.push(item);
  }
}

const onRowEditSave = (event) => {
  let { newData, index } = event;
  rows.value[index] = newData;
  const result = {};
  result.name = newData.name;
  result['is_negative'] = translateMapping[newData.isNegative]();
  result.description = newData.description;
  result['short_name'] = newData.shortName;
  result.type = {};
  result.type.name = translateMapping[newData.type]();
  result.form = {};
  result.form.name = translateMapping[newData.form]();
  Object.assign(dataCopy.value[newData.id], result);
  dataChanged();
};

const removeRow = (data, index) => {
  rows.value.splice(index, 1);
  delete dataCopy.value[data.id];
  dataChanged();
};

const emit = defineEmits(['dataChanged']);

const dataChanged = () => {
  emit('dataChanged', dataCopy);
};
</script>
<style>
.table {
  width: 100%;
  border: 1px solid #e5e7eb;
}
.table:first-child {
  margin-bottom: 10px;
}
</style>
