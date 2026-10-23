<template lang="pug">
u-tabs(
  v-model="selectedStyle",
  :items="items",
  :content="false",
  size="xs",
  color="primary"
)
</template>

<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";

const selectedStyle = defineModel<MapStyle>({ required: true });

const items = Object.entries(MAP_STYLES).map(
  ([value, { label, icon }]): TabsItem => ({ label, icon, value })
);
</script>
