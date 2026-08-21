<template lang="pug">
UTabs(
  :items="availableStyles",
  :model-value="selectedStyle",
  size="xs",
  color="primary",
  @update:model-value="changeStyle"
)
</template>

<script setup lang="ts">
const availableStyles = [
  {
    label: "Coloured",
    value: "color",
    icon: "i-lucide-palette",
  },
  {
    label: "Light",
    value: "light",
    icon: "i-lucide-sun",
  },
  {
    label: "Dark",
    value: "dark",
    icon: "i-lucide-moon",
  },
];

const selectedStyle = defineModel<string>("style");

function changeStyle(style: string | number) {
  selectedStyle.value = String(style);
}
</script>
