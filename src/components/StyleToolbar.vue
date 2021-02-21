<template lang="pug">
b-button-group(size="sm")
  b-button(
    v-for="style of availableStyles",
    :key="style.value",
    :class="{ active: selectedStyle === style.value }",
    @click="changeStyle(style.value)"
  ) {{ style.name }}
</template>

<script>
import {BButton, BButtonGroup} from 'bootstrap-vue';

export default {
  name: 'StyleToolbar',
  components: {
    BButton,
    BButtonGroup,
  },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      availableStyles: [
        {
          name: 'Coloured',
          value: 'color',
        },
        {
          name: 'Light',
          value: 'light',
        },
        {
          name: 'Dark',
          value: 'dark',
        },
      ],
    };
  },
  computed: {
    selectedStyle: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  methods: {
    changeStyle(style) {
      this.selectedStyle = style;
    },
  },
};
</script>
