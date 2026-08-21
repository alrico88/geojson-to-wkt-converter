<template lang="pug">
.flex.flex-col.items-center.gap-3
  span.text-xs.font-semibold.uppercase.tracking-widest.text-dimmed Convert
  u-button(
    icon="i-lucide-arrow-right",
    trailing,
    color="primary",
    highlight,
    block,
    label="GeoJSON to WKT",
    :disabled="geojson === ''",
    @click="store.convertGeoJSONToWkt"
  )
  u-button(
    icon="i-lucide-arrow-left",
    trailing,
    color="primary",
    variant="outline",
    block,
    label="WKT to GeoJSON",
    :disabled="wkt === ''",
    @click="store.convertWktToGeoJSON"
  )
</template>

<script setup lang="ts">
import useMainStore from "~/store/useMainStore";

const store = useMainStore();
const { geojson, wkt } = storeToRefs(store);
</script>
