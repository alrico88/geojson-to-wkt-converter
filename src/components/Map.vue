<template lang="pug">
  l-map(
    :style="cssStyle",
    :options="mapOptions",
    :center="centerCoords",
    :zoom="5",
    ref="map"
  )
    l-tile-layer(:url='tileURL', :attribution="tileAttribution")
    l-geo-json(v-if="drawnMap", :geojson="drawnMap")
</template>

<script>
import {LMap, LTileLayer, LGeoJson} from 'vue2-leaflet';
import {mapState} from 'vuex';
import bbox from '@turf/bbox';

export default {
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
  },
  props: {
    mapStyle: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      mapOptions: {
        zoomControl: true,
        attribution: true,
      },
      tileAttribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      centerCoords: [40.416241, -3.704281],
    };
  },
  computed: {
    ...mapState(['drawnMap']),
    cssStyle() {
      return {
        height: `${this.height}px`,
        width: '100%',
      };
    },
    bounds() {
      if (this.drawnMap) {
        const [minX, minY, maxX, maxY] = bbox(this.drawnMap);
        const bounds = [
          [minY, minX],
          [maxY, maxX],
        ];
        return bounds;
      } else {
        return null;
      }
    },
    tileURL() {
      const styles = {
        color: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        light: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      };

      return styles[this.mapStyle];
    },
  },
  watch: {
    bounds(bounds) {
      if (bounds) {
        this.$refs.map.mapObject.fitBounds(bounds);
      }
    },
  },
  methods: {
    reflowMap() {
      this.$refs.map.mapObject.invalidateSize();
    },
  },
};
</script>
