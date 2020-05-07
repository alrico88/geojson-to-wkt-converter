import Vue from 'vue';
import App from './App.vue';
import Notifications from 'vue-notification';
import VueClipboard from 'vue-clipboard2';
import './registerServiceWorker';

Vue.config.productionTip = false;

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';

Vue.use(Notifications);
Vue.use(VueClipboard);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
