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
      :rowStyle="
      (data) =>
        data.color !== currentColor.value ? `background: #${data.color}` : 'background: ffffff'
    "
  >
    <Column field="id" header="Parameter/Параметр" style="width: 10%">
      <template #body="{ data, field }">
        {{ data[field] }}
      </template>
      >
    </Column
    >
    <Column field="name" header="Name/Имя" style="width: 15%">
      <template #editor="{ data, field }">
        <InputText v-model="data[field]"/>
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
        <Textarea v-model="data[field]"/>
      </template>
    </Column>
    <Column field="shortName" header="Short Name/Сокращение" style="width: 15%">
      <template #editor="{ data, field }">
        <InputText v-model="data[field]"/>
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
    <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"/>
    <Column style="background-color: #f9fafb">
      <template #body="{ data, index }">
        <Button label="Удалить" severity="danger" @click="removeRow(data, index)"/>
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
    <Column field="id" header="Parameter/Параметр" style="width: 10%">
      <template #body="{ data, field }">
        {{ data[field] }}
      </template>
      >
    </Column
    >
    <Column field="name" header="Name/Имя" style="width: 15%">
      <template #editor="{ data, field }">
        <InputText v-model="data[field]"/>
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
        <Textarea v-model="data[field]"/>
      </template>
    </Column>
    <Column field="shortName" header="Short Name/Сокращение" style="width: 15%">
      <template #editor="{ data, field }">
        <InputText v-model="data[field]"/>
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
    <Column field="color" header="Color/Цвет" style="width: 15%">
      <template #body="{ data }">
        <div class="card">
          <ColorPicker v-model="data.color" format="hex"/>
          <Button
              @click="changeColor(data)"
              type="submit"
              label="Выбрать цвет"
              icon="pi pi-check"
              text
              rounded
              aria-label="Filter"
          />
          <Button
              @click="resetCurrentColor(data)"
              label="Сбросить цвет"
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
    <!-- <Column>
      <template #body="{ data, index }">
        <Button label="Удалить" severity="danger" @click="removeRowGroup(data, index)" />
      </template>
    </Column> -->
  </DataTable>


  <DataTable
      showGridlines
      scrollable
      class="table"
      v-model:editingRows="editingRows"
      :value="Object.values(dataCopy)"
      editMode="cell"
      dataKey="id"
      @row-edit-save="onRowEditSave"
  >
    <Column :field="'type.name'" header="Type" style="width: 15%" sortable>
      <template #body="slotProps">
        {{ slotProps.data.type.screen_name }}
      </template>
      <template #editor="slotProps">
        <InputText v-model="editItem.type.name"/>
      </template>
    </Column>
  </DataTable>


</template>

<script setup>
//TODO: Архитектура редактора
// 1. Получаем данные и замыкаем весь template на загрузку + обработчики получения данных
// 2. прописываю все функции CRUD
// 3. изменяем state текущего компонента
// 4. отправляем изменения через emits в родителя и следим за изменением props
// 5. в родителе обработка сохранения и вывод сообщений на страницу
import {ref, computed} from 'vue';
import translateMapping from '../mocks/translateMapping.js';
import values from '../mocks/dropDownValues.js';
import {find} from "lodash";

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
  {"1hgy3": "#a2e67e"},
  {'7f8ds': "#75d940"},
  {'66dhg': "#9d1b1b"},
  {'226sh': "#58156b"},
  {'9hg34': "#676320"},
  {'1yt56': "#7b87e9"},
  {'3342h': "#2d3fdc"},
  {'345ht': "#182cb0"},
  {'123vt': "#0b259c"},
  {'678gh': "#87de57"},
  {'etecet': "#c2efab"}
]
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
    // item.color = arrayColors[key];
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
    item.parameters = dataCopy.value[key].parameters;
    dataCopy.value[key].form.name;
    item.color = (find (arrayColors , (item) => item[key]))[key]
    item.count = item.parameters.length;
    rowsGroup.value.push(item);
  }
}

const onRowEditSave = (event) => {
  let {newData, index} = event;
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
// const removeRowGroup = (data, index) => {
//   rowsGroup.value.splice(index, 1);
//   delete dataCopy.value[data.id];
//   dataChanged();
// };

const emit = defineEmits(['dataChanged']);

const dataChanged = () => {
  emit('dataChanged', dataCopy);
};

const currentColor = ref('ffffff');

const changeColor = (data) => {
  const parameters = Object.values(data.parameters);
  for (const row of rows.value) {
    if (parameters.includes(row.id)) {
      currentColor.value = data.color;
      row.color = data.color;
    } else {
      row.color = 'ffffff';
    }
  }
};
const resetCurrentColor = (data) => {
  // console.log(data.color);
  // console.log(data)
  currentColor.value = 'ffffff';
  data.color = ref('ffffff');
  for (const row of rows.value) {
    row.color = currentColor.value;
  }
};


const editItem = ref({})
const editData = (item) => {
  editItem.value = item

  // emits (save)
  editItem.value = {}
  return {}
}
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
}
</style>
