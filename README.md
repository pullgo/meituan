2018版最新美团外卖APP

sketch 概述

	技术栈：
	Vue 2.x + vue-clivue-router + axios + vue-lazyload + better-scroll + ES6 + stylus + Node.js + Express + ESLint

closed_book 收获

    对 vue 的组件、指令、选项、模版渲染、事件绑定、计算属性等有了一定了解
    了解了 vue 组件之间的交互、传值
    熟悉了在 vue 项目中使用第三方插件（组件）
    熟悉了组件化、模块化的开发思维
    熟悉了 vue-router 控制路由和子路由的方式
    再次熟悉项目开发流程：项目分析设计 -> 项目环境搭建 -> 依赖安装 -> 页面架构设计 -> 组件开发 -> 测试联调 -> 发布上线
    总结了一套 Vue 通用组件，可以在其它项目中复用的 10+ 个基础组件、15+ 个业务组件
    总结了一套常用的 stylus mixin 库
    总结了一套常用的 JS 工具函数库
    体会到组件化、模块化开发带来的便捷
    体会到将对象封装成类(ES6 class) 的便捷性，以及利用工厂方式初始化类实例
    学会利用过渡效果及动画效果制作良好的用户交互体验
    
项目展示：
    完整页面：
	<div align=center><img src="https://github.com/pullgo/meituan/blob/master/demoShow/GIF.gif"/></div>
	<div align=left><span>四个主页面：</span>
	<span><ul>
	<li>用router路由控制的跳转</li>
	<li>keep-alive节省了浏览器下载时间</li>
	</ul></span>
	<span align=right><img src="https://github.com/pullgo/meituan/blob/master/demoShow/index.gif"/></span></div>
	在这个页面中图片轮播、菜单栏轮播、商家列表使用了better-scroll插件 
	布局上采用嵌套 Flex 布局
	首页页面：
	<img src="https://github.com/pullgo/meituan/blob/master/demoShow/home.gif"/>	
	发现页面：
	<img src="https://github.com/pullgo/meituan/blob/master/demoShow/findlist.gif"/>
	订单页面：
	<img src="https://github.com/pullgo/meituan/blob/master/demoShow/order.gif"/>
	我的页面：
	<img src="https://github.com/pullgo/meituan/blob/master/demoShow/me.gif"/>
	商家页面：
	<img src="https://github.com/pullgo/meituan/blob/master/demoShow/good.gif"/>	
	商品页面：
	<img src="https://github.com/pullgo/meituan/blob/master/demoShow/menu.gif"/>
Summary of project questions 项目问题点总结：

一,touch的使用

	以下是四种touch事件

	touchstart: //手指放到屏幕上时触发

	touchmove: //手指在屏幕上滑动式触发

	touchend: //手指离开屏幕时触发

	touchcancel: //系统取消touch事件的时候触发，这个好像比较少用
	每个触摸事件被触发后，会生成一个event对象，event对象里额外包括以下三个触摸列表

	touches: //当前屏幕上所有手指的列表

	targetTouches: //当前dom元素上手指的列表，尽量使用这个代替touches

	changedTouches: //涉及当前事件的手指的列表，尽量使用这个代替touches

	这些列表里的每次触摸由touch对象组成，touch对象里包含着触摸信息，主要属性如下：

	clientX / clientY: //触摸点相对浏览器窗口的位置

	screenX / screenY 相对于屏幕的 x 和 y 坐标

	pageX / pageY: //触摸点相对于页面的位置

	screenX / screenY: //触摸点相对于屏幕的位置

	identifier: //touch对象的ID

	target: //当前的DOM元素

	ev.preventDefault();//阻止事件相关的的默认行为
	注意：

	手指在滑动整个屏幕时，会影响浏览器的行为，比如滚动和缩放。 
	所以在调用touch事件时，要注意禁止缩放和滚动。
	参考文章：http://www.jintiankansha.me/t/llgywQvL2V


