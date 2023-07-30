<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6">
        <v-sheet rounded="lg" min-height="20vh">
          <statuses-pie-chart></statuses-pie-chart>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted } from "vue";
import { updateEventListener } from "@/store/sse";
import { useStationsStore } from "@/store/stations";
import StatusesPieChart from "@/pages/dashboard/components/StatusesPieChart";

const { fetchCounters, updateCounters } = useStationsStore();

const processSSE = (event) => {
  console.log("Start process dashboard SSE.");
  updateCounters(event.meta.count);
};

onMounted(() => {
  fetchCounters();
  updateEventListener(processSSE);
});
</script>
