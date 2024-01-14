<template lang="pug">
.container.mb-2(v-show="$pwa?.needRefresh")
  .row
    .col
      .alert.alert-info.mb-0
        .hstack.gap-2.justify-content-between.flex-wrap
          div New version available
          div
            b-button(variant="primary", @click="$pwa?.updateServiceWorker()") #[icon(name="bi:repeat")] Click to update
</template>

<script setup lang="ts">
const { $pwa } = useNuxtApp();

watch(
  () => $pwa?.offlineReady,
  () => {
    console.log("ready to work offline");
  }
);
</script>
