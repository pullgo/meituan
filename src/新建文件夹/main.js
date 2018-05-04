import Vue from 'vue'
import router from './router'//这里需要引入
import App from './App'

//import 'common/stylus/index.styl'

/* eslint-disable no-new */

new Vue({
  el: '#app',
  render: h => h(App),
  router//这里需要引入
})
