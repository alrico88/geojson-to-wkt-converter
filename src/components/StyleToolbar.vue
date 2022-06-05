<template lang="pug">
.btn-group.btn-group-sm(role="group")
  button.btn.btn-secondary(
    v-for="style of availableStyles",
    :key="style.value",
    :class="{ active: selectedStyle === style.value }",
    @click="changeStyle(style.value)"
  ) #[component(:is="style.icon")] {{ style.name }}
</template>

<script setup>
import { useVModel } from '@vueuse/core';
import IconSun from '~icons/bi/sun';
import IconMoon from '~icons/bi/moon';
import IconStyle from '~icons/bi/palette';

const props = defineProps({
  style: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:style']);

const availableStyles = [
  {
    name: 'Coloured',
    value: 'color',
    icon: IconStyle,
  },
  {
    name: 'Light',
    value: 'light',
    icon: IconSun,
  },
  {
    name: 'Dark',
    value: 'dark',
    icon: IconMoon,
  },
];

const selectedStyle = useVModel(props, 'style', emit);

function changeStyle(style) {
  selectedStyle.value = style;
}
</script>
