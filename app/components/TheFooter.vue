<template lang="pug">
u-footer.border-t.border-default.bg-elevated(
  :ui="{ container: 'py-4 lg:py-4' }"
)
  template(#left)
    p.text-sm.text-muted
      | Made by
      |
      u-link.font-medium.text-default(:href="siteLink", target="_blank")
        | Alberto Rico
  template(#right)
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
</template>

<script setup lang="ts">
const siteLink = "https://alrico.es";
const repoLink = "https://github.com/alrico88/geojson-to-wkt-converter";
const supportLink = "https://www.buymeacoffee.com/albertorico";
</script>
