<template lang="pug">
.container-xl.mx-auto.px-4.mb-2(v-if="$pwa?.needRefresh")
  UAlert(
    color="info",
    variant="soft",
    icon="i-lucide-refresh-cw",
    title="New version available",
    :close="false"
  )
    template(#actions)
      UButton(
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
