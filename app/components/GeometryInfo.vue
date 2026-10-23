<template lang="pug">
u-popover
  u-button(
    icon="i-lucide-info",
    label="Info",
    size="sm",
    color="neutral",
    variant="ghost"
  )
  template(#content)
    lazy-geometry-info-content(:geojson="geojson")
</template>

<script setup lang="ts">
import type { GeoJSON } from "geojson";

defineProps<{
  geojson: GeoJSON;
}>();
</script>
