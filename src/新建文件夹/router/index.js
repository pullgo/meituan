import Vue from 'vue'
import VueRouter from 'vue-router'
import Sale from 'components/sale/sale'
import Special from 'components/special/special'
import ShoppingCart from 'components/shoppingCart/shoppingCart'
import Spell from 'components/Spell/spell'
import Me from 'components/Me/me'

Vue.use(VueRouter)

export default new VueRouter({
	routes: [
		{
			path:'/sale',
			component: Sale//不加s
		},
		{
			path:'/special',
			component: Special
		},
		{
			path:'/shoppingCart',
			component: ShoppingCart
		},
		{
			path:'/spell',
			component: Spell
		},
		{
			path:'/me',
			component: Me
		},
	],
	linkActiveClass: 'active'
})

