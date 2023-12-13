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
            @success="editParameter"
            @cancel="closeForm"
            :parameter="paramForEdit"
            :parameters="allIdParameters"
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
          <CreatingForm @success="addParameter" @cancel="closeForm" :parameters="allIdParameters" />
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
        <div
          class="content__params"
          v-if="dataCopyParams"
          :class="{ hidden: !dataCopyParams.length }"
        >
          <DataTable
            showGridlines
            scrollable
            scrollHeight="95vh"
            class="table params"
            :value="dataCopyParams"
            editMode="row"
            dataKey="id"
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
            <Column style="background-color: #f9fafb">
              <template #header>
                <Button label="Создать" @click="createParam" style="width: 120px" />
              </template>
              <template #body="slotProps">
                <div class="action-group">
                  <Button
                    label="Изменить"
                    @click="editingParam(slotProps.data)"
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
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, reactive, onUpdated } from 'vue';
import translateMapping from '@mocks/translateMapping.js';
import values from '@mocks/dropDownValues.js';
import CreatingForm from '@modules/ParameterForms/CreatingForm.vue';
import EditingForm from '@modules/ParameterForms/EditingForm.vue';

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

const parameters = ref();
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

const emit = defineEmits(['dataChanged', 'rowDeleted', 'dataAdded']);

const editParameter = (editItem) => {
  state.isVisibleEditingForm = false;
  const index = editItem.id;
  delete editItem.id;
  emit('dataChanged', editItem, 'Параметр', editItem.name, index);
};

const removeRow = ({ data }) => {
  console.log(data);
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
  emit('rowDeleted', idOfDeletedItem, newGroups, 'Параметр', data.name);
};

const closeForm = () => {
  state.isVisibleCreatingForm = false;
  state.isVisibleEditingForm = false;
};

const addParameter = (newParameter) => {
  state.isVisibleCreatingForm = false;
  emit('dataAdded', newParameter, 'Параметр', newParameter.name, newParameter.screen_name);
};

let paramForEdit = {};

const editingParam = (object) => {
  paramForEdit = object;
  state.isVisibleEditingForm = true;
};

const createParam = () => {
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
.params {
  position: absolute;
  top: 0;
}
.hidden {
  display: none;
}
</style>
