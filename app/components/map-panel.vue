<template lang="pug">
u-card(:ui="{ body: 'p-0 sm:p-0 overflow-hidden rounded-b-lg' }")
  template(#header)
    .flex.flex-wrap.items-center.justify-between.gap-3.w-full
      .flex.items-center.gap-3
        style-toolbar(v-model="mapStyle")
        span.text-muted.text-sm.inline-flex.items-center.gap-1
          | Drawing:
          b.text-default {{ drawnSourceLabel }}
      u-button(
        size="sm",
        color="neutral",
        variant="outline",
        :icon="expanded ? 'i-lucide-minimize-2' : 'i-lucide-maximize-2'",
        :label="expanded ? 'Shrink map' : 'Expand map'",
        @click="expanded = !expanded"
      )
  client-only
    the-map(:map-style="mapStyle", :expanded="expanded")
    template(#fallback)
      .h-100.flex.items-center.justify-center.text-muted
        u-icon.size-6.animate-spin(name="i-lucide-loader-circle")
</template>

<script setup lang="ts">
import useMainStore from "~/store/useMainStore";

const { drawnSourceLabel } = storeToRefs(useMainStore());

const expanded = ref(false);
const mapStyle = ref<MapStyle>("color");
</script>
