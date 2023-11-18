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
    <Column
      v-for="col in columns"
      :key="col.field"
      :field="col.field"
      :header="col.header"
      :values="col.values"
    >
      <template #editor="{ data, field }">
        <template v-if="!dropDownFields.includes(field)">
          <template v-if="field === 'description'">
            <Textarea autoresize v-model="data[field]" rows="3" cols="30" />
          </template>
          <template v-else>
            <InputText v-model="data[field]" autofocus />
          </template>
        </template>
        <template v-if="dropDownFields.includes(field)">
          <div class="card flex justify-content-center">
            <Dropdown
              v-model="data[field]"
              :options="col.values"
              optionLabel="name"
              placeholder="Выберите значение"
              class="w-full md:w-14rem"
            />
          </div>
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
    <Column
      v-for="col in columns"
      :key="col.field"
      :field="col.field"
      :header="col.header"
      :values="col.values"
    >
      <template #editor="{ data, field }">
        <template v-if="!dropDownFields.includes(field)">
          <template v-if="field === 'description'">
            <Textarea autoresize v-model="data[field]" rows="3" cols="30" />
          </template>
          <template v-else>
            <InputText v-model="data[field]" autofocus />
          </template>
        </template>
        <template v-if="dropDownFields.includes(field)">
          <div class="card flex justify-content-center">
            <Dropdown
              v-model="data[field]"
              :options="col.values"
              optionLabel="name"
              placeholder="Выберите значение"
              class="w-full md:w-14rem"
            />
          </div>
        </template>
      </template>
    </Column>
  </DataTable>
</template>
<!--  вывести в таблицу name, is_negative, description, short_name, form, type -->
<script setup>
import { computed, ref } from 'vue';
import { sortBy } from 'lodash';

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

const dropDownFields = ['isNegative', 'type.name', 'form.name'];

const isNegativeValues = ref(sortBy([{ name: 'true' }, { name: 'false' }], 'name'));
const typeNameValues = sortBy(
  [{ name: 'grade' }, { name: 'keyward' }, { name: 'meta' }, { name: 'filter' }, { name: 'group' }],
  'name',
);

const formNameValues = sortBy(
  [{ name: 'simple' }, { name: 'compound' }, { name: 'coach' }, { name: 'client' }],
  'name',
);

const dataKeys = computed(() => {
  return Object.keys(props.data);
});
const columns = ref([
  { field: 'id', header: 'Parameter/Параметр' },
  { field: 'name', header: 'Name/Имя параметра' },
  { field: 'isNegative', header: 'isNegative', values: isNegativeValues },
  { field: 'description', header: 'Description/Описание' },
  { field: 'shortName', header: 'Short Name/Сокращение' },
  { field: 'type.name', header: 'type name', values: typeNameValues },
  { field: 'form.name', header: 'form name', values: formNameValues },
]);

console.log(columns.value[2].values);
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
  let { data, newValue, field } = event;

  if (dropDownFields.includes(field)) {
    data[field] = newValue.name ?? data[field];
  } else {
    data[field] = newValue;
  }
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
