import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/validate'
import axios from 'axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false
axios.defaults.baseURL = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'http://my.domain.com'

const vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
