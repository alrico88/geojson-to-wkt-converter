<template lang="pug">
  nav.navbar.navbar-light.bg-light.justify-content-center
    a.navbar-brand GeoJSON to WKT
</template>

<script>
import {mapState} from 'vuex';
export default {
  computed: {
    ...mapState(['error']),
  },
};
</script>
