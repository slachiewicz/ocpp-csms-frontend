<template>
  <div>Stations</div>
</template>

<script setup>
import { onMounted } from "vue";
import { useSSEStore } from "@/store/sse";

const processSSE = (event) => {
    console.log("Start process stations SSE.")
  }

onMounted(() => {
  const { updateEventListener } = useSSEStore()
  updateEventListener(processSSE)
})
</script>
