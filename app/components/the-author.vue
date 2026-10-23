<template lang="pug">
.flex.flex-col.items-center.gap-3.text-sm.text-muted(
  class="sm:flex-row sm:justify-between"
)
  p
    | Made by
    |
    u-link.font-medium.text-default(:href="siteLink", target="_blank")
      | Alberto Rico
  .flex.items-center.gap-1
    u-button(
      :to="repoLink",
      target="_blank",
      icon="i-lucide-github",
      label="Source code",
      color="neutral",
      variant="ghost",
      size="sm"
    )
    u-button(
      :to="supportLink",
      target="_blank",
      icon="i-lucide-coffee",
      label="Support me",
      color="neutral",
      variant="ghost",
      size="sm"
    )
    u-separator.h-5(orientation="vertical")
    u-color-mode-button(size="sm")
</template>

<script setup lang="ts">
const siteLink = "https://alrico.es";
const repoLink = "https://github.com/alrico88/geojson-to-wkt-converter";
const supportLink = "https://www.buymeacoffee.com/albertorico";
</script>
