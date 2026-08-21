<template lang="pug">
USelect.w-32(
  v-model="$colorMode.preference",
  :items="options",
  icon="i-lucide-sun-moon",
  size="xs",
  color="neutral",
  variant="outline"
)
</template>

<script setup lang="ts">
const options = [
  { label: "System", value: "system" },
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
];
</script>
