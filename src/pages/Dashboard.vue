<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="6"
      >
        <v-sheet
          rounded="lg"
          min-height="20vh"
        >
          <pie-chart
            :collection-data="statusesData"
            :options="options"
          ></pie-chart>
        </v-sheet>
      </v-col>

    <v-col
      cols="12"
      sm="6"
    >
      <v-sheet
        rounded="lg"
        min-height="20vh"
      >
        <pie-chart
          :collection-data="dummyData"
          :options="options"
        ></pie-chart>
      </v-sheet>
    </v-col>
  </v-row>
</v-container>
</template>

<script setup>
import {onMounted, ref} from "vue";
import PieChart from "@/components/PieChart";
import { useSSEStore } from "@/store/sse";

const pieConf = {
  "available": '#ea9191',
  "charging": '#66DA26',
  "reserved": '#2edbfa',
  "offline": '#cfd2ce'
}

const chartHeaders = ['Status', 'Count']

const statusesData = ref([]);
const dummyData = [
  ["", ""],
  ["available", 34],
    ["offline", 5],
    ["reserved", 3],
    ["charging", 9]
]

const options = {
  pieHole: 0.4,
  colors: Object.values(pieConf),
  legend: 'right',
};

const processSSE = (event) => {
    console.log("Start process dashboard SSE.")
    let data = event.meta.count
    updatePieChart(pieConf, chartHeaders, data)
  }

// component
const updatePieChart = (conf, headers, statuses) => {
    statusesData.value = [headers]
    for (let pkey in conf) {
      for (let rkey in statuses) {
        if (pkey === rkey) {
          statusesData.value.push([pkey, statuses[rkey]])
        }
      }
    }
  }

onMounted(() => {
  const { updateEventListener } =useSSEStore()
  updateEventListener(processSSE);

  let response = {
    "available": 0,
    "offline": 2,
    "reserved": 0,
    "charging": 0
  };
  updatePieChart(pieConf, chartHeaders, response)
})

</script>
