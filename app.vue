<template lang="pug">
.d-flex.vh-100.flex-column
  main.flex-shrink-0
    nav.navbar.navbar-light.justify-content-center.py-4
      h1.mb-0.fw-bold GeoJSON to WKT
    update-notification
    .container.mb-2(v-show="error.isError")
      .row
        .col
          .alert.alert-danger.border-danger.mb-1(v-show="error.isError") {{ error.message }}
    .container.mb-2
      .row.align-items-center.g-3
        input-text(
          title="GeoJSON"
          property="geojson"
          v-model:modelValue="store.geojson"
          @load-example="loadGeoJSONExample"
        )
        the-buttons
        input-text(
          title="Well-Known-Text"
          property="wkt"
          v-model:modelValue="store.wkt"
          @load-example="loadWKTExample"
        )
    div.mb-4(:class="mapParentClass")
      .row
        .col
          .card.border-1
            .card-header
              .d-flex.justify-content-between.align-items-center
                .hstack.gap-2
                  style-toolbar(v-model:style="mapStyle")
                  div Drawing: #[b {{getDrawnSource}}]
                div
                  button.btn.btn-secondary.btn-sm(@click="toggleMapSize") #[icon(name="bi:arrows-expand")] Toggle map size
            .card-body.p-0
              the-map(:map-style="mapStyle", :height="mapHeight", ref="mapRef")
  footer.mt-auto.py-3.text-center
    the-author
</template>

<script setup lang="ts">
import useMainStore from "./store/useMainStore";
import { exampleGeoJSON, exampleWKT } from "./helpers/examples";
import { Formatter } from "fracturedjsonjs";

const store = useMainStore();
const { getDrawnSource, error } = storeToRefs(store);

const fullMap = ref(false);
const mapStyle = ref<"color" | "light" | "dark">("color");

const mapParentClass = computed(() =>
  fullMap.value ? "container-fluid" : "container",
);
const mapHeight = computed(() => (fullMap.value ? 800 : 400));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapRef = ref<any>(null);

function toggleMapSize() {
  fullMap.value = !fullMap.value;

  nextTick(() => {
    if (!mapRef.value) {
      return;
    }

    mapRef.value.reflowMap();
  });
}

function loadGeoJSONExample() {
  const fmt = new Formatter();

  store.$patch({
    wkt: "",
    geojson: fmt.Serialize(exampleGeoJSON),
  });
}

function loadWKTExample() {
  store.$patch({
    wkt: exampleWKT,
    geojson: "",
  });
}
</script>

<style lang="scss" scoped>
footer {
  background-color: var(--iris-1);
  border-top: 2px solid var(--iris-6);
  color: var(--iris-11);
}
</style>
