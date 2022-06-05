<template lang='pug'>
.container
  .row
    .col
      .text-muted Made by #[a(:href="siteLink" target="_blank" rel="noopener") Alberto Rico]. Source code available at #[a(:href="repoLink", target="_blank") #[icon-github] Github]
</template>

<script setup>
import IconGithub from '~icons/bi/github';

const siteLink = 'https://alrico.es';
const repoLink = 'https://github.com/alrico88/geojson-to-wkt-converter';
</script>
