<template lang="pug">
u-card(:ui="{ root: 'h-full flex flex-col', body: 'flex-1 p-0 sm:p-0' }")
  template(#header)
    .flex.items-center.justify-between.gap-2.w-full
      label.font-semibold.text-base(
        :for="inputId",
        :class="{ 'text-error': isInvalid }"
      ) {{ title }}
      u-button(
        variant="link",
        color="primary",
        size="xs",
        icon="i-lucide-sparkles",
        label="Load example",
        @click="emit('loadExample')"
      )
  .h-80.overflow-hidden
    codemirror.w-full.h-full(
      :id="inputId",
      v-model="value",
      :extensions="extensions"
    )
  template(#footer)
    .grid.grid-cols-3.gap-2.w-full
      u-button(
        color="neutral",
        variant="subtle",
        block,
        :disabled="isEmpty",
        :icon="copied ? 'i-lucide-check' : 'i-lucide-clipboard'",
        :label="copied ? 'Copied' : 'Copy'",
        @click="copy(value)"
      )
      u-button(
        color="neutral",
        variant="subtle",
        block,
        icon="i-lucide-download",
        label="Save to file",
        :disabled="isEmpty",
        @click="download"
      )
      u-button(
        color="neutral",
        variant="subtle",
        block,
        icon="i-lucide-map",
        label="Draw on map",
        :disabled="isEmpty",
        @click="store.drawOnMap(format)"
      )
</template>

<script setup lang="ts">
import useMainStore from "~/store/useMainStore";
import { Codemirror } from "vue-codemirror";
import { json } from "@codemirror/lang-json";
import { EditorView } from "codemirror";
import { dracula, tomorrow } from "thememirror";

const props = defineProps<{
  title: string;
  format: InputFormat;
}>();

const emit = defineEmits<{
  loadExample: [];
}>();

const value = defineModel<string>({ required: true });

const store = useMainStore();
const { error } = storeToRefs(store);

const { copy, copied } = useClipboard();
const colorMode = useColorMode();

const inputId = computed(() => `${props.format}_input`);
const isEmpty = computed(() => value.value.trim() === "");
const isInvalid = computed(
  () => error.value.isError && error.value.from === props.format
);

// Stretch the content to the full editor height so clicks and file drops
// work anywhere, not only on the existing lines
const fillHeight = EditorView.theme({
  "&": { height: "100%" },
  ".cm-scroller": { overflow: "auto" },
  ".cm-content, .cm-gutter": { minHeight: "100%" },
});

const extensions = computed(() => [
  EditorView.lineWrapping,
  fillHeight,
  ...(props.format === "geojson" ? [json()] : []),
  colorMode.value === "dark" ? dracula : tomorrow,
]);

function download() {
  downloadText(
    value.value,
    `converted_${new Date().toISOString()}.${FORMAT_FILE_EXTENSIONS[props.format]}`
  );
}
</script>
