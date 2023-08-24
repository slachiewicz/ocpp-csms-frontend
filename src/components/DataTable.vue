<template>
  <v-card elevation="0" v-if="items && items.length">
    <v-card-title>
      <v-card-item class="text-center">{{ title }}</v-card-item>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      :hover="rowConfig.hover"
      :density="rowConfig.density"
      :class="rowConfig.fontStyle"
    >
      <template v-for="(_, name) in $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps || {}"></slot>
      </template>
    </v-data-table>
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
  fontStyle: "text-caption",
  hover: true,
  density: "comfortable",
};

const props = defineProps({
  headers: Array,
  itemsLoader: Function,
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
