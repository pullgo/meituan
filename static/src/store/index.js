import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import state from './state';
import mutations from './mutations';
import createLogger from 'vuex/dist/logger'; // vuex 的一个插件

Vue.use(Vuex);

 // 调试工具是不是通过mutations修改不是的话 是直接修改的话会报错 开发环境下使用 线上不建议使用
const debug = process.env.NOOE_ENV !== 'production';
export default new Vuex.Store({
	actions,
	getters,
	state,
	mutations,
	strict: debug, // 严格模式
	plugins: debug ? [createLogger()] : []
});