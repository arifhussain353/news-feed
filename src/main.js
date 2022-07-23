import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.min.css";

import { store } from "./store/store";
import router from './router/router' // added by router plugin

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')

