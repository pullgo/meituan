import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from 'components/Home/home';
import FastBuy from 'components/FastBuy/fastbuy';
import Order from 'components/Order/order';
import Me from 'components/Me/me';
import Massage from 'components/Massage/massage';
import MMassage from 'components/MMassage/mmassage';
import Setting from 'components/Setting/setting';
import Food from 'components/Food/food';
import Menu from 'components/Menu/menu';
import Seller from 'components/Seller/seller';
import Ratings from 'components/Ratings/ratings';

Vue.use(VueRouter);

export default new VueRouter({
    linkActiveClass: 'active',

	routes: [
		{
			path: '/home',
			component: Home,
			children: [
				{
					path: 'massage',
					component: Massage
				},
				{
					path: 'food',
					component: Food,
					// redirect: '/menu',
					children: [
						{
						path: '/home/food/Menu',
						component: Menu
						},
						{
						path: '/home/food/seller',
						component: Seller
						},
						{
						path: '/home/food/ratings',
						component: Ratings
						}
					]
				},
				{
					path: ':id', // 传入不同的id 渲染不同物品
					component: Food
				}
			]
		},
		{
			path: '/fastbuy',
			component: FastBuy
		},
		{
			path: '/order',
			component: Order
		},
		{
			path: '/me',
			component: Me,
			children: [
				{
					path: 'mmassage',
					component: MMassage
				},
				{
					path: 'setting',
					component: Setting
				}
			]
		},
		{ // 404路由 访问不存在 直接跳转
			path: '*',
			redirect: '/home'
		}
	]
});