<template lang="pug">
  #app.d-flex.flex-column.h-100
    main.flex-shrink-0
      navbar.mb-3
      .container.pb-2(v-show="error.isError")
        .row
          .col
            b-alert.border-danger.mb-1(variant="danger", :show="error.isError") {{ error.message }}
      .container.mb-2
        .row.align-items-center
          input-text(title="GeoJSON", property="geojson")
          buttons
          input-text(title="Well-Known-Text", property="wkt")
      div.mb-4(:class="mapParentClass")
        .row
          .col
            .card.border
              .card-header
                .d-flex.align-items-center
                  div
                    style-toolbar(v-model="mapStyle")
                  .flex-grow-1.px-3
                    p.mb-0 Drawing: #[b {{getDrawnSource}}]
                  div
                    b-button(@click="toggleMapSize", size="sm") Toggle map size
              .card-body.p-0
                map-view(:map-style="mapStyle", :height="mapHeight", ref="map")
    footer.mt-auto.py-3.bg-white.text-center
      .container
        .row
          .col
            .text-muted Made by #[a(href="https://alrico.es" target="_blank" rel="noopener") Alberto Rico]. Source code available at
              a.ml-2(href="https://github.com/alrico88/geojson-to-wkt-converter", target="_blank")
                i.fab.fa-github
                |  Github
</template>

<script>
import InputText from './components/InputText.vue';
import Buttons from './components/Buttons.vue';
import Navbar from './components/Navbar.vue';
import {mapState, mapGetters} from 'vuex';
import MapView from './components/Map.vue';
import StyleToolbar from '@/components/StyleToolbar.vue';
import {BButton, BAlert} from 'bootstrap-vue';

export default {
  name: 'App',
  metaInfo: {
    title: 'GeoJSON to WKT converter',
    meta: [
      {
        name: 'description',
        content:
          'Progressive Web App to convert between GeoJSON and Well Known Text (WKT) formats',
      },
      {
        name: 'robots',
        content: 'index,follow',
      },
      {
        name: 'keywords',
        content:
          'geojson,wkt,well known text,converter,convert to geojson, convert to wkt, draw geojson, draw wkt',
      },
    ],
  },
  components: {
    StyleToolbar,
    InputText,
    Buttons,
    Navbar,
    MapView,
    BButton,
    BAlert,
  },
  data() {
    return {
      fullMap: false,
      mapStyle: 'color',
    };
  },
  computed: {
    ...mapState(['error']),
    ...mapGetters(['getDrawnSource']),
    mapParentClass() {
      return this.fullMap ? 'container-fluid' : 'container';
    },
    mapHeight() {
      return this.fullMap ? 800 : 400;
    },
  },
  methods: {
    toggleMapSize() {
      this.fullMap = !this.fullMap;
      this.$nextTick(() => {
        this.$refs.map.reflowMap();
      });
    },
  },
};
</script>
