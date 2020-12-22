// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './style/theme.css'
import './style/characters.css'

import axios from 'axios'
//其他vue组件中就可以this.$axios调用使用
Vue.prototype.$axios = axios


Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
