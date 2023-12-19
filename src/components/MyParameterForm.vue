<template>
  <div class="container">
    <div class="formgrid grid">
      <h2 class="field col-12">{{ props.formName }}</h2>
      <div class="field col-12 md:col-6">
        <label for="name">Название параметра</label>
        <InputText id="name" v-model="valueItem.name" />
      </div>
      <div class="field col-12 md:col-6">
        <label for="short_name">Сокращённое название</label>
        <InputText id="short_name" v-model="valueItem.short_name" />
      </div>
      <div class="field col-12">
        <label for="description">Описание</label>
        <Textarea id="description" rows="5" v-model="valueItem.description" />
      </div>
      <div class="field col-12 md:col-3">
        <label for="is_negative">isNegative</label>
        <Dropdown
          v-model="valueItem.is_negative"
          id="is_negative"
          style="appearance: auto"
          :options="values.isNegative"
          optionLabel="name"
          optionValue="value"
          placeholder="Выберите значение"
        />
      </div>
      <div class="field col-12 md:col-3">
        <label for="type_name">type name</label>
        <Dropdown
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
        <label for="form_name">form name</label>
        <Dropdown
          v-model="valueItem.form.name"
          id="form_name"
          style="appearance: auto"
          :options="values.formName"
          optionLabel="name"
          optionValue="value"
          placeholder="Выберите значение"
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
      <div class="field col-12 md:col-6" v-if="valueItem.type.name === 'keyword'">
        <label for="reference">reference</label>
        <InputText id="reference" v-model="valueItem.reference" />
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
  parameters: {
    type: Array,
    required: true,
  },
  parameter: {
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
const valueItem = props.parameter;

const emit = defineEmits(['success', 'cancel']);

const success = (event) => {
  event.preventDefault();
  let newParameter = {};
  newParameter = valueItem;
  emit('success', newParameter);
};

const cancel = () => {
  emit('cancel');
};
</script>

<style scoped>

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
  width: 100%;
  align-items: center;
  justify-content: flex-end;
}
.p-button {
  width: 200px;
  margin-left: 20px;
}
</style>
