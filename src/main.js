import Vue from 'vue';
import App from './App.vue';
import Notifications from 'vue-notification';
import VueClipboard from 'vue-clipboard2';
import VueMeta from 'vue-meta';

import './registerServiceWorker';

Vue.config.productionTip = false;

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'leaflet/dist/leaflet.css';

import store from './store';

Vue.use(Notifications);
Vue.use(VueClipboard);
Vue.use(VueMeta);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
