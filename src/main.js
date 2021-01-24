import Vue from 'vue';
import App from './App.vue';
import VueClipboard from 'vue-clipboard2';
import VueMeta from 'vue-meta';
import {ToastPlugin} from 'bootstrap-vue';

import './registerServiceWorker';

Vue.config.productionTip = false;

import 'leaflet/dist/leaflet.css';
import './assets/main.scss';

import store from './store';

Vue.use(ToastPlugin);
Vue.use(VueClipboard);
Vue.use(VueMeta);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
