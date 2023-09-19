<template lang="pug">
.btn-group.btn-group-sm(role="group")
  button.btn.btn-secondary(
    v-for="style of availableStyles",
    :key="style.value",
    :class="{ active: selectedStyle === style.value }",
    @click="changeStyle(style.value)"
  ) #[icon(:name="style.icon")] {{ style.name }}
</template>

<script setup lang="ts">
const props = defineProps<{
  style: string;
}>();

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

const selectedStyle = useVModel(props, "style");

function changeStyle(style: string) {
  selectedStyle.value = style;
}
</script>
