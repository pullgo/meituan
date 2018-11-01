import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from 'components/Home/home';
import FindList from 'components/FindList/findList';
import Order from 'components/Order/order';
import Me from 'components/Me/me';
import Massage from 'components/Massage/massage';
import MMassage from 'components/MMassage/mmassage';
import Setting from 'components/Setting/setting';
// import Food from 'components/Food/food';
import Menu from 'components/Menu/menu';
import Seller from 'components/Seller/seller';
import Ratings from 'components/Ratings/ratings';
// import Detail from 'components/Detail/detail';

Vue.use(VueRouter);

export default new VueRouter({
    linkActiveClass: 'active',

	routes: [
		{
			path: '/home',
			component: Home,
			children: [
				{
					path: '/home/massage',
					component: Massage
				},
				{
					path: '/home/Menu',
					component: Menu

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
			component: FindList
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
		}
		/* {  404路由 访问不存在 直接跳转
			// path: '*',
			// redirect: '/home'
		} */
	]
});