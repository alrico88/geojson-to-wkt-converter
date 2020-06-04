<template lang="pug">
  .col-md-2.px-0.text-center
    .row
      .col.mb-2
        p.mb-1 Click to convert
    .row
      .col.mb-2
        button.btn.btn-primary(@click.prevent="convertToWkt", :disabled="geojson === ''")
          | GeoJSON
          i.fa.fa-arrow-right.mx-1
          | WKT
      .w-100
      .col
        button.btn.btn-primary(@click.prevent="convertToGeoJSON", :disabled="wkt === ''")
          | GeoJSON
          i.fa.fa-arrow-left.mx-1
          | WKT
</template>

<script>
import {mapState} from 'vuex';
export default {
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
