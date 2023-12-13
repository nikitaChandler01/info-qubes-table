<template>
  <MyGroupForm
    :ids="props.ids"
    :group="groupForCreating"
    :successText="successText"
    :cancelText="cancelText"
    :formName="formName"
  />
</template>

<script setup>
import { ref } from 'vue';
import { randomizeParamName } from '@services/services.js';
import MyGroupForm from '@components/MyGroupForm.vue';

const props = defineProps({
  ids: {
    type: Array,
    required: true,
  },
  parameters: {
    type: Array,
    required: true,
  },
});
const groupForCreating = ref({
  aggregation: '',
  form: {
    name: '',
    screen_name: '',
  },
  name: '',
  screen_name: randomizeParamName(props.ids),
  short_name: '',
  track: {
    name: '',
    screen_name: '',
  },
  type: {
    screen_name: '',
    name: 'group',
  },
  parameters: [],
  parametersForChoose: props.parameters,
  selectedParameters: [],
});

const formName = 'Форма создания группы';
const successText = 'Создать группу';
const cancelText = 'Закрыть форму';
const emit = defineEmits(['parameterAdded', 'canceledCreating']);
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
