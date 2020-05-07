<template lang="pug">
  #app.d-flex.flex-column.h-100
    notifications(group="clipboard")
    main.container-fluid.flex-shrink-0
      .row
        .col
          navbar
          .row.text-center
            .col
              .container
                .row.align-items-center
                  input-text(title="GeoJSON", property="geojson")
                  buttons
                  input-text(title="Well-Known-Text", property="wkt")
    footer.mt-auto.py-3.bg-white.text-center
      .container
        .row
          .col
            .text-muted Made by Alberto Rico. Source code available at
              a.ml-2(href="https://github.com/alrico88/geojson-to-wkt-converter", target="_blank")
                i.fa.fa-github-square
                |  Github
</template>

<script>
import InputText from './components/InputText.vue';
import Buttons from './components/Buttons.vue';
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    InputText,
    Buttons,
    Navbar,
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
