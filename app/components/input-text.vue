<template lang="pug">
UCard(:ui="{ root: 'h-full flex flex-col', body: 'flex-1 p-0 sm:p-0' }")
  template(#header)
    .flex.items-center.justify-between.gap-2.w-full
      label.font-semibold.text-base(
        :for="inputId",
        :class="{ 'text-error': isInvalid }"
      ) {{ title }}
      UButton(
        variant="link",
        color="primary",
        size="xs",
        icon="i-lucide-sparkles",
        label="Load example",
        @click="() => emit('load-example')"
      )
  .h-80.overflow-hidden
    codemirror.w-full.h-full(
      :id="inputId",
      v-model="value",
      :extensions="extensions"
    )
  template(#footer)
    .grid.grid-cols-3.gap-2.w-full
      UButton(
        color="neutral",
        variant="subtle",
        block,
        :disabled="btnDisabled",
        :icon="copied ? 'i-lucide-check' : 'i-lucide-clipboard'",
        :label="copied ? 'Copied' : 'Copy'",
        @click="copy(value)"
      )
      UButton(
        color="neutral",
        variant="subtle",
        block,
        icon="i-lucide-download",
        label="Save to file",
        :disabled="btnDisabled",
        @click="download"
      )
      UButton(
        color="neutral",
        variant="subtle",
        block,
        icon="i-lucide-map",
        label="Draw on map",
        :disabled="btnDisabled",
        @click="store.drawOnMap(property)"
      )
</template>

<script setup lang="ts">
import useMainStore from "~/store/useMainStore";
import { Codemirror } from "vue-codemirror";
import { json } from "@codemirror/lang-json";
import { EditorView } from "codemirror";
import { dracula, tomorrow } from "thememirror";
import fileSaver from "file-saver";

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
  () => error.value.isError && error.value.from === props.property
);

const colorMode = useColorMode();

const extensions = computed(() => {
  const exts = [EditorView.lineWrapping];

  if (props.property === "geojson") {
    exts.push(json());
  }

  if (colorMode.value === "dark") {
    exts.push(dracula);
  } else {
    exts.push(tomorrow);
  }

  return exts;
});

function download() {
  const fileFormat = props.property === "geojson" ? "geojson" : "txt";

  saveAs(
    new Blob([value.value]),
    `converted_${new Date().toISOString()}.${fileFormat}`
  );
}

const inputId = computed(() => `${props.property}_input`);
</script>

<style scoped>
.cm-editor {
  height: 100%;
}
</style>
