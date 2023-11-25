<template>
  <DataTable
    scrollable
    scrollHeight="46vh"
    class="table"
    v-model:editingRows="editingRows"
    :value="dataCopyParams"
    editMode="row"
    dataKey="id"
    @row-edit-save="onRowEditSave"
    :rowStyle="paintBackground"
  >
    <Column :field="'screen_name'" header="Parameter/Параметр" style="width: 10%">
      <template #body="slotProps">
        {{ slotProps.data.screen_name }}
      </template>
    </Column>
    <Column :field="'name'" header="Name/Имя" style="width: 15%">
      <template #editor="{ data, field }">
        <InputText v-model="data[field]" />
      </template>
    </Column>
    <Column :field="'is_negative'" header="isNegative" style="width: 10%">
      <template #body="{ data, field }">
        {{ translateMapping[data[field]]() }}
      </template>
      <template #editor="{ data, field }">
        <Dropdown
          v-model="data[field]"
          :options="values.isNegative"
          optionLabel="name"
          optionValue="value"
          placeholder="Выберите значение"
          class="w-full md:w-14rem"
        />
      </template>
    </Column>
    <Column :field="'description'" header="Description/Описание" style="width: 35%">
      <template #editor="{ data, field }">
        <Textarea v-model="data[field]" />
      </template>
    </Column>
    <Column :field="'short_name'" header="Short Name/Сокращение" style="width: 15%">
      <template #editor="{ data, field }">
        <InputText v-model="data[field]" />
      </template>
    </Column>
    <Column :field="'type.name'" header="type name" style="width: 15%">
      <template #body="{ data }">
        {{ translateMapping[data.type.name]() }}
      </template>
      <template #editor="{ data, field }">
        <Dropdown
          v-model="data.type.name"
          :options="values.typeName"
          optionLabel="name"
          optionValue="value"
          placeholder="Выберите значение"
          class="w-full md:w-14rem"
        />
      </template>
    </Column>
    <Column :field="'form.name'" header="form" style="width: 10%">
      <template #body="{ data }">
        {{ translateMapping[data.form.name]() }}
      </template>
      <template #editor="{ data, field }">
        <Dropdown
          v-model="data.form.name"
          :options="values.formName"
          optionLabel="name"
          optionValue="value"
          placeholder="Выберите значение"
          class="w-full md:w-14rem"
        />
      </template>
    </Column>
    <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center" />
    <Column style="background-color: #f9fafb">
      <template #body="slotProps">
        <Button label="Удалить" severity="danger" @click="removeRow(slotProps)" />
      </template>
    </Column>
  </DataTable>
  <DataTable
    showGridlines
    scrollable
    scrollHeight="46vh"
    class="table"
    v-model:editingRows="editingRows"
    :value="rowsGroup"
    editMode="row"
    dataKey="id"
    @row-edit-save="onRowEditSave"
  >
    <Column field="id" header="Группа" style="width: 15%">
      <template #editor="{ data, field }">
        <InputText v-model="data[field]" />
      </template>
    </Column>
    <Column field="name" header="Name/Имя" style="width: 15%">
      <template #editor="{ data, field }">
        <InputText v-model="data[field]" />
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
      <template #body="{ data }">
        {{ data.type }}
      </template>
    </Column>
    <Column field="count" header="Count of params/Количество параметров" style="width: 15%">
      <template #body="{ data }">
        <span style="text-align: center">Кол-во параметров: {{ data.count }}</span></template
      >
    </Column>
    <Column field="parameters" header="Parameters/Параметры" style="width: 15%">
      <template #body="{ data }">
        <VirtualScroller
          :items="data.parameters"
          :itemSize="50"
          class="border-1 surface-border border-round"
          style="width: 200px; height: 120px"
        >
          <template v-slot:item="{ item, options }">
            <div
              :class="['flex align-items-center p-2', { 'surface-hover': options.odd }]"
              style="height: 50px"
            >
              {{ item }}
            </div>
          </template>
        </VirtualScroller>
      </template>
    </Column>
    <Column field="color" header="Color/Цвет" style="width: 15%">
      <template #body="{ data }">
        <div class="card">
          <div class="color-box" :style="`background: ${data.color}`" />
          <Button
            @click="changeColor(data)"
            type="submit"
            icon="pi pi-check"
            rounded
            text
            aria-label="Filter"
          />
          <Button
            @click="resetCurrentColor(data)"
            icon="pi pi-times"
            text
            severity="danger"
            rounded
            aria-label="Filter"
          />
        </div>
      </template>
    </Column>
    <Column
      :rowEditor="true"
      style="width: 10%; min-width: 8rem"
      bodyStyle="text-align:center"
    ></Column>
  </DataTable>
