<template lang="pug">
.d-flex.vh-100.flex-column
  main.flex-shrink-0
    nav.navbar.navbar-light.bg-light.justify-content-center.mb-3
      a.navbar-brand GeoJSON to WKT
    .container.pb-2(v-show="error.isError")
      .row
        .col
          .alert.alert-danger.border-danger.mb-1(v-show="error.isError") {{ error.message }}
    .container.mb-2
      .row.align-items-center.gap-1
        input-text(title="GeoJSON", property="geojson")
        the-buttons
        input-text(title="Well-Known-Text", property="wkt")
    div.mb-4(:class="mapParentClass")
      .row
        .col
          .card.border
            .card-header
               .d-flex.justify-content-between.align-items-center
                .hstack.gap-2
                  style-toolbar(v-model:style="mapStyle")
                  div Drawing: #[b {{getDrawnSource}}]
                div
                  button.btn.btn-secondary.btn-sm(@click="toggleMapSize") #[icon-expand] Toggle map size
            .card-body.p-0
              map-view(:map-style="mapStyle", :height="mapHeight", ref="mapRef")
  footer.mt-auto.py-3.bg-white.text-center
    the-author
</template>

<script setup>
import { computed, nextTick, ref } from 'vue';

import { storeToRefs } from 'pinia';
import InputText from './components/InputText.vue';
import TheButtons from './components/TheButtons.vue';
import MapView from './components/TheMap.vue';
import StyleToolbar from './components/StyleToolbar.vue';
import TheAuthor from './components/TheAuthor.vue';
import useMainStore from './store/useMainStore';
import IconExpand from '~icons/bi/arrows-expand';

const store = useMainStore();
const { getDrawnSource, error } = storeToRefs(store);

const fullMap = ref(false);
const mapStyle = ref('color');

const mapParentClass = computed(() => (fullMap.value ? 'container-fluid' : 'container'));
const mapHeight = computed(() => (fullMap.value ? 800 : 400));

const mapRef = ref(null);

function toggleMapSize() {
  fullMap.value = !fullMap.value;
  nextTick(() => {
    mapRef.value.reflowMap();
  });
}
</script>
