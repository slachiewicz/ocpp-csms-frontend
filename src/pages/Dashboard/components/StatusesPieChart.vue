<template>
  <pie-chart
    :collection-data="chartData"
    :options="CHART_CONF.options"
  ></pie-chart>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref, watch, onBeforeMount } from "vue";
import PieChart from "@/components/PieChart";
import { useStationsStore } from "@/store/stations";
import { STATION_STATUS_COLOR } from "@/components/enums";

const sseStore = useStationsStore();
const { getCounters } = sseStore;
const { counters } = storeToRefs(sseStore);

const chartData = ref([]);

const CHART_CONF = {
  headers: ["", ""],
  options: {
    pieHole: 0.4,
    colors: [],
    legend: "right",
  },
  initialize(colors) {
    this.options.colors = Object.values(colors);
  },
  updateData(chartData, counters, colors) {
    chartData.value = [this.headers];
    for (let pkey in colors) {
      for (let rkey in counters) {
        if (pkey === rkey) {
          chartData.value.push([pkey, counters[rkey]]);
        }
      }
    }
  },
};

watch(counters, () =>
  CHART_CONF.updateData(chartData, getCounters(), STATION_STATUS_COLOR)
);

onBeforeMount(() => {
  CHART_CONF.initialize(STATION_STATUS_COLOR);
  CHART_CONF.updateData(chartData, getCounters(), STATION_STATUS_COLOR);
});
</script>
