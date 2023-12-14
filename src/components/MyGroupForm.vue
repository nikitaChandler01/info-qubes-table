<template>
  <div class="container">
    <div class="formgrid grid">
      <h2 class="field col-12">{{ props.formName }}</h2>
      <div class="field col-12 md:col-6">
        <label for="name">Название группы</label>
        <InputText id="name" v-model="valueItem.name" />
      </div>
      <div class="field col-12 md:col-6">
        <label for="name">Сокращённое название</label>
        <InputText id="name" v-model="valueItem.short_name" />
      </div>
      <div class="field col-12">
        <label for="description">Описание</label>
        <Textarea id="description" rows="5" v-model="valueItem.description" />
      </div>
      <div class="field col-12 md:col-3">
        <label for="type_name">type name</label>
        <Dropdown
          disabled
          v-model="valueItem.type.name"
          id="type_name"
          style="appearance: auto"
          :options="values.typeName"
          optionLabel="name"
          optionValue="value"
          placeholder="Выберите значение"
        />
      </div>
      <div class="field col-12 md:col-3">
        <label for="type_name">Параметры группы</label>
        <MultiSelect
          v-model="valueItem.selectedParameters"
          :options="valueItem.parametersForChoose"
          filter
          optionLabel="name"
          placeholder="Выберите параметр"
          :maxSelectedLabels="2"
        />
      </div>
      <div class="field col-12 md:col-3">
        <label for="aggregation">aggregation</label>
        <Dropdown
          v-model="valueItem.aggregation"
          id="aggregation"
          style="appearance: auto"
          :options="values.aggregation"
          optionLabel="name"
          optionValue="value"
          placeholder="Выберите значение"
        />
      </div>
    </div>
    <div style="display: flex; align-items: center; justify-content: space-between">
      <div class="btn-group">
        <Button :label="props.successText" severity="success" @click="success" />
        <Button :label="props.cancelText" severity="info" @click="cancel" />
      </div>
    </div>
  </div>
</template>

<script setup>
import values from '@mocks/dropDownValues.js';

const props = defineProps({
  group: {
    type: Object,
    required: true,
  },
  successText: {
    type: String,
    required: true,
  },
  cancelText: {
    type: String,
    required: true,
  },
  formName: {
    type: String,
    required: true,
  },
});
const valueItem = props.group;
const emit = defineEmits(['success', 'cancel']);

const success = (event) => {
  event.preventDefault();
  let newGroup = {};
  newGroup = valueItem;
  emit('success', newGroup);
};

const cancel = () => {
  emit('cancel');
};
</script>

<style scoped>
.container {
  z-index: 3;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px;
  background: #fff;
  width: 80%;
  height: 800px;
  border-radius: 20px;
  border: 2px solid #949494;
}

.p-inputtext {
  margin-top: 10px;
  width: 100%;
}
.p-dropdown {
  margin-top: 10px;
  width: 100%;
}
.btn-group {
  display: flex;
  width: 440px;
  align-items: center;
}
.p-button {
  width: 200px;
  margin-right: 20px;
}
.p-multiselect {
  margin-top: 10px;
  width: 100%;
}
</style>
