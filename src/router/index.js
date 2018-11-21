import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from 'components/Home/home';
import FindList from 'components/FindList/findList';
import Order from 'components/Order/order';
import Me from 'components/Me/me';
import Massage from 'components/Massage/massage';
import Setting from 'components/Setting/setting';
import Menu from 'components/Menu/menu';
import Seller from 'components/Seller/seller';
import Ratings from 'components/Ratings/ratings';
import ToBeEvaluated from 'components/ToBeEvaluated/toBeEvaluated';
import Refund from 'components/Refund/refund';
import FoodHeaderActivity from 'components/foodHeaderActivity/foodHeaderActivity';
// import DialogueBox from 'components/DialogueBox/dialogueBox';
Vue.use(VueRouter);

export default new VueRouter({
    linkActiveClass: 'active',

	routes: [
		{
			path: '/home',
			component: Home,
			meta: {
				keepAlive: true
			},
			children: [
				{
					path: '/home/massage',
					component: Massage
				},
				{
					path: '/home/menu',
					component: Menu,
					meta: {
						keepAlive: true
					},
					children: [
						{
							path: '/home/menu/foodHeaderActivity',
							component: FoodHeaderActivity
						}
						/* {
							path: '/home/menu/food/dialogueBox',
							component: DialogueBox
						} */
					]
				},
				{
					path: '/home/seller',
					component: Seller
				},
				{
					path: '/home/ratings',
					component: Ratings
				}
			]
		},
		{
			path: '/findList',
			component: FindList,
			meta: {
				keepAlive: true
			}
		},
		{
			path: '/order',
			component: Order,
			children: [
				{
					path: '/order/toBeEvaluated',
					component: ToBeEvaluated
				},
				{
					path: '/order/refund',
					component: Refund
				}
			]
		},
		{
			path: '/me',
			component: Me,
			children: [
				{
					path: 'massage',
					component: Massage
				},
				{
					path: 'setting',
					component: Setting
				}
			]
		}
		/* {  404路由 访问不存在 直接跳转
			// path: '*',
			// redirect: '/home'
		} */
	]
});