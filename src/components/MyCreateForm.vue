<template>
  <div class="container">
    <form class="my-form" @submit="onSubmit">
      <div class="my-form__element">
        <label for="parameter">ID параметра</label>
        <InputText disabled="true" v-model="creatingParam.screen_name" />
      </div>
      <div class="my-form__element">
        <label for="aggregation">aggregation</label>
        <InputText placeholder="Введите значение" v-model="creatingParam.aggregation" />
      </div>
      <div class="my-form__element my-form__element--description">
        <label for="description">description</label>
        <Textarea
          placeholder="Введите значение"
          v-model="creatingParam.description"
          rows="5"
          cols="30"
          autoResize
        />
      </div>
      <div class="my-form__element">
        <label for="form.name">form name</label>
        <Dropdown
          v-model="creatingParam.form.name"
          :options="values.formName"
          optionLabel="name"
          optionValue="value"
          placeholder="Выберите значение"
          class="w-full md:w-14rem"
        />
      </div>
      <div class="my-form__element">
        <label for="form.screen_name">form screen_name</label>
        <InputText placeholder="Введите значение" v-model="creatingParam.form.screen_name" />
      </div>
      <div class="my-form__element">
        <label for="is_negative">is_negative</label>
        <Dropdown
          v-model="creatingParam.is_negative"
          :options="values.isNegative"
          optionLabel="name"
          optionValue="value"
          placeholder="Выберите значение"
          class="w-full md:w-14rem"
        />
      </div>
      <div class="my-form__element">
        <label for="name">name</label>
        <InputText placeholder="Введите значение" v-model="creatingParam.name" />
      </div>
      <div class="my-form__element">
        <label for="reference">reference</label>
        <InputText placeholder="Введите значение" v-model="creatingParam.reference" />
      </div>
      <div class="my-form__element">
        <label for="role.screen_name">role screen_name</label>
        <InputText placeholder="Введите значение" v-model="creatingParam.role.screen_name" />
      </div>
      <div class="my-form__element">
        <label for="role.name">role name</label>
        <InputText placeholder="Введите значение" v-model="creatingParam.role.name" />
      </div>
      <div class="my-form__element">
        <label for="short_name">short name</label>
        <InputText placeholder="Введите значение" v-model="creatingParam.short_name" />
      </div>
      <div class="my-form__element">
        <label for="track.name">track name</label>
        <InputText placeholder="Введите значение" v-model="creatingParam.track.name" />
      </div>
      <div class="my-form__element">
        <label for="track.screen_name">track screen_name</label>
        <InputText placeholder="Введите значение" v-model="creatingParam.track.screen_name" />
      </div>
      <div class="my-form__element">
        <label for="type.name">type name</label>
        <Dropdown
          v-model="creatingParam.type.name"
          :options="values.typeName"
          optionLabel="name"
          optionValue="value"
          placeholder="Выберите значение"
          class="w-full md:w-14rem"
        />
      </div>
      <div class="my-form__element">
        <label for="type.screen_name">type screen_name</label>
        <InputText placeholder="Введите значение" v-model="creatingParam.type.screen_name" />
      </div>
      <div class="btn-group">
        <Button label="Создать" severity="success" type="submit" />
        <Button label="Отменить" severity="danger" @click="cancelCreating" />
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { randomizeParamName } from '@services/services.js';
import translateMapping from '@mocks/translateMapping.js';
import values from '../mocks/dropDownValues.js';

const props = defineProps({
  groups: {
    type: Array,
    required: true,
  },
  params: {
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
});

const emit = defineEmits(['parameterAdded', 'canceledCreating']);

const onSubmit = (event) => {
  event.preventDefault();
  let newParameter = {};
  newParameter = creatingParam.value
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
</script>

<style scoped>
.container {
  z-index: 3;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 40px;
  background: #fff;
  width: 80%;
  height: 800px;
  border-radius: 20px;
  border: 2px solid #949494;
}
.my-form {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.my-form__element {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: calc(80% / 3);
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
  margin-top: 20px;
  width: 240px;
}
.p-button {
  width: 100px;
  margin-right: 20px;
}
</style>
