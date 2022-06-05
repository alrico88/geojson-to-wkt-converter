<template lang="pug">
.col-md
  .row
    .col
      .form-group
        .d-flex.justify-content-between.gap-2.mb-2.align-items-center
          .font-weight-bold {{ title }}
          button.btn.btn-link.p-0(@click="loadExample") Load example
        textarea.form-control.bg-white(rows="20", v-model="value", :class="inputClass")
  .row
    .col
      .hstack.gap-2
        button.btn.btn-light.w-100(
          @click="copy(value)"
          :disabled="value === ''"
        )
          template(v-if="copied")
            div #[icon-check] Copied
          template(v-else)
            div #[icon-clipboard] Copy to clipboard
        button.btn.btn-light.w-100(
          :disabled="value === ''",
          @click="store.drawOnMap(property)",
        ) #[icon-map] Draw on map
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useClipboard } from '@vueuse/core';
import useMainStore from '../store/useMainStore';
import IconClipboard from '~icons/bi/clipboard';
import IconMap from '~icons/bi/map';
import IconCheck from '~icons/bi/check';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  property: {
    type: String,
    required: true,
  },
});

const store = useMainStore();
const { error } = storeToRefs(store);

const value = computed({
  get() {
    return store[props.property];
  },
  set(val) {
    store.changeProp(props.property, val);
  },
});

function loadExample() {
  store.placeExample(props.property);
}

const { copy, copied } = useClipboard();

const isInvalid = computed(() => error.value.isError && error.value.from === props.property);

const inputClass = computed(() => ({
  'is-invalid': isInvalid.value,
}));
</script>
