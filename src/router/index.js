import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'components/home/home'
import Order from 'components/order/order'
import Me from 'components/me/me'

Vue.use(VueRouter)

export default new VueRouter({
    linkActiveClass: 'active',
	routes: [
		  {
		   path:'/home',
		   component: Home
		   },
		  {
		  	path:'/order',
		    component: Order
		  },
		  {
		  	path:'/me', 
		  	component: Me
		  },
		  {//404路由 访问不存在 直接跳转
		  	path:'*',
		  	redirect: '/home'
		  }
	]
})








