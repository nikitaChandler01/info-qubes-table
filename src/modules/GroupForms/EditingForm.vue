<template>
  <MyGroupForm
    :group="editingGroup"
    :successText="successText"
    :cancelText="cancelText"
    :formName="formName"
  />
</template>

<script setup>
import MyGroupForm from '@components/MyGroupForm.vue';

const props = defineProps({
  group: {
    type: Object,
    required: true,
  },
  parameters: {
    type: Array,
    required: true,
  },
});
const editingGroup = props.group;
editingGroup.parametersForChoose = props.parameters;
const formName = 'Форма изменения группы';
const successText = 'Сохранить';
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
  height: 700px;
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
