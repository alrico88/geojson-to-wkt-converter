<template lang="pug">
.flex.flex-col.items-center.gap-3
  span.text-xs.font-semibold.uppercase.tracking-widest.text-dimmed Convert
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
</template>

<script setup lang="ts">
import useMainStore from "~/store/useMainStore";

const store = useMainStore();
const { geojson, wkt } = storeToRefs(store);
</script>
