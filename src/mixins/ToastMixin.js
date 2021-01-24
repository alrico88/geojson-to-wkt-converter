export const toastVariants = {
  SUCCESS: 'success',
  ERROR: 'danger',
  WARNING: 'warning',
};

export default {
  methods: {
    showToast(title, message, variant) {
      this.$bvToast.toast(message, {
        title,
        variant,
        autoHideDelay: 3000,
      });
    },
  },
};
