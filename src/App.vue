<template lang="pug">
  #app.d-flex.flex-column.h-100
    notifications(group="clipboard")
    main.flex-shrink-0
      navbar.mb-3
      .container.pb-2(v-show="error.isError")
        .row
          .col
            .alert.alert-danger.border-danger.mb-1 {{ error.message }}
      .row
        .col
          .row
            .col
              .container
                .row.align-items-center
                  input-text(title="GeoJSON", property="geojson")
                  buttons
                  input-text(title="Well-Known-Text", property="wkt")
                .row
                  .col
                    map-view.border
    footer.mt-auto.py-3.bg-white.text-center
      .container
        .row
          .col
            .text-muted Made by <a href="https://alrico.es" target="_blank">Alberto Rico</a>. Source code available at
              a.ml-2(href="https://github.com/alrico88/geojson-to-wkt-converter", target="_blank")
                i.fab.fa-github
                |  Github
</template>

<script>
import InputText from './components/InputText.vue';
import Buttons from './components/Buttons.vue';
import Navbar from './components/Navbar.vue';
import {mapState} from 'vuex';
import MapView from './components/Map.vue';

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
    InputText,
    Buttons,
    Navbar,
    MapView,
  },
  computed: {
    ...mapState(['error']),
  },
};
</script>

<style lang="scss">
@import url("https://fonts.xz.style/serve/fira-sans.css");

#app {
  font-family: "Fira Sans", Helvetica, Arial, sans-serif;
  color: #2c3e50;
  font-size: 14px;
}

body {
  background-color: #e5e9f2 !important;
}

label {
  font-size: 1.2rem;
}
</style>
