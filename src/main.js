import Vue from 'vue'
import router from './router'
import Axios from 'axios'
import VueLazyLoad from 'Vue-lazyload'
import App from './App'

import 'common/stylus/index.styl'

/* eslint-disable no-new */
Vue.use(VueLazyLoad, {
	error: 'http://a0.att.hudong.com/77/31/20300542906611142174319458811.jpg',
	loading: require('common/image/logo.jpg')
})
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
