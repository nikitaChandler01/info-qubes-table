<template>
  <div class="data-container">
    <div
      v-if="isLoading"
      :style="{
        position: 'absolute',
        top: 50 + '%',
        left: 50 + '%',
      }"
    >
      <ProgressSpinner
        style="width: 50px; height: 50px"
        strokeWidth="8"
        fill="var(--surface-ground)"
        animationDuration=".5s"
        aria-label="Custom ProgressSpinner"
      />
    </div>
    <div v-else="dataCopy" class="content">
      <div class="content__form"></div>
      <div class="content__tables">
        <div
          class="content__params"
          v-if="dataCopyParams"
          :class="{ hidden: !dataCopyParams.length }"
        >
          <DataTable
            showGridlines
            scrollable
            scrollHeight="46vh"
            class="table params"
            v-model:editingRows="editingRows"
            :value="dataCopyParams"
            editMode="row"
            dataKey="id"
            @row-edit-save="onRowEditSave"
          >
            <Column :field="'screen_name'" header="Parameter/Параметр" style="width: 10%">
              <template #body="slotProps">
                {{ slotProps.data.screen_name }}
                <div style="display: flex; justify-content: space-around; flex-wrap: wrap">
                  <div class="color-container" v-for="item in Object.values(state.coloredGroups)">
                    <div
                      v-if="item.parameters.includes(slotProps.data.screen_name)"
                      :style="{
                        background: item.color,
                        width: 20 + 'px',
                        height: 20 + 'px',
                        borderRadius: 50 + '%',
                      }"
                    />
                  </div>
                </div>
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
                <Textarea v-model="data[field]" autoResize rows="5" cols="30" />
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
            <Column :field="'form.name'" header="form name" style="width: 10%">
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
            <Column
              :rowEditor="true"
              style="width: 10%; min-width: 8rem"
              bodyStyle="text-align:center"
            />
            <Column style="background-color: #f9fafb">
              <template #header>
                <div class="content__form">
                  <Button label="Создать" @click="state.isVisibleCreatingForm = true" />
                  <Dialog
                    v-model:visible="state.isVisibleCreatingForm"
                    modal
                    header="Header"
                    style="width: 100%"
                  >
                    <template #container>
                      <MyCreateForm
                        @parameterAdded="addParameter"
                        @canceledCreating="closeForm"
                        :parameters="allIdParameters"
                      />
                    </template>
                  </Dialog>
                </div>
              </template>
              <template #body="slotProps">
                <Button label="Удалить" severity="danger" @click="removeRow(slotProps)" />
              </template>
            </Column>
          </DataTable>
        </div>
        <div v-if="dataCopyParams.length === 0">
          <h1 style="padding: 0; margin: 0; text-align: center">Параметры отсутствуют</h1>
        </div>
        <DataTable
          showGridlines
          scrollable
          scrollHeight="46vh"
          class="table groups"
          v-model:editingRows="editingRows"
          :value="rowsGroup"
          editMode="row"
          dataKey="id"
          @row-edit-save="onRowGroupEditSave"
        >
          <Column field="id" header="Группа" style="width: 15%">
            <template #editor="{ data, field }">
              <InputText v-model="data[field]" />
            </template>
          </Column>
          <Column field="name" header="Name/Имя" style="width: 15%">
            <template #body="{ data, field }">
              <div style="display: flex">
                <div class="color-box" :style="`background: ${data.color}`" />
                {{ data[field] }}
              </div>
            </template>
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
              {{ translateMapping[data.type.name]() }}
            </template>
          </Column>
          <Column field="count" header="Count of params/Количество параметров" style="width: 15%">
            <template #body="{ data }">
              <div style="display: flex; justify-content: center">
                <span style="text-align: center">{{ data.count }}</span>
              </div>
            </template>
          </Column>
          <Column header="Parameters/Параметры" style="width: 15%">
            <template #body="{ data }">
              <div v-if="data.parametersNames.length > 2" class="card flex justify-content-center">
                <VirtualScroller
                  :items="data.parametersNames"
                  :itemSize="20"
                  class="border-1 surface-border border-round"
                  :style="{
                    width: 200 + 'px',
                    height: 200 + 'px',
                  }"
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
              </div>
              <div v-else-if="data.parametersNames.length === 2">
                <VirtualScroller
                  :items="data.parametersNames"
                  :itemSize="20"
                  class="border-1 surface-border border-round"
                  :style="{
                    width: 200 + 'px',
                    height: 102 + 'px',
                  }"
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
              </div>
              <div v-else-if="data.parametersNames.length < 2" style="padding: 8px">
                {{ data.parametersNames[0] }}
              </div>
            </template>
            <template #editor="{ data }">
              <div class="card flex justify-content-center">
                <MultiSelect
                  v-model="data.selectedParameters"
                  :options="parameters"
                  filter
                  optionLabel="name"
                  placeholder="Выберите параметр"
                  :maxSelectedLabels="2"
                />
              </div>
            </template>
          </Column>
          <Column header="Действия">
            <template #body="{ data }">
              <div class="btn-group" style="display: flex">
                <Button icon="pi pi-eye" text severity="secondary" @click="showParameters(data)" />
                <Button
                  icon="pi pi-times"
                  text
                  severity="secondary"
                  @click="showAllParameters(data)"
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, reactive, onUpdated } from 'vue';
import translateMapping from '@/mocks/translateMapping.js';
import values from '@/mocks/dropDownValues.js';
import { find } from 'lodash';

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
const state = reactive({
  showedAllParams: true,
  isVisibleCreatingForm: false,
  coloredGroups: {},
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
const parameters = ref();
const editingRows = ref([]);
const dataCopy = ref(props.data);
const allIdParameters = Object.keys(dataCopy.value);
const dataKeys = computed(() => Object.keys(dataCopy.value));
const dataCopyParams = ref([]);

const hideTableStyle = {
  display: 'none',
};

onUpdated(() => {
  dataCopy.value = props.data;
  parameters.value = dataCopyParams.value.map((param) => ({
    name: param.name,
    value: param.id,
  }));
});

const fillDataCopyParams = (dataCopy) => {
  dataCopyParams.value = [];
  for (const [key, value] of Object.entries(dataCopy.value)) {
    if (value.type.name !== 'group') {
      value.id = key;
      dataCopyParams.value.push(value);
    }
  }
};
fillDataCopyParams(dataCopy);

watch(
  () => dataCopy,
  (_, newDataCopy) => {
    fillDataCopyParams(newDataCopy);
  },
  {
    deep: true,
  },
);

const dataCopyGroups = ref([]);

const fillDataCopyGroups = (dataCopy) => {
  dataCopyGroups.value = [];
  for (const [key, value] of Object.entries(dataCopy.value)) {
    if (value.type.name === 'group') {
      value.id = key;
      dataCopyGroups.value.push(value);
    }
  }
};
fillDataCopyGroups(dataCopy);

watch(
  () => dataCopy,
  (_, newDataCopy) => {
    fillDataCopyGroups(newDataCopy);
  },
  {
    deep: true,
  },
);

const rowsGroup = ref([]);
for (const group of dataCopyGroups.value) {
  const item = {};
  item.id = group.id;
  item.name = group.name;
  item.description = group.description;
  item.shortName = group['short_name'];
  item.type = group.type;
  item.parameters = group.parameters;
  item.parametersNames = group.parameters.map((param) => dataCopy.value[param].name);
  item.selectedParameters = ref(
    group.parameters.map((param) => ({
      name: dataCopy.value[param].name,
      value: dataCopy.value[param].id,
    })),
  );
  item.color = find(arrayColors, (item) => item[group.id])[group.id];
  item.count = item.parameters.length;
  rowsGroup.value.push(item);
}
watch(
  () => dataCopyGroups,
  (_, newDataCopyGroups) => {
    rowsGroup.value = [];
    for (const group of newDataCopyGroups.value) {
      const item = {};
      item.id = group.id;
      item.name = group.name;
      item.description = group.description;
      item.shortName = group['short_name'];
      item.type = group.type;
      item.parameters = group.parameters;
      item.parametersNames = group.parameters.map((param) => dataCopy.value[param].name);
      item.selectedParameters = ref(
        group.parameters.map((param) => ({
          name: dataCopy.value[param].name,
          value: dataCopy.value[param].id,
        })),
      );
      item.color = find(arrayColors, (item) => item[group.id])[group.id];
      item.count = item.parameters.length;
      rowsGroup.value.push(item);
    }
  },
  {
    deep: true,
  },
);

const emit = defineEmits(['paramsChanged', 'groupsChanged', 'rowDeleted', 'parameterAdded']);

const onRowEditSave = (event) => {
  let editItem = {};
  const index = event.newData.id;
  editItem = event.newData;
  delete editItem.id;
  emit('paramsChanged', editItem, index);
};

const onRowGroupEditSave = (event) => {
  let editItem = {};
  const index = event.newData.id;
  editItem = event.newData;
  editItem.parameters = [];
  for (const selectedParameter of editItem.selectedParameters) {
    editItem.parameters.push(selectedParameter.value);
  }
  delete editItem.selectedParameters;
  delete editItem.id;
  delete editItem.count;
  delete editItem.color;
  delete editItem.parametersNames;
  emit('groupsChanged', editItem, index);
};

const removeRow = ({ data }) => {
  const newGroups = {};
  const idOfDeletedItem = data.id;
  for (const group of dataCopyGroups.value) {
    if (group.parameters.includes(idOfDeletedItem)) {
      const indexOfParam = group.parameters.indexOf(idOfDeletedItem);
      group.parameters.splice(indexOfParam, 1);
      newGroups[group.id] = group;
      delete newGroups[group.id].id;
    }
  }
  emit('rowDeleted', idOfDeletedItem, newGroups);
};

const addColor = (data, field) => {
  state.coloredGroups[data.id] = {};
  state.coloredGroups[data.id].parameters = data.parameters;
  state.coloredGroups[data.id].color = find(arrayColors, (item) => item[data.id])[data.id];
};
const deleteColor = (data, field) => {
  delete state.coloredGroups[data.id];
};

const showParameters = (data) => {
  const buffDataCopy = ref({});
  for (const param of data.parameters) {
    buffDataCopy.value[param] = dataCopy.value[param];
  }
  fillDataCopyParams(buffDataCopy);
};
const showAllParameters = (data) => {
  fillDataCopyParams(dataCopy);
};
const closeForm = () => {
  state.isVisibleCreatingForm = false;
};

const addParameter = (newParameter) => {
  state.isVisibleCreatingForm = false;
  emit('parameterAdded', newParameter);
};
</script>
<style scoped>
.data-container {
  height: 100%;
}
.table {
  /* width: 100%; */
  border: 1px solid #e5e7eb;
}
.content__tables {
  height: 100%;
}
.params {
  position: absolute;
  top: 0;
}
.groups {
  position: absolute;
  bottom: 0;
}
.hidden {
  display: none;
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
