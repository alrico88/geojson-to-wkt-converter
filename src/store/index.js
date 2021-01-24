import Vue from 'vue';
import Vuex from 'vuex';
import {
  parseFromWK,
  convertToWK,
  convertFeatureCollection,
} from 'wkt-parser-helper';
import {exampleGeoJSON, exampleWKT} from '../helpers/examples';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    geojson: '',
    wkt: '',
    error: {
      isError: false,
      message: '',
      from: '',
    },
    drawnMap: null,
    drawnSource: null,
  },
  getters: {
    getDrawnSource({drawnSource}) {
      let toReturn;

      switch (drawnSource) {
        case 'geojson':
          toReturn = 'GeoJSON';
          break;
        case 'wkt':
          toReturn = 'WKT';
          break;
        default:
          toReturn = 'Nothing';
      }

      return toReturn;
    },
  },
  mutations: {
    changeState(state, {field, value}) {
      state[field] = value;
    },
    setError(state, {from, message}) {
      state.error.isError = true;
      state.error.from = from;
      state.error.message = message;
    },
    discardError(state) {
      state.error.isError = false;
    },
  },
  actions: {
    convertGeoJSONToWkt(context) {
      context.commit('discardError');
      try {
        const {geojson} = context.state;
        const parsed = JSON.parse(geojson);
        const converted =
          parsed.type === 'FeatureCollection'
            ? convertFeatureCollection(parsed)
            : convertToWK(parsed, 'wkt');
        context.commit('changeState', {
          field: 'wkt',
          value: converted,
        });
      } catch (err) {
        context.dispatch('triggerError', {
          from: 'geojson',
          message: err,
        });
      }
    },
    convertWktToGeoJSON(context) {
      context.commit('discardError');
      try {
        const {wkt} = context.state;
        const asGeoJSON = parseFromWK(wkt, true);
        context.commit('changeState', {
          field: 'geojson',
          value: JSON.stringify(asGeoJSON, null, 2),
        });
      } catch (err) {
        context.dispatch('triggerError', {
          from: 'wkt',
          message: err,
        });
      }
    },
    triggerError(context, {from, message}) {
      // eslint-disable-next-line no-console
      console.error(message);
      context.commit('setError', {
        from,
        message,
      });
    },
    placeExample(context, element) {
      const elements = {
        geojson: JSON.stringify(exampleGeoJSON, null, 2),
        wkt: exampleWKT,
      };

      switch (element) {
        case 'geojson':
          context.commit('changeState', {
            field: 'geojson',
            value: elements[element],
          });
          context.commit('changeState', {
            field: 'wkt',
            value: '',
          });
          break;
        case 'wkt':
          context.commit('changeState', {
            field: 'wkt',
            value: elements[element],
          });
          context.commit('changeState', {
            field: 'geojson',
            value: '',
          });
          break;
        default:
          break;
      }
    },
    drawOnMap(context, element) {
      const value =
        element === 'geojson'
          ? JSON.parse(context.state.geojson)
          : parseFromWK(context.state.wkt);
      context.commit('changeState', {
        field: 'drawnMap',
        value,
      });
      context.commit('changeState', {
        field: 'drawnSource',
        value: element,
      });
    },
  },
});