</template>

<script setup>
import { ref, computed } from 'vue';
import translateMapping from '../mocks/translateMapping.js';
import values from '../mocks/dropDownValues.js';
import { uniqueId, find } from 'lodash';

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

const arrayColors = [
  { '1hgy3': '#a2e67e' },
  { '7f8ds': '#75d940' },
  { '66dhg': '#9d1b1b' },
  { '226sh': '#58156b' },
  { '9hg34': '#676320' },
  { '1yt56': '#7b87e9' },
  { '3342h': '#2d3fdc' },
  { '345ht': '#182cb0' },
  { '123vt': '#0b259c' },
  { '678gh': '#87de57' },
  { etecet: '#c2efab' },
];
const editingRows = ref([]);
const dataCopy = ref(props.data);
const dataKeys = computed(() => Object.keys(dataCopy.value));
const dataCopyParams = ref(
  Object.values(dataCopy.value)
    .map((value) => {
      if (value.type.name === 'group') {
        return;
      }
      value.id = uniqueId();
      return value;
    })
    .filter((item) => item !== undefined),
);

const dataCopyGroups = ref(
  Object.values(dataCopy.value)
    .map((value, index) => {
      if (value.type.name === 'group') {
        value.paramName = dataKeys.value[index];
        return value;
      }
      return;
    })
    .filter((item) => item !== undefined),
);

const rowsGroup = ref([]);

for (const group of dataCopyGroups.value) {
  const item = {};
  item.id = group.paramName;
  item.name = group.name;
  item.description = group.description;
  item.shortName = group['short_name'];
  item.type = translateMapping[group.type.name]();
  item.parameters = Array.from(group.parameters);
  item.color = find(arrayColors, (item) => item[group.paramName])[group.paramName];
  item.count = item.parameters.length;
  rowsGroup.value.push(item);
}

const emit = defineEmits(['dataChanged', 'rowDeleted']);



const onRowEditSave = (event) => {
  const editItem = ref({});
  editItem.value = event.newData;
  console.log(editItem.value);
  emit('dataChanged', editItem.value);
};

const removeRow = ({ data }) => {
  emit('rowDeleted', data);
};

const currentColoredParams = ref({
  parameters: [],
  color: '',
});

const changeColor = (data) => {
  currentColoredParams.value.parameters = data.parameters;
  currentColoredParams.value.color = data.color;
};
const resetCurrentColor = (data) => {
  currentColoredParams.value.parameters = [];
  currentColoredParams.value.color = '';
};
const paintBackground = (data) => {
  if (currentColoredParams.value.parameters.includes(data.screen_name)) {
    return `background: ${currentColoredParams.value.color}`;
  } else {
    return '';
  }
};
</script>
<style>
.table {
  /* width: 100%; */
  border: 1px solid #e5e7eb;
}

.table:first-child {
  margin-bottom: 10px;
}

.card {
  display: flex;
  align-items: center;
  justify-content: center;
}
.color-box {
  width: 30px;
  height: 30px;
  border-radius: 10px;
  /* background-color: aqua; */
}
</style>
