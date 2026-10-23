<template lang="pug">
u-header(title="GeoJSON to WKT", :toggle="false")
  template(#title)
    u-icon.size-7.text-primary(name="i-lucide-map-pin")
    h1.text-xl.font-extrabold.tracking-tight GeoJSON to WKT
  template(#right)
    u-badge(variant="subtle", color="neutral", label="Online converter")
    u-color-mode-button
</template>
