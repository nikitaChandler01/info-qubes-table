<template>
  <div class="bar">
    <DataTable :value="rows" stripedRows class="p-datatable-table">
      <Column field="name" header="Категории"></Column>
      <Column field="script" header="Scripts"></Column>
      <Column field="restictions" header="Restictions"></Column>
      <Column field="courtesy" header="Courtesy"></Column>
    </DataTable>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import _ from "lodash";

const parameters = {
  script: { name: "script", id: 1, categories: [23, 45, 89] },
  restictions: { name: "restictions", id: 2, categories: [56, 78, 8] },
  courtesy: { name: "courtesy", id: 3, categories: [10, 11, 47] },
};
const categories = {
  23: "Приветствие",
  45: "Прощание",
  89: "Эмпатия",
  56: "Вежливость",
  78: "Общая полнота",
  8: "Презентация",
  10: "Понимание и сочувствие",
  11: "Профессионализм",
  47: "Уверенность",
};

const hits = {
  line1: { 23: 2, 45: 3, 8: 4, 11: 46 },
  line2: { 23: 14, 45: 44, 89: 2, 10: 10 },
  line3: { 23: 4, 45: 6 },
  line4: { 23: 11, 89: 9, 45: 56 },
  line5: { 8: 19, 56: 4, 11: 78 },
  line6: { 78: 4, 56: 2, 47: 56 },
};

const prepareData = (parameters, categories, hits) => {
  const summuryHits = Object.values(hits).reduce((acc, line) => {
    Object.entries(line).forEach(([id, count]) => {
      if (!_.has(acc, id)) {
        acc[id] = count;
      } else {
        acc[id] += count;
      }
    });
    return acc;
  }, {});

  const rows = Object.keys(categories).map((id) => {
    const numId = Number(id);
    const row = {};
    row.id = numId;
    for (const param of Object.values(parameters)) {
      if (param.categories.includes(numId)) {
        row.name = categories[id];
        row[param.name] = summuryHits[id];
      } else {
        row[param.name] = 0;
      }
    }
    return row;
  });
  return rows;
};

export default {
  components: {
    DataTable,
    Column,
  },
  data() {
    return {
      rows: prepareData(parameters, categories, hits),
    };
  },
};
</script>

<style scoped></style>