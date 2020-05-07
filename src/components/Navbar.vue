<template lang="pug">
  .row.text-center.bg-white.mb-4
    .col
      .container.py-2
        .row
          .col
            h1.mb-2.display-6 GeoJSON <-> Well-Known-Text converter
        .row
          .col
            .alert.alert-primary.border-primary.mb-1 Enter either a GeoJSON or WKT and click convert
            .alert.alert-danger.border-danger.mb-1(v-show="error.isError") {{ error.message }}
</template>

<script>
import {mapState} from 'vuex';
export default {
  computed: {
    ...mapState(['error']),
  },
};
</script>
