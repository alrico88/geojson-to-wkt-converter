<template lang="pug">
dl.grid.grid-cols-2.gap-x-4.gap-y-2.p-4.text-sm.w-72
  dt.text-muted Type
  dd.font-medium {{ stats.types.join(", ") || "—" }}
  dt.text-muted Vertices
  dd.font-medium {{ numberFormat.format(stats.vertices) }}
  dt.text-muted Area
  dd.font-medium {{ formatArea(stats.areaSquareMeters) }}
  dt.text-muted Length / perimeter
  dd.font-medium {{ formatLength(stats.lengthKilometers) }}
  dt.text-muted.col-span-2 Bounding box
  dd.col-span-2.flex.items-start.gap-2
    code.flex-1.break-all.text-xs.font-mono {{ bboxText }}
    u-button(
      size="xs",
      color="neutral",
      variant="ghost",
      :icon="copied ? 'i-lucide-check' : 'i-lucide-clipboard'",
      :aria-label="copied ? 'Copied' : 'Copy bounding box'",
      @click="copy(bboxText)"
    )
</template>

<script setup lang="ts">
import type { GeoJSON } from "geojson";

const props = defineProps<{
  geojson: GeoJSON;
}>();

const stats = useGeometryStats(() => props.geojson);
const bboxText = computed(() => stats.value.bbox.join(", "));

const { copy, copied } = useClipboard();

const numberFormat = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 2,
});

function formatArea(squareMeters: number): string {
  return squareMeters >= 1e6
    ? `${numberFormat.format(squareMeters / 1e6)} km²`
    : `${numberFormat.format(squareMeters)} m²`;
}

function formatLength(kilometers: number): string {
  return kilometers >= 1
    ? `${numberFormat.format(kilometers)} km`
    : `${numberFormat.format(kilometers * 1000)} m`;
}
</script>
