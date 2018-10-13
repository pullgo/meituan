<template>
  <div class="menu">
  <!--左边-->
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index, $event)" ref="menuList">
          <span class="text border-1px">
            <div class="icon-wrapper">
            <icon class="icon" :size="12" :class="classMap[item.type]"></icon>{{item.name}}
            </div>
          </span>
        </li>
      </ul>
    </div>
  <!--右边-->
    <scroll ref="scroll">
      <div>
        <div class="foods-wrapper" ref="foodsWrapper">
          <ul>
            <li v-for="(item,index) in goods" class="food-list food-list-hook">
              <h1 class="title">{{item.name}}</h1>
              <ul>
                <li  @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item border-1px">
                  <div class="icon" height="57" width="57">
                    <img :src="food.icon" height="57" width="57">
                  </div>
                  <div class="content">
                    <h2 class="name">{{food.name}}</h2>
                    <p class="desc">{{food.description}}</p>
                    <div class="extra">
                      <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}个</span>
                    </div>
                    <div class="price">
                      <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                      <cartcontrol v-if="food" :food="food"></cartcontrol>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <!--selectFoods传入购物车组件 实现联动 -->     
    <Shopcart :select-foods="selectFoods"
              :delivery-price="seller.deliveryPrice"
              :min-price="seller.minPrice"
              ref="shopcart"
              >
    </Shopcart>
    <!--点击跳转到每个商品详情页面-->          
    <Detail :food="selectedFood" ref="food"></Detail>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios';
  import loading from 'base/loading/loading';
  import Scroll from 'base/Scroll/scroll';
  import Icon from 'base/Icon/icon';
  import BScroll from 'better-scroll';
  import Shopcart from 'components/Shopcart/shopcart';
  import Cartcontrol from 'base/Cartcontrol/cartcontrol';
  import Detail from 'components/detail/detail';
  export default {
    props: {
        /* seller: {
          type: Array
        } */
    },
  	data () {
  		return {
        // items: [],
        goods: [], // 这里不定义就会报错
        seller: [],
        ListHeight: [], // 总区间的高度
        scrollY: 0, // 跟踪变量需要跟踪就放在data里面
        selectedFood: {} // data观测的数据不能与methods里面的方法重名 会给this访问到 要不然会覆盖
  		};
  	},
  	created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      axios.get('../data.json').then((res) => {
        this.goods = res.data.goods;
        this.seller = res.data.seller;
        // console.log(typeof(this.seller))
        // 计算产生滚动
        this.$nextTick(() => {
        // 渲染后才可以使用 这个是一个接口改变了DOM
        // 但是数据没有更新需要使用$nextTick才可以计算高度得到滚动效果
          this._initScroll(); // 调用
          // 左右联动
          this._calculateHeight(); // 计算高度相应位置高亮
        });
      });
	  },
    // 计算左侧索引
    computed: {
      currentIndex() { // 计算左侧索引
        for (let i = 0; i < this.ListHeight.length; i++) {
          let height1 = this.ListHeight[i]; // 当前索引值的高度高点
          let height2 = this.ListHeight[i + 1]; // 下一个索引值的高度 低点
          // 是>= 默认第一个是高亮向下的闭区间>=一开始就是o否则不会跟着滚动
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            /* this._followScroll(i); */
            return i; // 最后一个或者当前区间则返回索引
          }
        }
        return 0; // 否则返回0
      },
      // cartconcontrol修改的是food.count属性
      // 而food是父组件传入的对象而增加了count属性会影响到父组件
      // 计算属性观测的是goods变化拿到所有被选择过的foods购物车数据改变
      selectFoods() { 
        let foods = [];
        this.goods.forEach((good) => { // 首先遍历goods 拿到good
          good.foods.forEach((food) => { // 遍历foods 拿到food
            if (food.count) { // 判断food.count是否大于0 如果大于0 表示被选择过
              foods.push(food); // 把food push进去
            }
          });
        });
        // console.log(food) //无数据
        return foods; // 返回foods给selectFoods 在传给购物车组件
      }
    },
    methods: {
      // 同时开启2个动画比较卡 放在回调里面执行
      _drop(target) {
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target);
        });
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true, 
          // 这样才可以点击BScroll实现原理是监听star与end阻止了默认事件
          // 但是派发了2次点击事件 成PC端点击2次需要传$event         
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
          // 为1时非实时派发滚动事件为2时屏幕滑动为3的时候
          // 不仅在屏幕滑动的过程中而且在momentum滚动动画实时派发 
          // 是foodsScroll面设置的否则滚动时左边无高亮效果       
        });
        // 监听滚动位置scroll方法滚动的时候把实时位置暴露出来
        this.foodsScroll.on('scroll', (pos) => {
          if (pos.y <= 0) {
            this.scrollY = Math.abs(Math.round(pos.y));
            // Math.round转化为整数 Math.abs绝对值可能是负值转为正值  
          }
        });
      },
      // 传入event为解决区分是不是本身事件而在dom中传入的event的时候在pc端出现2次点击事件
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        // console.log(index);
        let foodsList = this.$refs.foodsWrapper;
        let el = foodsList[index];
        console.log(this.foodsList[index]);
        this.foodsScroll.scrollToElement(el, 300);
      },
      // 点击跳转到每个商品详情页面
      selectFood(food, event) { // 无问题
        if (!event._constructed) {
          return;
        }
          this.selectedFood = food;
          // 调用子组件detail.vue的show方法跳转到每个商品详情页面
          this.$refs.food.show();
          // console.log(this.food)
      },
      _calculateHeight() {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.ListHeight.push(height); // pust第一个的高度
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]; // 每一个的高度
          height += item.clientHeight;
          // clientHeight接口 对区间的统计可理解为内部可视区高度,样式的height+上下padding
          this.ListHeight.push(height);
        }
      },
      _followScroll(index) {
        let menuList = this.$refs.menuList;
        let el = menuList[index];
        this.menuScroll.scrollToElement(el, 300, 0, -100);
      }
    },
    components: {
      loading,
      Scroll,
      Icon,
      Shopcart,
      Cartcontrol,
      Detail
    },
    // carcontrol传过来的事件 父组件接收子组件事件
    events: {
      'cart.add'(target) {
        this._drop(target); // 定义方法处理target
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"

  .menu
    width: 100%
    height: 100%
    display: flex
    position: absolute
    top: 190px
    bottom: 56px
    //z-index: -21
    .menu-wrapper
      height: 490px
      width: 90px//不写这个 在安卓有兼容问题
      //min-height: 100%
      flex: 0 0 90px//等分 内容的缩放情况 占位宽度
      background: #f3f5f7
      color: #8b8b8b
      overflow: hidden
      .menu-item
        height: 54px
        //width: 80px
        display: table //一行或者多行垂直居中
        line-height: 14px
        padding: 0 12px//居中
        &.current
          position: relative
          z-index: 10
          margin-top: -1px//盖住
          background: #fff
          font-weight: 700
        .text
          //border-none()
          display: table-cell//格子
          width: 70px
          vertical-align: middle//垂直居中
          //border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
          .icon-wrapper
            display: inline-block
            vertical-align: top
    .foods-wrapper
      flex: 1
      overflow: hidden
      background: #fff
      height: 490px
      margin: 0//scroll滚动的时候 默认有margin:10 用这个清0
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dd1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 10px
        padding-bottom: 18px//描边不紧贴底部
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0//最后一个屋描边
        .icon
          flex: 0 0 57px//左右分栏布局
          margin-right: 10px
        .content
          flex: 1//左右分栏布局
          font-size: 0
          position: relative
          .name
            display: inline-block
            margin: 2px 0 8px 0
            font-size: 14px
            height: 14px
            line-height: 18px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            display: inline-block
            margin: 3px 0px 3px 3px
          .extra
            margin-top: 5px
            .count
              margin-right: 10px
          .price
            font-weight: 700
            line-height: 24px
            margin-top: 20px
            .now
              margin-right: 8px
              font-size: 14px 
              color: rgb(240, 20, 20) 
            .old
              text-decoration: line-through
              font-size: 10px 
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 0
            z-index: 300

</style> 