二、VUEX的学习  2018-6-16
	1.vuex理解为一个核心数据库 store 适用与中大型应用
	2.state: 访问状态对象 一般为常量 数据 不变的
	3.mutations：触发状态  用commit触发  同步操作
	  3.1mutations-type mutationsde名字 存储一些mutations相关的常量
	例如：  <buttom @click="$store.commit('jia')">+</buttom>
			<buttom @click="$store.commit('jian')">-</buttom>
	4.	简化一个计算属性的写法
	import {mapState} form 'vuex'	
	 computed:mapState({
		 **:function(state) {
			 return state.** +2
		 }
	 })
	 ES6写法：**：state=>state.**

	 如果更加麻烦 可以用数组的方式写
	 computed:mapState([
		"**"
	 ])
	 mapState直接这样写需要安装一个插件 但是直接在前面+...就可以了  =》...mapState
	 5.mapMutations  
	 methods:{
	 	...mapMutations([
	   '**'
	 	])
	 	...mapActions([])
	 }
	 6.getter获取则（映射） 动态的计算属性 写的参数 第一个是需要处理的对象
	getter的map属性   ...mapGetter
	computed:{
		...mapState([
		])
		...mapGetter([
		])
	}

	7.actions 动作开始 作用就是异步操作  mutations同步操作  写在methods里面 可以调用mutations里面的所有动作 批量处理动作的结合   ...mapActions
	参数:(context)
	context 整个的store
	如何调用mutations里面的所有动作
	const actions = {
		jia(context){
			context.commit('jia',(a:10))
			setTimeout(()=>{
			context.commit('jian')
			},3000)
			const.log(我被执行了)  是jia先执行
		}
	}

	8.modle模块化 就是一个数组的集合 坑多
	原来例子：
	export dafault new Vuex.store({
		state,
		mapMutations,
		getters,
		actions
	})
	集中后的例子为：
	const moduleA = {
		state,
		mapMutations,
		getters,
		actions	
	}
	export dafault new Vuex.store({
		modules:{
			a:moduleA
		}
	})


	注意：
	1.computed 建议不用箭头函数  因为this是指上一层 发生穿透事件 
	2.computed只能写一个  替换掉前一个



