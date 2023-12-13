<template>
  <MyParameterForm 
  :parameters="props.parameters"
  :parameter="editingParam"
  :successText="successText"
  :cancelText="cancelText"
  :formName="formName"
  />
</template>

<script setup>
import MyParameterForm from '@components/MyParameterForm.vue';

const props = defineProps({
  parameters: {
    type: Array,
    required: true,
  },
  parameter: {
    type: Object,
    required: true,
  },
});
const formName = 'Форма изменения параметра'
const editingParam = props.parameter;
const successText = 'Изменить параметр';
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
