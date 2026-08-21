<template lang="pug">
.flex.flex-wrap.items-center.justify-center.gap-x-4.gap-y-2.text-sm.text-muted
  span
    | Made by
    a.font-medium.text-default.transition-colors(
      class="hover:text-primary",
      :href="siteLink",
      target="_blank",
      rel="noopener"
    ) Alberto Rico
  span
    | Source code at
    ULink(:href="repoLink", target="_blank")
      UIcon.size-4.align-text-bottom(name="i-lucide-github")
      |
      | GitHub
  span.ml-auto(class="md:ml-0")
    | Found it useful?
    ULink(:href="supportLink")
      UIcon.size-4.align-text-bottom(name="i-lucide-coffee")
      |
      | Support me!
  color-mode
</template>

<script setup lang="ts">
const siteLink = "https://alrico.es";
const repoLink = "https://github.com/alrico88/geojson-to-wkt-converter";
const supportLink = "https://www.buymeacoffee.com/albertorico";
</script>
