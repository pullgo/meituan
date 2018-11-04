// 统一dom操作
export function hasClass(el, className) { // 判断是否有这个函数被调用
	// console.log(hasClass(el,className));
	let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
	// 正则表达式判断 (^|\\s) 表示是他自己或者是空格 (\\s|$)'表示空白字符或者结束
	return reg.test(el, className); // 获取class
}
	// console.log(hasClass(el,className));
export function addClass(el, className) { // 创建一个函数
	if (hasClass(el, className)) { // dom对象有这个class就返回
		return;
	}
	let newClass = el.className.split(' '); // 否则用空格叉开
	newClass.push(className);
	el.className = newClass.join(' '); // 链接起来  完成dom的添加
}
// 有序A-Z列表点击事件封装
export function getData(el, name, val) { // el dom对象  val  值
	const prefix = 'data-';
	name = prefix + name;
	if (val) {
		return el.setAttribute(name, val);
	} else {
		return el.getAttribute(name);
	}
}

//
document.addEventListener('touchstart', function(event) {
    // 判断默认行为是否可以被禁用
    if (event.cancelable) {
        // 判断默认行为是否已经被禁用
        if (!event.defaultPrevented) {
            event.preventDefault();
        }
    }
}, false);