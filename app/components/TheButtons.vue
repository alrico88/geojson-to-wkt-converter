<template lang="pug">
.flex.flex-col.items-center.gap-3.w-48
  u-separator(label="Convert")
  u-button(
    icon="i-lucide-arrow-right",
    trailing,
    color="primary",
    block,
    label="GeoJSON to WKT",
    :disabled="!geojson.trim()",
    @click="store.convertGeoJSONToWkt"
  )
  u-button(
    icon="i-lucide-arrow-left",
    color="primary",
    variant="outline",
    block,
    label="WKT to GeoJSON",
    :disabled="!wkt.trim()",
    @click="store.convertWktToGeoJSON"
  )
  u-separator.mt-1(label="Output")
  output-options
</template>

<script setup lang="ts">
import useMainStore from "~/store/useMainStore";

const store = useMainStore();
const { geojson, wkt } = storeToRefs(store);
</script>
