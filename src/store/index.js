import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
 // 调试工具是不是通过mutations修改不是的话 是直接修改的话会报错 开发环境下使用 线上不建议使用
const debug = process.env.NOOE_ENV !== 'production';
const state = {
	showShopCart: true
};
export default new Vuex.Store({
	state
});