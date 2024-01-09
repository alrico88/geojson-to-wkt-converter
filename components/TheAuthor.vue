<template lang="pug">
.container
  .row
    .col
      .hstack.gap-2.justify-content-center.flex-wrap
        div Made by #[nuxt-link(:to="siteLink", target="_blank") Alberto Rico]. 
        div Source code available at #[nuxt-link(:href="repoLink", target="_blank") #[icon(name="bi:github")] Github]
        .ms-md-auto Found it useful? #[nuxt-link(:to="supportLink") #[icon(name="lucide:coffee")] Support me!]
</template>

<script setup lang="ts">
const siteLink = "https://alrico.es";
const repoLink = "https://github.com/alrico88/geojson-to-wkt-converter";
const supportLink = "https://www.buymeacoffee.com/albertorico";
</script>
