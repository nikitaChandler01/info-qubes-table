<template>
  <div class="data-container">
    <div class="content__form">
      <Dialog
        v-model:visible="state.isVisibleEditingForm"
        modal
        header="Header"
        style="width: 100%"
      >
        <template #container>
          <EditingForm
            @success="editGroup"
            @cancel="closeForm"
            :group="groupForEdit"
            :parameters="parameters"
            succesText="Сохранить"
            cancelText="Закрыть"
          />
        </template>
      </Dialog>
      <Dialog
        v-model:visible="state.isVisibleCreatingForm"
        modal
        header="Header"
        style="width: 100%"
      >
        <template #container>
          <CreatingForm
            @success="addGroup"
            @cancel="closeForm"
            :ids="allIdParameters"
            :parameters="parameters"
          />
        </template>
      </Dialog>
    </div>
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
      <div class="content__tables">
        <DataTable
          v-model:expandedRows="expandedRows"
          @rowExpand="onRowExpand"
          @rowCollapse="onRowCollapse"
          showGridlines
          scrollable
          scrollHeight="87vh"
          class="table groups"
          v-model:editingRows="editingRows"
          :value="rowsGroup"
          editMode="row"
          dataKey="id"
        >
          <template #header>
            <div class="flex flex-wrap justify-content-end gap-2">
              <Button
                text
                icon="pi pi-plus"
                label="Расскрыть группы, имеющие параметры"
                @click="expandAll"
              />
              <Button
                text
                icon="pi pi-minus"
                label="Свернуть параметры групп"
                @click="collapseAll"
              />
            </div>
          </template>
          <Column expander style="width: 5rem" />
          <Column field="id" header="Группа" style="width: 15%">
            <template #body="{ data, field }">
              {{ data[field] }}
            </template>
          </Column>
          <Column field="name" header="Name/Имя" style="width: 15%">
            <template #body="{ data, field }">
              <div style="display: flex">
                {{ data[field] }}
              </div>
            </template>
          </Column>
          <Column field="short_name" header="Short Name/Сокращение" style="width: 15%">
            <template #body="{ data, field }">
              {{ data[field] }}
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
              <div v-if="data.parameters.length > 2" class="card flex justify-content-center">
                <VirtualScroller
                  :items="data.parametersNames"
                  :itemSize="20"
                  class="border-1 surface-border border-round"
                  :style="{
                    width: 100 + '%',
                    height: 202 + 'px',
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
              <div
                v-else-if="data.parameters.length === 2"
                class="card flex justify-content-center"
              >
                <VirtualScroller
                  :items="data.parametersNames"
                  :itemSize="20"
                  class="border-1 surface-border border-round"
                  :style="{
                    width: 100 + '%',
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
              <div
                v-else-if="data.parameters.length < 2"
                class="card flex justify-content-center"
                style="width: 100%"
              >
                {{ data.parametersNames[0] }}
              </div>
            </template>
          </Column>
          <Column style="background-color: #f9fafb">
            <template #header>
              <Button label="Создать" @click="createParam" style="width: 120px" />
            </template>
            <template #body="slotProps">
              <div class="action-group">
                <Button
                  label="Изменить"
                  @click="editingGroup(slotProps.data)"
                  style="width: 120px; margin-bottom: 10px"
                />
                <Button
                  label="Удалить"
                  severity="danger"
                  @click="removeRow(slotProps)"
                  style="width: 120px"
                />
              </div>
            </template>
          </Column>
          <template #expansion="slotProps">
            <div class="p-3" v-if="slotProps.data.parameters.length > 0">
              <h3>Параметры группы "{{ slotProps.data.name }}"</h3>
              <DataTable
                showGridlines
                scrollable
                scrollHeight="400px"
                class="table params"
                :value="slotProps.data.advancedParameters"
                dataKey="id"
              >
                <Column :field="'screen_name'" header="Parameter/Параметр" style="width: 10%">
                  <template #body="slotProps">
                    {{ slotProps.data.screen_name }}
                  </template>
                </Column>
                <Column :field="'name'" header="Name/Имя" style="width: 15%">
                  <template #body="{ data, field }">
                    {{ data[field] }}
                  </template>
                </Column>
                <Column :field="'is_negative'" header="isNegative" style="width: 10%">
                  <template #body="{ data, field }">
                    {{ translateMapping[data[field]]() }}
                  </template>
                </Column>
                <Column :field="'description'" header="Description/Описание" style="width: 35%">
                  <template #body="{ data, field }">
                    {{ data[field] }}
                  </template>
                </Column>
                <Column :field="'short_name'" header="Short Name/Сокращение" style="width: 15%">
                  <template #body="{ data, field }">
                    {{ data[field] }}
                  </template>
                </Column>
                <Column :field="'type.name'" header="type name" style="width: 15%">
                  <template #body="{ data }">
                    {{ translateMapping[data.type.name]() }}
                  </template>
                </Column>
                <Column :field="'form.name'" header="form name" style="width: 10%">
                  <template #body="{ data }">
                    {{ translateMapping[data.form.name]() }}
                  </template>
                </Column>
              </DataTable>
            </div>
            <div v-else class="p-3" style="border: 1px solid #d0d0d0; border-radius: 20px">
              <h3 style="text-align: center">
                В группе "{{ slotProps.data.name }}" нет параметров
              </h3>
            </div>
          </template>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, reactive, onUpdated } from 'vue';
