<template lang="pug">
  .col-md
    form.form
      .form-group
        label.font-weight-bold {{ title }}
        textarea.form-control(rows="20", v-model="value", :class="{'is-invalid': error.isError && error.from === property}")
      .form-group
        button.btn.btn-light(href="#", :disabled="value === ''", v-clipboard:copy="value", v-clipboard:success="notifyClipSuccess", v-clipboard:error="notifyClipError")
          i.fa.fa-copy
          |  Copy to clipboard
</template>

<script>
import {mapState} from 'vuex';
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    property: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(['error']),
    value: {
      get() {
        return this.$store.state[this.property];
      },
      set(value) {
        this.$store.commit('changeState', {
          field: this.property,
          value,
        });
      },
    },
  },
  methods: {
    notifyClipSuccess() {
      this.$notify({
        group: 'clipboard',
        title: 'Success',
        text: 'Copied to clipboard',
        type: 'success',
      });
    },
    notifyClipError(err) {
      this.$notify({
        group: 'clipboard',
        title: 'Error',
        text: `Error copying to clipboard ${err}`,
        type: 'danger',
      });
    },
  },
};
</script>
