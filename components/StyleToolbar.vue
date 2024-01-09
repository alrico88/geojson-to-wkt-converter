<template lang="pug">
b-button-group(size="sm")
  b-button(
    v-for="style of availableStyles",
    variant="secondary",
    :key="style.value",
    :active="selectedStyle === style.value",
    @click="changeStyle(style.value)"
  ) #[icon(:name="style.icon")] {{ style.name }}
</template>

<script setup lang="ts">
const availableStyles = [
  {
    name: "Coloured",
    value: "color",
    icon: "bi:palette",
  },
  {
    name: "Light",
    value: "light",
    icon: "bi:sun",
  },
  {
    name: "Dark",
    value: "dark",
    icon: "bi:moon",
  },
];

const selectedStyle = defineModel<string>("style");

function changeStyle(style: string) {
  selectedStyle.value = style;
}
</script>
