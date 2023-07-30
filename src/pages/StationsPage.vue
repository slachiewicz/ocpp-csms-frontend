<template>
  <div>Stations</div>
</template>

<script setup>
import { onMounted } from "vue";
import { updateEventListener } from "@/store/sse";

const processSSE = (event) => {
  console.log("Start process stations SSE.");
};

onMounted(() => {
  updateEventListener(processSSE);
});
</script>
