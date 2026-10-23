import prettier from "eslint-config-prettier";
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  // Lets eslint-plugin-vue read Pug templates (eslint-plugin-vue-pug doesn't support ESLint 10)
  {
    name: "app/vue-pug",
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        templateTokenizer: { pug: "vue-eslint-parser-template-tokenizer-pug" },
      },
    },
  },
  prettier,
  {
    rules: {
      "vue/multi-word-component-names": "off",
      "arrow-body-style": "error",
    },
  }
);
