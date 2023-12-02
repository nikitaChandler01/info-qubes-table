<template>
  <div class="container">
    <div class="formgrid grid">
      <h2 class="field col-12">Форма создания параметра</h2>
      <div class="field col-12 md:col-6">
        <label for="name">Название параметра</label>
        <InputText id="name" v-model="creatingParam.name" />
      </div>
      <div class="field col-12 md:col-6">
        <label for="short_name">Сокращённое название</label>
        <InputText id="short_name" v-model="creatingParam.short_name" />
      </div>
      <div class="field col-12">
        <label for="description">Описание</label>
        <Textarea id="description" rows="5" v-model="creatingParam.description" />
      </div>
      <div class="field col-12 md:col-3">
        <label for="is_negative">isNegative</label>
        <Dropdown
          v-model="creatingParam.is_negative"
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
          v-model="creatingParam.type.name"
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
          v-model="creatingParam.form.name"
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
          v-model="creatingParam.aggregation"
          id="aggregation"
          style="appearance: auto"
          :options="values.aggregation"
          optionLabel="name"
          optionValue="value"
          placeholder="Выберите значение"
        />
      </div>
      <div class="field col-12 md:col-6" v-if="creatingParam.type.name === 'keyword'">
        <label for="reference">reference</label>
        <InputText id="reference" v-model="creatingParam.reference" />
      </div>
    </div>
    <div style="display: flex; align-items: center; justify-content: space-between">
      <p>ID параметра: {{ creatingParam.screen_name }}</p>
      <div class="btn-group">
        <Button label="Создать" severity="success" @click="createParam" />
        <Button label="Отменить" severity="danger" @click="cancelCreating" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { randomizeParamName } from '@services/services.js';
import translateMapping from '@mocks/translateMapping';
import values from '../mocks/dropDownValues.js';

const props = defineProps({
  parameters: {
    type: Array,
    required: true,
  },
});
const creatingParam = ref({
  aggregation: '',
  description: '',
  form: {
    name: '',
    screen_name: '',
  },
  is_negative: '',
  name: '',
  reference: '',
  role: {
    screen_name: '',
    name: '',
  },
  screen_name: randomizeParamName(props.parameters),
  short_name: '',
  track: {
    name: '',
    screen_name: '',
  },
  type: {
    screen_name: '',
    name: '',
  },
});

const emit = defineEmits(['parameterAdded', 'canceledCreating']);

const createParam = (event) => {
  event.preventDefault();
  let newParameter = {};
  newParameter = creatingParam.value;
  const idOfParameter = creatingParam.value.screen_name;
  emit('parameterAdded', newParameter);
  creatingParam.value = {
    aggregation: '',
    description: '',
    form: {
      name: '',
      screen_name: '',
    },
    is_negative: '',
    name: '',
    reference: '',
    role: {
      screen_name: '',
      name: '',
    },
    screen_name: randomizeParamName(props.params),
    short_name: '',
    track: {
      name: '',
      screen_name: '',
    },
    type: {
      screen_name: '',
      name: '',
    },
  };
};

const cancelCreating = () => {
  emit('canceledCreating');
  creatingParam.value = {
    aggregation: '',
    description: '',
    form: {
      name: '',
      screen_name: '',
    },
    is_negative: '',
    name: '',
    reference: '',
    role: {
      screen_name: '',
      name: '',
    },
    screen_name: randomizeParamName(props.parameters),
    short_name: '',
    track: {
      name: '',
      screen_name: '',
    },
    type: {
      screen_name: '',
      name: '',
    },
  };
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
  width: 240px;
  align-items: center;
}
.p-button {
  width: 100px;
  margin-right: 20px;
}
</style>
