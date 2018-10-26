import Vue from 'vue';
import router from './router';
import Axios from 'axios';
import VueLazyLoad from 'Vue-lazyload';
import store from './store';
import App from './App';
import $ from 'jquery';
import 'common/stylus/index.styl';
import fastClick from 'fastClick';
/* eslint-disable no-new */

fastClick.attach(document.body);
Vue.use(VueLazyLoad, {
	error: 'http://a0.att.hudong.com/77/31/20300542906611142174319458811.jpg',
	loading: require('common/image/logo.jpg')
});
// Vue.use(Vuex)
new Vue({
  el: '#app',
  // Vuex,
  render: h => h(App),
  router,
  store
});
