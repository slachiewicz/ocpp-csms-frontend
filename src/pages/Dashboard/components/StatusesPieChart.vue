<template>
  <pie-chart :collection-data="statusesData" :options="options"></pie-chart>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref, watch, onBeforeMount } from "vue";
import PieChart from "@/components/PieChart";
import { useStationsStore } from "@/store/stations";
import { getStatusColor } from "@/pages/utils";
import { STATION_STATUS } from "@/components/enums";

const sseStore = useStationsStore();
const { getCounters } = sseStore;
const { counters } = storeToRefs(sseStore);

const pieConf = {
  available: getStatusColor(STATION_STATUS.available),
  charging: getStatusColor(STATION_STATUS.charging),
  reserved: getStatusColor(STATION_STATUS.reserved),
  offline: getStatusColor(STATION_STATUS.offline),
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
