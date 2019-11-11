import Vue from 'vue'
import App from './App.vue'
import Router from './router/index.js'
import ElementUI from 'element-ui';
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI, axios);

new Vue({
  Router,
  render: h => h(App),
}).$mount('#app')
