<template>
  <pie-chart :collection-data="statusesData" :options="options"></pie-chart>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref, watch, onBeforeMount } from "vue";
import PieChart from "@/components/PieChart";
import { useStationsStore } from "@/store/stations";

const sseStore = useStationsStore();
const { getCounters } = sseStore;
const { counters } = storeToRefs(sseStore);

const pieConf = {
  available: "#ea9191",
  charging: "#66DA26",
  reserved: "#2edbfa",
  offline: "#cfd2ce",
};

const chartHeaders = ["Status", "Count"];

const statusesData = ref([]);

const options = {
  pieHole: 0.4,
  colors: Object.values(pieConf),
  legend: "right",
};

const updateChart = (conf, headers, statuses) => {
  statusesData.value = [headers];
  for (let pkey in conf) {
    for (let rkey in statuses) {
      if (pkey === rkey) {
        statusesData.value.push([pkey, statuses[rkey]]);
      }
    }
  }
};

watch(counters, () => updateChart(pieConf, chartHeaders, getCounters()));

onBeforeMount(() => {
  updateChart(pieConf, chartHeaders, getCounters());
});
</script>
