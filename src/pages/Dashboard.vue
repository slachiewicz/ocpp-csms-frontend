<template>
  <pie-chart
    :collection-data="data"
    :options="options"
  ></pie-chart>
</template>

<script setup>
import {onMounted, ref} from "vue";
import PieChart from "@/components/PieChart";

const pieConf = {
  "available": '#ea9191',
  "charging": '#66DA26',
  "reserved": '#2edbfa',
  "offline": '#cfd2ce'
}

const chartHeaders = ['Status', 'Count']

const data = ref([]);

const options = {
  pieHole: 0.4,
  width: 400,
  height: 300,
  colors: Object.values(pieConf),
  legend: 'none',
};

const processSSE = (event) => {
    let response = JSON.parse(event.data)
    let data = response.data.meta.count;
    updatePieChart(pieConf, chartHeaders, data)
  }

// component
const updatePieChart = (conf, headers, statuses) => {
    data.value = [headers]
    for (let pkey in conf) {
      for (let rkey in statuses) {
        if (pkey === rkey) {
          data.value.push([pkey, statuses[rkey]])
        }
      }
    }
  }

onMounted(() => {
  // component
  const sse = new EventSource("http://localhost:8000/stream");
    sse.addEventListener("message", (e) => {
      processSSE(e);
    });

  let response = {
    "available": 0,
    "offline": 2,
    "reserved": 0,
    "charging": 0
  };
  updatePieChart(pieConf, chartHeaders, response)
})
</script>
