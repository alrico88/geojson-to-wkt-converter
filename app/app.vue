<template lang="pug">
u-app
  .min-h-screen.flex.flex-col.bg-default.text-default
    header.border-b.border-default.bg-elevated
      .mx-auto.max-w-7xl.px-4.py-5.flex.items-center.justify-between.gap-4
        .flex.items-center.gap-3
          u-icon.size-8.text-primary(name="i-lucide-map-pin")
          h1.text-2xl.font-extrabold.tracking-tight GeoJSON to WKT
        u-badge(variant="subtle", color="neutral") Online converter
    main.flex-1
      .mx-auto.max-w-7xl.px-4.py-6.space-y-4
        update-notification.client
        u-alert(
          v-if="error.isError",
          color="error",
          variant="soft",
          icon="i-lucide-circle-alert",
          :title="error.message",
          :close="true",
          @update:open="store.discardError"
        )
        .grid.items-stretch.gap-4(class="lg:grid-cols-[1fr_auto_1fr]")
          input-text(
            title="GeoJSON",
            property="geojson",
            v-model="store.geojson",
            @load-example="store.loadExample('geojson')"
          )
          .self-center.justify-self-center
            the-buttons
          input-text(
            title="Well-Known-Text",
            property="wkt",
            v-model="store.wkt",
            @load-example="store.loadExample('wkt')"
          )
        u-card(:ui="{ body: 'p-0 sm:p-0' }")
          template(#header)
            .flex.flex-wrap.items-center.justify-between.gap-3.w-full
              .flex.items-center.gap-3
                style-toolbar(v-model:style="mapStyle")
                span.text-muted.text-sm.inline-flex.items-center.gap-1
                  | Drawing:
                  b {{ drawnSourceLabel }}
              u-button(
                size="sm",
                color="neutral",
                variant="outline",
                :icon="fullMap ? 'i-lucide-minimize-2' : 'i-lucide-maximize-2'",
                :label="fullMap ? 'Shrink map' : 'Expand map'",
                @click="toggleMapSize"
              )
          the-map(:map-style="mapStyle", :height="mapHeight", ref="mapRef")
    footer.mt-auto.border-t.border-default.bg-elevated
      .mx-auto.max-w-7xl.px-4.py-4
        the-author
</template>

<script setup lang="ts">
import useMainStore from "~/store/useMainStore";

const store = useMainStore();
const { drawnSourceLabel, error } = storeToRefs(store);

const fullMap = ref(false);
const mapStyle = ref<"color" | "light" | "dark">("color");

const mapHeight = computed(() => (fullMap.value ? 800 : 400));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapRef = ref<any>(null);

function toggleMapSize() {
  fullMap.value = !fullMap.value;

  nextTick(() => {
    if (!mapRef.value) {
      return;
    }

    mapRef.value.reflowMap();
  });
}
</script>
