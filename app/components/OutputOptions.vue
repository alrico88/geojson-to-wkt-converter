<template lang="pug">
.flex.flex-col.gap-3.w-full
  u-form-field(label="Decimals", size="xs")
    u-select.w-full(v-model="precision", :items="precisionItems", size="xs")
  u-form-field(label="GeoJSON", size="xs")
    u-tabs(
      v-model="outputOptions.jsonStyle",
      :items="jsonStyleItems",
      :content="false",
      size="xs",
      color="neutral"
    )
</template>

<script setup lang="ts">
import type { SelectItem, TabsItem } from "@nuxt/ui";
import useMainStore from "~/store/useMainStore";

const ALL_DECIMALS = "all";

const { outputOptions } = storeToRefs(useMainStore());

const precisionItems: SelectItem[] = [
  { label: "All", value: ALL_DECIMALS },
  ...[2, 3, 4, 5, 6, 7, 8].map((value) => ({
    label: String(value),
    value: String(value),
  })),
];

const jsonStyleItems: TabsItem[] = [
  { label: "Pretty", value: "pretty" },
  { label: "Minified", value: "minified" },
];

// Select values must be strings, the store keeps a number or null
const precision = computed({
  get: () =>
    outputOptions.value.precision === null
      ? ALL_DECIMALS
      : String(outputOptions.value.precision),
  set: (value: string) => {
    outputOptions.value.precision =
      value === ALL_DECIMALS ? null : Number(value);
  },
});
</script>
