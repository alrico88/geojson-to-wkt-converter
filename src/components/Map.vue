<template lang="pug">
  l-map(
    :style="cssStyle",
    :options="mapOptions",
    :center="centerCoords",
    :zoom="5",
    ref="map"
  )
    l-tile-layer(url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png')
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
  data() {
    return {
      cssStyle: {
        height: '400px',
        width: '100%',
      },
      mapOptions: {
        zoomControl: false,
      },
      centerCoords: [40.416241, -3.704281],
    };
  },
  computed: {
    ...mapState(['drawnMap']),
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
  },
  watch: {
    bounds(bounds) {
      if (bounds) {
        this.$refs.map.mapObject.fitBounds(bounds);
      }
    },
  },
};
</script>
