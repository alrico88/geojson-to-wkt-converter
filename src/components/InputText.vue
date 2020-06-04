<template lang="pug">
  .col-md
    form.form
      .form-group
        ul.list-inline.mb-0
          li.list-inline-item
            label.font-weight-bold {{ title }}
          li.list-inline-item
            a(href="#", @click.prevent="loadExample") Load example
        textarea.form-control(rows="20", v-model="value", :class="{'is-invalid': error.isError && error.from === property}")
      .form-group
        ul.list-inline.mb-0
          li.list-inline-item
            button.btn.btn-light(
              type="button",
              :disabled="value === ''",
              v-clipboard:copy="value",
              v-clipboard:success="notifyClipSuccess",
              v-clipboard:error="notifyClipError"
            )
              i.fa.fa-copy
              |  Copy to clipboard
          li.list-inline-item
            button.btn.btn-light(
              type="button",
              :disabled="value === ''",
              @click.prevent="drawOnMap(property)"
            )
              i.fa.fa-map
              |  Draw on map
</template>

<script>
import {mapState, mapActions} from 'vuex';
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
    ...mapActions(['drawOnMap']),
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
    loadExample() {
      this.$store.dispatch('placeExample', this.property);
    },
  },
};
</script>
