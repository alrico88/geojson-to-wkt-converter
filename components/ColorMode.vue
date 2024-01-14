<template lang="pug">
b-input-group
  template(#prepend)
    b-input-group-text #[icon(name="tabler:brightness-half")] Theme
  b-form-select(v-model="$colorMode.preference")
    b-form-select-option(value="system") System
    b-form-select-option(value="light") Light
    b-form-select-option(value="dark") Dark
</template>
