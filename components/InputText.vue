<template lang="pug">
.col-md-5
  .row
    .col
      fieldset
        .hstack.justify-content-between.gap-2.mb-2.align-items-center
          label.input-title.mb-0(:for="inputId", :class="inputClass") {{ title }}
          b-button.p-0(variant="link", @click="() => emit('load-example')") Load example
        .input-style.border.border-1.mb-2.bg-white
          codemirror(
            :id="inputId",
            :style="{ height: '300px' }",
            v-model="value",
            :extensions="extensions"
          )
  .row
    .col
      .hstack.gap-2
        b-button.w-100.text-truncate(
          variant="light",
          @click="copy(value)",
          :disabled="btnDisabled"
        )
          template(v-if="copied") #[icon(name="bi:check")] Copied
          template(v-else) #[icon(name="bi:clipboard")] Copy to clipboard
        b-button.w-100.text-truncate(
          variant="light",
          :disabled="btnDisabled",
          @click="download"
        ) #[icon(name="bi:download")] Save to file
        b-button.w-100.text-truncate(
          variant="light",
          :disabled="btnDisabled",
          @click="store.drawOnMap(property)"
        ) #[icon(name="bi:map")] Draw on map
</template>

<script setup lang="ts">
import useMainStore from "~/store/useMainStore";
import fileSaver from "file-saver";
import { Codemirror } from "vue-codemirror";
import { json } from "@codemirror/lang-json";
import { EditorView } from "codemirror";

const { saveAs } = fileSaver;

const props = defineProps<{
  title: string;
  property: "geojson" | "wkt";
}>();

const emit = defineEmits<{
  "load-example": [];
}>();

const store = useMainStore();
const { error } = storeToRefs(store);

const value = defineModel<string>({ required: true });
const btnDisabled = computed(() => value.value === "");

const { copy, copied } = useClipboard();

const isInvalid = computed(
  () => error.value.isError && error.value.from === props.property,
);

const extensions = computed(() => {
  const exts = [EditorView.lineWrapping];

  if (props.property === "geojson") {
    exts.push(json());
  }

  return exts;
});

const inputClass = computed(() => ({
  "text-danger": isInvalid.value,
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

.input-style {
  height: 300px;
}
</style>
