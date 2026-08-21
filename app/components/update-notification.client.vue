<template lang="pug">
u-alert(
  v-if="$pwa?.needRefresh",
  color="info",
  variant="soft",
  icon="i-lucide-refresh-cw",
  title="New version available"
)
  template(#actions)
    u-button(
      size="xs",
      color="info",
      variant="solid",
      label="Click to update",
      @click="$pwa?.updateServiceWorker()"
    )
</template>

<script setup lang="ts">
const { $pwa } = useNuxtApp();
</script>
