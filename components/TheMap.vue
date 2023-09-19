<template lang="pug">
div(:style="cssStyle")
  l-map.w-100(
    :zoom-animation="true",
    :options="mapOptions",
    :center="[40.416241, -3.704281]",
    :zoom="5",
    ref="mapRef"
  )
    l-tile-layer(:url='tileURL', :attribution="tileAttribution")
    l-geo-json(v-if="drawnMap", :geojson="drawnMap")
</template>

<script setup lang="ts">
import { getGeoJSONBBox } from "bbox-helper-functions";
import type { StyleValue } from "vue";
import useMainStore from "~/store/useMainStore";

const props = defineProps<{
  mapStyle: "color" | "light" | "dark";
  height: number;
}>();

const store = useMainStore();
const { drawnMap } = storeToRefs(store);

const mapOptions = {
  zoomControl: true,
  attribution: true,
};

const tileAttribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

const cssStyle = computed<StyleValue>(() => ({
  height: `${props.height}px`,
  width: "100%",
}));

const bounds = computed(() => {
  if (drawnMap.value) {
    const [minX, minY, maxX, maxY] = getGeoJSONBBox(drawnMap.value);

    return [
      [minY, minX],
      [maxY, maxX],
    ];
  }

  return null;
});

const mapRef = ref<any>(null);

watch(bounds, (val) => {
  if (val && mapRef.value) {
    mapRef.value.leafletObject.fitBounds(val);
  }
});

const tileURL = computed(() => {
  const styles = {
    color:
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  };

  return styles[props.mapStyle];
});

function reflowMap() {
  if (!mapRef.value) {
    return;
  }

  mapRef.value.leafletObject.invalidateSize();
}

defineExpose({ reflowMap });
</script>
