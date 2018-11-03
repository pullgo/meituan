// 定义修改的操作
// import * as es6语法
import * as types from './mutation-types';
const matutaions = {
	[types.SET_GOOD] (state, good) {
		state.good = good;
	}
};
export default matutaions;