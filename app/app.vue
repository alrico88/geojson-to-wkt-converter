<template lang="pug">
u-app
  .min-h-screen.flex.flex-col.bg-default.text-default
    the-header
    main.flex-1
      .mx-auto.max-w-7xl.px-4.py-6.space-y-4
        update-notification
        u-alert(
          v-if="error.isError",
          color="error",
          variant="soft",
          icon="i-lucide-circle-alert",
          :title="error.message",
          close,
          @update:open="store.discardError"
        )
        .grid.items-stretch.gap-4(class="lg:grid-cols-[1fr_auto_1fr]")
          input-text(
            v-model="store.geojson",
            title="GeoJSON",
            format="geojson",
            @load-example="store.loadExample('geojson')"
          )
          .self-center.justify-self-center
            the-buttons
          input-text(
            v-model="store.wkt",
            title="Well-Known-Text",
            format="wkt",
            @load-example="store.loadExample('wkt')"
          )
        map-panel
    footer.mt-auto.border-t.border-default.bg-elevated
      .mx-auto.max-w-7xl.px-4.py-4
        the-author
</template>

<script setup lang="ts">
import useMainStore from "~/store/useMainStore";

const store = useMainStore();
const { error } = storeToRefs(store);
</script>
