<template lang="pug">
.w-full.transition-all(:class="expanded ? 'h-200' : 'h-100'")
  mgl-map(
    :map-key="MAP_KEY",
    :map-style="MAP_STYLES[mapStyle].url",
    :center="INITIAL_CENTER",
    :zoom="1",
    @map:load="fitToDrawn"
  )
    mgl-navigation-control
    mgl-scale-control
    mgl-geo-json-source(v-if="drawnMap", source-id="drawn", :data="drawnMap")
      mgl-fill-layer(
        layer-id="drawn-fill",
        :filter="polygonFilter",
        :paint="fillPaint"
      )
      mgl-line-layer(
        layer-id="drawn-line",
        :filter="lineFilter",
        :paint="linePaint",
        :layout="lineLayout"
      )
      mgl-circle-layer(
        layer-id="drawn-point",
        :filter="pointFilter",
        :paint="circlePaint"
      )
</template>

<script setup lang="ts">
import {
  MglCircleLayer,
  MglFillLayer,
  MglGeoJsonSource,
  MglLineLayer,
  MglMap,
  MglNavigationControl,
  MglScaleControl,
  useMap,
} from "@indoorequal/vue-maplibre-gl";
import { getGeoJSONBBox } from "bbox-helper-functions";
import type {
  CircleLayerSpecification,
  FillLayerSpecification,
  LineLayerSpecification,
} from "maplibre-gl";
import useMainStore from "~/store/useMainStore";

defineProps<{
  mapStyle: MapStyle;
  expanded: boolean;
}>();

const MAP_KEY = "main";
// Not inline in the template: a new array each render makes MglMap re-center
const INITIAL_CENTER: [number, number] = [0, 20];
const DRAW_COLOR = "#2563eb";

function geometryTypeFilter(
  ...types: string[]
): ["in", ["geometry-type"], ["literal", string[]]] {
  const names = types.flatMap((type) => [type, `Multi${type}`]);

  return ["in", ["geometry-type"], ["literal", names]];
}

const polygonFilter = geometryTypeFilter("Polygon");
const lineFilter = geometryTypeFilter("LineString", "Polygon");
const pointFilter = geometryTypeFilter("Point");

const fillPaint: FillLayerSpecification["paint"] = {
  "fill-color": DRAW_COLOR,
  "fill-opacity": 0.25,
};
const linePaint: LineLayerSpecification["paint"] = {
  "line-color": DRAW_COLOR,
  "line-width": 2,
};
const lineLayout: LineLayerSpecification["layout"] = {
  "line-join": "round",
  "line-cap": "round",
};
const circlePaint: CircleLayerSpecification["paint"] = {
  "circle-color": DRAW_COLOR,
  "circle-radius": 6,
  "circle-stroke-color": "#ffffff",
  "circle-stroke-width": 2,
};

const store = useMainStore();
const { drawnMap } = storeToRefs(store);

const mapInstance = useMap(MAP_KEY);

function fitToDrawn() {
  if (!drawnMap.value || !mapInstance.map) {
    return;
  }

  const [minX, minY, maxX, maxY] = getGeoJSONBBox(drawnMap.value);

  mapInstance.map.fitBounds(
    [
      [minX, minY],
      [maxX, maxY],
    ],
    { padding: 40, maxZoom: 16 }
  );
}

watch(drawnMap, fitToDrawn);
</script>
