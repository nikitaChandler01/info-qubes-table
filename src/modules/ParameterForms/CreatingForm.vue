<template>
<MyParameterForm 
  :parameters="props.parameters"
  :parameter="paramForCreating"
  :successText="successText"
  :cancelText="cancelText"
  :formName="formName"
  />
</template>

<script setup>
import { ref } from 'vue';
import { randomizeParamName } from '@services/services.js';
import MyParameterForm from '@components/MyParameterForm.vue';

const props = defineProps({
  parameters: {
    type: Array,
    required: true,
  },
});
const paramForCreating = ref({
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
const formName = 'Форма создания параметра'
const successText = 'Создать параметр';
const cancelText = 'Закрыть форму';

const emit = defineEmits(['parameterAdded', 'canceledCreating']);

// const createParam = (event) => {
//   event.preventDefault();
//   let newParameter = {};
//   newParameter = creatingParam.value;
//   emit('parameterAdded', newParameter);
//   creatingParam.value = {
//     aggregation: '',
//     description: '',
//     form: {
//       name: '',
//       screen_name: '',
//     },
//     is_negative: '',
//     name: '',
//     reference: '',
//     role: {
//       screen_name: '',
//       name: '',
//     },
//     screen_name: randomizeParamName(props.params),
//     short_name: '',
//     track: {
//       name: '',
//       screen_name: '',
//     },
//     type: {
//       screen_name: '',
//       name: '',
//     },
//   };
// };

// const cancelCreating = () => {
//   emit('canceledCreating');
//   creatingParam.value = {
//     aggregation: '',
//     description: '',
//     form: {
//       name: '',
//       screen_name: '',
//     },
//     is_negative: '',
//     name: '',
//     reference: '',
//     role: {
//       screen_name: '',
//       name: '',
//     },
//     screen_name: randomizeParamName(props.parameters),
//     short_name: '',
//     track: {
//       name: '',
//       screen_name: '',
//     },
//     type: {
//       screen_name: '',
//       name: '',
//     },
//   };
// };
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