import translateMapping from '@mocks/translateMapping.js';
import CreatingForm from '@modules/GroupForms/CreatingForm.vue';
import EditingForm from '@modules/GroupForms/EditingForm.vue';

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
  isVisibleEditingForm: false,
  isVisibleCreatingForm: false,
});

const expandedRows = ref([]);

const expandAll = () => {
  expandedRows.value = rowsGroup.value.filter((el) => el.advancedParameters.length > 0);
};
const collapseAll = () => {
  expandedRows.value = null;
};
const onRowCollapse = () => {
  fillDataCopyParams(dataCopy);
};
const onRowExpand = ({ data }) => {};
const parameters = ref();
const editingRows = ref([]);
const dataCopy = ref(props.data);
const allIdParameters = Object.keys(dataCopy.value);
const dataCopyParams = ref([]);

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
      const newParameters = [];
      for (const parameter of value.parameters) {
        newParameters.push(dataCopy.value[parameter]);
      }
      value.advancedParameters = newParameters;
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
  item.short_name = group['short_name'];
  item.aggregation = group.aggregation ?? '';
  item.type = group.type;
  item.parameters = group.parameters;
  item.parametersNames = group.parameters.map((param) => dataCopy.value[param].name);
  item.selectedParameters = group.parameters.map((param) => ({
    name: dataCopy.value[param].name,
    value: dataCopy.value[param].id,
  }));
  item.advancedParameters = group.advancedParameters;
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
      item.aggregation = group.aggregation ?? '';
      item.name = group.name;
      item.description = group.description;
      item.short_name = group['short_name'];
      item.type = group.type;
      item.parameters = group.parameters;
      item.parametersNames = group.parameters.map((param) => dataCopy.value[param].name);
      item.selectedParameters = group.parameters.map((param) => ({
        name: dataCopy.value[param].name,
        value: dataCopy.value[param].id,
      }));
      item.advancedParameters = group.advancedParameters;
      item.count = item.parameters.length;
      rowsGroup.value.push(item);
    }
  },
  {
    deep: true,
  },
);

const emit = defineEmits(['dataChanged', 'rowDeleted', 'dataAdded']);

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
  emit('rowDeleted', idOfDeletedItem, newGroups, 'Группа', data.name);
};

const addGroup = (newGroup) => {
  state.isVisibleCreatingForm = false;
  newGroup.selectedParameters.forEach(({ _, value }) => {
    newGroup.parameters.push(value);
  });
  delete newGroup.selectedParameters;
  delete newGroup.parametersForChoose;
  const index = newGroup.screen_name;
  delete newGroup.screen_name;
  emit('dataAdded', newGroup, 'Группа', newGroup.name, index);
};

let groupForEdit = {};

const editingGroup = (object) => {
  groupForEdit = object;
  state.isVisibleEditingForm = true;
};

const editGroup = (newGroup) => {
  state.isVisibleEditingForm = false;
  newGroup.parameters = newGroup.selectedParameters.map(({ _, value }) => {
    return value;
  });
  const index = newGroup.id;
  delete newGroup.id;
  delete newGroup.parametersForChoose;
  delete newGroup.parametersNames;
  delete newGroup.selectedParameters;
  emit('dataChanged', newGroup, 'Группа', newGroup.name, index);
};
const closeForm = () => {
  groupForEdit = {};
  state.isVisibleCreatingForm = false;
  state.isVisibleEditingForm = false;
};
const createGroup = () => {
  state.isVisibleCreatingForm = true;
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
.groups {
  position: absolute;
  top: 0;
}
.hidden {
  display: none;
}
.p-multiselect {
  padding: 0;
  margin: 0;
}
.action-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
