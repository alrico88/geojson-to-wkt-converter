module.exports = {
  env: {
    browser: true,
    es2021: true,
    'vue/setup-compiler-macros': true,
  },
  extends: ['plugin:vue/vue3-recommended', 'airbnb-base'],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    'import/prefer-default-export': 'off',
    'max-len': 'off',
    'no-unused-vars': 'off',
  },
};
