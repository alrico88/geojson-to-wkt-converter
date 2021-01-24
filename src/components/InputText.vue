<template lang="pug">
  .col-md
    b-form
      b-form-group
        ul.list-inline.mb-0
          li.list-inline-item
            label.font-weight-bold {{ title }}
          li.list-inline-item
            a(href="#", @click.prevent="loadExample") Load example
        b-form-textarea(rows="20", v-model="value", :state="validationState")
      b-form-group
        .d-flex
          .flex-grow-1.pr-2
            b-button(
              variant="light",
              :disabled="value === ''",
              v-clipboard:copy="value",
              v-clipboard:success="notifyClipSuccess",
              v-clipboard:error="notifyClipError",
              block
            )
              b-icon-clipboard
              |  Copy to clipboard
          .flex-grow-1.pl-2
            b-button(
              variant="light",
              :disabled="value === ''",
              @click="drawOnMap(property)",
              block
            )
              b-icon-map
              |  Draw on map
</template>

<script>
import {mapState, mapActions} from 'vuex';
import {BButton, BForm, BFormGroup, BFormTextarea, BIconMap, BIconClipboard} from 'bootstrap-vue';
import ToastMixin, {toastVariants} from '@/mixins/ToastMixin';

export default {
  components: {
    BButton,
    BForm,
    BFormGroup,
    BFormTextarea,
    BIconMap,
    BIconClipboard,
  },
  mixins: [ToastMixin],
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
    validationState() {
      return this.error.isError && this.error.from === this.property ? false : null;
    },
  },
  methods: {
    ...mapActions(['drawOnMap']),
    notifyClipSuccess() {
      this.showToast('Success', 'Copied to clipboard', toastVariants.SUCCESS);
    },
    notifyClipError(err) {
      this.showToast('Error', `Error copying to clipboard ${err}`, toastVariants.ERROR);
    },
    loadExample() {
      this.$store.dispatch('placeExample', this.property);
    },
  },
};
</script>
