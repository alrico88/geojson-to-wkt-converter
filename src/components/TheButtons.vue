<template lang="pug">
.col-md-2.text-center
  .row.gap-2.mb-2
    .col
      .text-uppercase Click to convert
  .row.gap-2
    .col
      .vstack.gap-2
        button.btn.btn-secondary(
          @click="store.convertGeoJSONToWkt",
          :disabled="geojson === ''"
        ) GeoJSON #[icon-arrow-right] WKT
        button.btn.btn-secondary(
          @click="store.convertWktToGeoJSON",
          :disabled="wkt === ''"
        ) GeoJSON #[icon-arrow-left] WKT
</template>

<script setup>
import { storeToRefs } from 'pinia';
import useMainStore from '../store/useMainStore';
import IconArrowLeft from '~icons/bi/arrow-left';
import IconArrowRight from '~icons/bi/arrow-right';

const store = useMainStore();
const { geojson, wkt } = storeToRefs(store);
</script>
