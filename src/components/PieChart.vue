<template>
  <v-card elevation="0">
    <g-chart
      type="PieChart"
      :resizeDebounce="500"
      :options="options"
      :data="collectionData"
    ></g-chart>
  </v-card>
</template>

<script>
import { GChart } from "vue-google-charts";

export default {
  name: "PieChart",
  components: { GChart },
  props: {
    collectionData: {
      type: Array
    },
    options: {
      type: Object
    }
  }
};
</script>
