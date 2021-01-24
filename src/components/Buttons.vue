<template lang="pug">
  .col-md-2.px-0.text-center
    .row
      .col.mb-2
        p.mb-1 Click to convert
    .row
      .col.mb-2
        b-button(@click="convertToWkt", :disabled="geojson === ''")
          | GeoJSON
          b-icon-arrow-right.mx-1
          | WKT
      .w-100
      .col
        b-button(@click="convertToGeoJSON", :disabled="wkt === ''")
          | GeoJSON
          b-icon-arrow-left.mx-1
          | WKT
</template>

<script>
import {mapState} from 'vuex';
import {BButton, BIconArrowLeft, BIconArrowRight} from 'bootstrap-vue';

export default {
  components: {
    BButton,
    BIconArrowLeft,
    BIconArrowRight,
  },
  computed: {
    ...mapState(['geojson', 'wkt']),
  },
  methods: {
    convertToWkt() {
      this.$store.dispatch('convertGeoJSONToWkt');
    },
    convertToGeoJSON() {
      this.$store.dispatch('convertWktToGeoJSON');
    },
  },
};
</script>
