app-music

    A Vue.js project

Build Setup

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

For a detailed explanation on how things work, check out the guide and docs for vue-loader.

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

1.禁止缩放

通过meta元标签来设置。

<meta name="viewport" content="target-densitydpi=320,width=640,user-scalable=no">

2.禁止滚动

preventDefault是阻止默认行为，touch事件的默认行为就是滚动。

event.preventDefault();

刚开始我也以为touch的三个事件都有targetTouches，touches以及changedTouches对象列表， 
其实不然，touchend事件中应该是只有个changedTouches触摸实例列表的， 
而且这里说明一下，回调函数的event只是一个普通的object对象， 
实际上event中有一个originalEvent属性，这才是真正的touch事件， 
这个事件中才存在着上诉三个触摸实例列表，这三个实例存储了触摸事件的位置等等属性，类似于鼠标事件。所以貌似touchend事件中只能用changedTouches！！

《具体事例看home.vue 购物车事件 参考链接；https://blog.csdn.net/m_uncle/article/details/78129222》

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

	8.

五.webpack学习
    1> 安装 npm install webpak webpak-cli -g
    	或者 yarn global add webpak webpak-cli
	2>