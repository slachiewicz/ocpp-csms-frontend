<template>
  <v-card elevation="0" v-if="items.length">
    <v-card-title>
      <v-card-item class="text-center">{{ title }}</v-card-item>
    </v-card-title>
    <slot :items="items" :rowConfig="rowConfig"></slot>
    <v-divider></v-divider>
    <div class="text-center">
      <v-pagination
        v-model="currentPage"
        :length="lastPage"
        total-visible="6"
        density="compact"
      ></v-pagination>
    </div>
  </v-card>
  <empty-data v-else></empty-data>
</template>

<script setup>
import { defineProps } from "vue";
import EmptyData from "@/components/EmptyData";
import { usePagination } from "@/use/pagination";

const rowConfig = {
  itemClass: "text-caption",
  hover: true,
  density: "comfortable",
};

const props = defineProps({
  itemsLoader: Function,
  headers: Array,
  title: String,
});

const { items, currentPage, lastPage } = usePagination({
  itemsLoader: props.itemsLoader,
});
</script>

<style>
.v-data-table-footer {
  display: none;
}
</style>
