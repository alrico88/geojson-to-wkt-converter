<template lang="pug">
.col-md-2.text-center
  .row.gap-2.mb-2
    .col
      .text-uppercase Click to convert
  .row.gap-2
    .col
      .vstack.gap-2
        b-button(
          variant="secondary",
          @click="store.convertGeoJSONToWkt",
          :disabled="geojson === ''"
        ) GeoJSON to WKT
        b-button(
          variant="secondary",
          @click="store.convertWktToGeoJSON",
          :disabled="wkt === ''"
        ) WKT to GeoJSON
</template>

<script setup lang="ts">
import useMainStore from "~/store/useMainStore";

const store = useMainStore();
const { geojson, wkt } = storeToRefs(store);
</script>
