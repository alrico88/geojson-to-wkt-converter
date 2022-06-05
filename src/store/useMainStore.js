import { defineStore } from 'pinia';
import { parseFromWK, convertToWK } from 'wkt-parser-helper';
import { Formatter } from 'fracturedjsonjs';
import { exampleGeoJSON, exampleWKT } from '../helpers/examples';

const jsonFormatter = new Formatter();

export default defineStore('mainStore', {
  state: () => ({
    geojson: '',
    wkt: '',
    error: {
      isError: false,
      message: '',
      from: '',
    },
    drawnMap: null,
    drawnSource: null,
  }),
  getters: {
    getDrawnSource() {
      switch (this.drawnSource) {
        case 'geojson':
          return 'GeoJSON';
        case 'wkt':
          return 'WKT';
        default:
          return 'Nothing';
      }
    },
  },
  actions: {
    discardError() {
      this.error.isError = false;
    },
    triggerError(from, errMessage) {
      this.error.isError = true;
      this.error.from = from;
      this.error.message = errMessage;
    },
    changeProp(prop, val) {
      this[prop] = val;
    },
    convertGeoJSONToWkt() {
      this.discardError();

      try {
        const parsed = JSON.parse(this.geojson);

        this.wkt = convertToWK(parsed);
      } catch (err) {
        this.triggerError('geojson', err);
      }
    },
    convertWktToGeoJSON() {
      this.discardError();

      try {
        const asGeoJSON = parseFromWK(this.wkt);

        if (asGeoJSON === null) {
          throw new Error('Invalid WKT string');
        }

        this.geojson = jsonFormatter.serialize(asGeoJSON);
      } catch (err) {
        this.triggerError('wkt', err);
      }
    },
    placeExample(element) {
      if (element === 'geojson') {
        this.$patch({
          geojson: jsonFormatter.serialize(exampleGeoJSON),
          wkt: '',
        });
      } else {
        this.$patch({
          geojson: '',
          wkt: exampleWKT,
        });
      }
    },
    drawOnMap(element) {
      const value = element === 'geojson'
        ? JSON.parse(this.geojson)
        : parseFromWK(this.wkt);

      this.drawnMap = value;
      this.drawnSource = element;
    },
  },
});
