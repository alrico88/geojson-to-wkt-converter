<template lang="pug">
.col-md-5
  .row
    .col
      .form-group
        .hstack.justify-content-between.gap-2.mb-2.align-items-center
          label.input-title.mb-0(:for="inputId") {{ title }}
          button.btn.btn-link.p-0(@click="() => emit('load-example')") Load example
        textarea.form-control.bg-white.border-1(
          :id="inputId"
          rows="15"
          v-model="value"
          :class="inputClass"
        )
  .row
    .col
      .hstack.gap-2
        button.btn.btn-light.w-100.text-truncate(
          @click="copy(value)"
          :disabled="btnDisabled"
        )
          template(v-if="copied") #[icon(name="bi:check")] Copied
          template(v-else) #[icon(name="bi:clipboard")] Copy to clipboard
        button.btn.btn-light.w-100.text-truncate(
          :disabled="btnDisabled",
          @click="download"
        ) #[icon(name="bi:download")] Save to file
        button.btn.btn-light.w-100.text-truncate(
          :disabled="btnDisabled",
          @click="store.drawOnMap(property)",
        ) #[icon(name="bi:map")] Draw on map
</template>

<script setup lang="ts">
import useMainStore from "~/store/useMainStore";
import { saveAs } from "file-saver";

const props = defineProps<{
  title: string;
  property: "geojson" | "wkt";
  modelValue: string;
}>();

const emit = defineEmits<{
  "load-example": [];
}>();

const store = useMainStore();
const { error } = storeToRefs(store);

const value = useVModel(props, "modelValue");
const btnDisabled = computed(() => value.value === "");

const { copy, copied } = useClipboard();

const isInvalid = computed(
  () => error.value.isError && error.value.from === props.property,
);

const inputClass = computed(() => ({
  "is-invalid": isInvalid.value,
}));

function download() {
  const fileFormat = props.property === "geojson" ? "geojson" : "txt";

  saveAs(
    new Blob([value.value]),
    `converted_${new Date().toISOString()}.${fileFormat}`,
  );
}

const inputId = computed(() => `${props.property}_input`);
</script>

<style scoped lang="scss">
.input-title {
  font-weight: bold;
  font-size: 1.3rem;
}
</style>