三,报错汇总
	 1,Uncaught TypeError: Cannot read property 'offsetTop' of null
	    主要js代码
	// 内容可视区域的高度
	clientHeight = document.documentElement.clientHeight;

	// 减去头部和底部的高度及上下外边距
	colHeight = clientHeight - 60 - document.getElementById("cover-page").offsetTop;

	// 界面的内容区高度
	document.getElementById("cover-page").style.height = colHeight + "px";1


	修改后代码
	// 内容可视区域的高度 
	clientHeight = document.documentElement.clientHeight; 

	// 减去头部和底部的高度及上下外边距,设置高度
	cover_page = document.getElementById("cover-page");

	cover_page.style.height = (clientHeight - cover_page.offsetTop - 60) + "px";



	2.[Vue warn]: Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "seller"
	原因是在使用组件时，传入的prop，被组件内部又做了一次修改，然后抛的异常

	这种情况下就会报这个错，因为传入的prop中的值是不允许改变的。这个在vue更新后才会出现的，网上是这么说的：

	在vue2中，直接修改prop是被视作反模式的。由于在新的渲染机制中，每当父组件重新渲染时，子组件都会被覆盖，所以应该把props看做是不可变对象 ^1。

	不能更改 quantity prop使其和父组件同步 , 而是让应该这个组件提交个事件给父组件，可以 watch quantity 变量，如果变量发生改变就emit事件，所以这里压根不需要 prop。

	在Vue2中组件的props的数据流动改为了只能单向流动，即只能由组件外（调用组件方）通过组件的DOM属性attribute传递props给组件内，组件内只能被动接收组件外传递过来的数据，并且在组件内，不能修改由外层传来的props数据。


	3.Vue报错笔记（1）vue.js:515 [Vue warn]: Property or method "name" is not defined on the instance but refere....


	就是你使用了但是在data里面没有定义 需要这样下
	 data() {
	 	return {
	 		name: ''
	 	}
	 }

	4.<emitted value instead of instance of error> error compiling template:>

	DOM中少了一个>

	5. The data property "food" is already declared as a prop. Use prop default value instead.  found in...

	翻译过来就是：

	数据属性“orderId”已经声明为一个PROP。使用PROP默认值代替。

	大致思路就是：访问data 和methods中的数据之外，还访问了props组件传递过来的值，如果发现data数据字段中的key值已经被定义，那么props传的参数再有这个重名的key值就会报这个错误。

	props的优先级 > data中的优先级 > menthods中的优先级

	代表，如果在这个key值在props中出现，那么data中的key值就不能定义了。


 四.知识点的总结
    1.导航栏使用了position 后在我的页面出现了最底下的内容被盖住   滑动也没有效果的情况时
    	解决办法： 被盖住内容增加一个padding-bottom：导航栏的高度即可
    	
	2.标题与图标垂直居中方式
		1>图标：
	      position: absolute
          left: 50%
          transform: translateX(-50%)
      	  文字：
          margin: 35px auto 0px auto
          text-align: center
        2>最简单粗暴的方法  在需要对齐的元素里面加下列代码

			display: flex //这句不能少 否则没有效果	父元素则不需要加
            flex-direction: column//上下排布 列布局  内容垂直居中
            align-items: center//内容水平居中

	3.在开发过程中会碰到等待图片加载 滚动不到底的情况
		在img中@load="loadImage" 

		loadImage() {
	        if (!this.checkloaded) {
		        this.checkloaded = true
		        this.$refs.scroll.refresh()
	        }
       },
       
	4.fixdtitle实现
	
		1>  mounted 添加滚动监听事件
			mounted () {
				window.addEventListener('scroll', this.handleScroll)
			}
		2>  methods写事件与判断
			methods : {
			    handleScroll () {
			        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || 
			        document.body.scrollTop;
			        if (scrollTop > 0) {
			            this.fixedSearch = true;
			            this.$refs.headAddress.style="display:none";
			            //this.$refs.head.style.tranform = `translate3d(0,40px,0)`
			        } else{
			            this.fixedSearch = false;
			            this.$refs.headAddress.style="display:block";
			        }
			            return ''        
			            //console.log(offsetTop)
			    }

			}
		3> 其他代码HTML css相对简单 请看home.vue组件

	5. transtion使用
		打开massgae/setting消息页面的动画 因为是属于路由里面的动画 应该在router-view外一层做动画 否则无效果

	6.在实际中出现子路由页面出现父级页面的内容 
		解决办法就是 ，给所有的页面都加上 height:100%;overflow-y:auto 这样所有的页面就可以单独显示了

	7.文字多余部分用三个点显示(此处需要给包含文字的div设立宽度)
		white-space: nowrap
		overflow: hidden
		text-overflow: ellipsis
	如果需要hover的时候显示文字则只需要加以下代码
		text-overflow: inherit
		overflow: visible

	8.display: table //一行或者多行垂直居中


	9.手机页面点击返回 会返回到上一级页面 我在该项目是用router做的  某一天发现可以这样
	
	html:
	<a @click="goBack"></a>

	script:
	export default {
		methods: {
			goBack () {
				window.history.back()
			}
		}
	}

	10. @click.stop.prevent="addFrist" 

	事件修饰符在事件处理器中经常需要调用 event.preventDefault() 或 event.stopPropagation()。尽管我们在方法内可以轻松做到，不过让方法是纯粹的数据逻辑而不处理 DOM 事件细节会更好。

	为了解决这个问题，Vue.js 为 v-on 提供两个 事件修饰符：.prevent 与 .stop。你是否还记得修饰符是点号打头的指令后缀？

	<!-- 阻止单击事件冒泡 -->
	<a v-on:click.stop="doThis"></a>


	<!-- 提交事件不再重载页面 -->
	<form v-on:submit.prevent="onSubmit"></form>


	<!-- 修饰符可以串联 -->
	<a v-on:click.stop.prevent="doThat">


	<!-- 只有修饰符 -->
	<form v-on:submit.prevent></form> 

	11.禁止缩放

	通过meta元标签来设置。

	<meta name="viewport" content="target-densitydpi=320,width=640,user-scalable=no">

	12.禁止滚动

	preventDefault是阻止默认行为，touch事件的默认行为就是滚动。

	event.preventDefault();

	刚开始我也以为touch的三个事件都有targetTouches，touches以及changedTouches对象列表， 
	其实不然，touchend事件中应该是只有个changedTouches触摸实例列表的， 
	而且这里说明一下，回调函数的event只是一个普通的object对象， 
	实际上event中有一个originalEvent属性，这才是真正的touch事件， 
	这个事件中才存在着上诉三个触摸实例列表，这三个实例存储了触摸事件的位置等等属性，类似于鼠标事件。所以貌似touchend事件中只能用changedTouches！！

	《具体事例看home.vue 购物车事件 参考链接；https://blog.csdn.net/m_uncle/article/details/78129222》

	13.一直以来我的手机页面在预览的时候一直无法滑动
	
	CSS DOM 各个定位等都一一排查过了  都没有找到原因 终于在一次网上查询如法滑动的原因 无意中看到scroll.js有默认阻止滑动事件 赶紧回头看了一下 想不到真的z在reset.css里面有一句：
	 
	touch-action：none 顿时恍然大悟  

	赶紧一搜touch-action：none为何物  表示不进行任何touch相关默认行为，例如，你想用手指滚动网页就不行，双击放大缩小页面也不可以，所有这些行为要自定义
	https://www.zhangxinxu.com/wordpress/2018/07/chrome-safari-touchmove-preventdefault-treated-as-passive/?from=groupmessage


持续更新中.............
