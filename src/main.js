// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import Axios from 'axios'
import querystring from 'querystring'
import 'animate.css/animate.min.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons/iconfont/material-icons.css'
import gravatar from 'gravatar'
import auth from './services/auth'

window.gravatar = gravatar
window.axios = Axios
window.querystring = querystring
Vue.prototype.$http = Axios

Vue.use(VueMaterial)

Vue.config.productionTip = false

window.axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest'
}

if (auth.loggedIn()) {
  window.axios.defaults.headers.common = {
    'Authorization': auth.getAuthHeader()
  }
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
