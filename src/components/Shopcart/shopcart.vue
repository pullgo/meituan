<template>
<div>
  <div class="shopcart" ref="shopcart">
    <div class="shopcart-wrapper" @click="toggleList">
      <div class="wrapper-left">
        <div class="icon-wrapper" :class="{'highlight':totalCount>0}">
          <div class="logo">
            <i class="iconfont icon-gouwuchekong" :class="{'highlight':totalCount>0}"></i>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
        <div class="desc" :class="{'highlight':totalCount>0}">另需配送费￥{{deliveryPrice}}支持自取</div>
      </div>
      <div class="wrapper-right" @click.stop.prevent="pay">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>          
      </div>
      <!--购物车小球飞的效果-->
      <div class="ball-container">
        <div v-for="ball in balls">
          <transition name="drop"  @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
      <!--购物车详情页 -->   
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <span class="list-title">1号口袋</span>
            <span class="empty" @click="empty">清空购物车</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <Cartcontrol :food="food" @click="addFood"></Cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" @click="hideList" v-show="listShow"></div>
    </transition>    
  </div>
</div>  
</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  import BScroll from 'better-scroll';
  import Cartcontrol from 'base/Cartcontrol/cartcontrol';

  export default {
    props: {
      selectFoods: {
        type: Array, // 为object/Array时default是个函数
        default() {
          return [
            { }
          ];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        seller: [],
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold: true // 默认列表是折叠的意思
      };
    },
    created() {
      axios.get('../data.json').then((res) => {
        this.seller = res.data.seller;
        // console.log(this.food)
      });
    },
    methods: {
      // 小球动画
      drop(el) {
        console.log(el); // 此处没有反应
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el; // 获取位置
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeDrop(el) { // 找到为true的小球
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
           // getBoundingClientRect浏览器接口 浏览器视口偏移
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32; // 正向值
            // innerHeight窗口的高度
            let y = -(window.innerHeight - rect.top - 22); // y是负值
            // 让其显示 在计算初始位置 外层做纵向动画 内层做横向动画
            el.style.display = ''; // 初始位置 先display '' 让其显示
            el.style.webkitTransform = `translate3d(0,${y}px,0)`; // 纵向动画
            el.style.transform = `translate3d(0,${y}px,0)`;// 横向动画
            let inner = el.getElementsByClassName('inner-hook')[0]; // inner-hook 表示用来选择的 没有正式的含义
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`; // 横向
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      // 小球进入的状态
      dropping(el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight; // 必须浏览器重构 在加注释
        this.$nextTick(() => { // 激活
          el.style.webkitTransform = 'translate3d(0,0,0)'; // 没有变量的时候 单纯字符串不要引号 报错的 需要用单引号
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done);
        });
      },
      afterDrop(el) {
        let ball = this.dropBalls.shift();
        if (ball) { // 重置状态 再次利用
          ball.show = false;
          el.style.display = 'none';
        }
      },
      pay() {
        if (this.totalPrice < this.minPrice) {
          return;
        }
        window.alert(`支付￥{this.totalPrice}元`);
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      // 点击折叠与不折叠效果
      toggleList() {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      hideList() {
        this.fold = true;
      },
      addFood(target) {
        this.drop(target);
      }
    },
    computed: {
      totalPrice() { // 所选商品的价格
        let tolal = 0;
        this.selectFoods.forEach((food) => {
          tolal += food.price * food.count;
        });
        return tolal;
      },
      totalCount() { // 所选商品的总和
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      // 结算
      payClass() {
        if (this.totalPrice > this.minPrice) {
          return 'enough';
        } else {
          return 'not-enough';
        }
      },
      // 还差多少起送
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `￥${diff}元起送`;
        } else {
          return '去结算';
        }
      },
      // 折叠
      listShow() {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        // console.log(this.show)
        return show;
      }
    },
    components: {
      Cartcontrol
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .shopcart
    position: fixed
    bottom: 0px
    left: 0px
    width: 100%
    height: 58px
    z-index: 33
    .shopcart-wrapper
      background: #404040
      display: flex
      font-size: 0
      color: #9c9c9c
      .wrapper-left
        flex: 1
        //background: #9fa09c
        .icon-wrapper
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          background: #a8a8a8
          border-radius: 50%
          border-sizing: border-box
          &.highlight
            background: #ffc95d
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            padding-top: 10px
            color: rgb(255, 255, 255, 0.8)
            .icon-gouwuchekong
              font-size: 28px
              &.highlight
                color: #383838
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #fff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          position: absolute
          left: 90px
          top: 0px
          vertical-align: top
          margin-top: 17px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          //border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
            margin-top: 10px
        .desc
          display: inline-block
          position: absolute
          left: 120px
          top: 0px
          vertical-align: top
          margin: 17px 0 0 12px
          line-height: 24px
          font-size: 10px
          &.highlight
            margin-top: 0px
            position: absolute
            left: 80px
            top: 30px
      .wrapper-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 58px
          line-height: 58px
          text-align: center
          font-size: 15px
          font-weight: 700
          border-left: 1px solid rgba(255, 255, 255, 0.1)
          &.not-enough//wei达到结算金额时  右侧颜色变化
            background: #404040
            color: #9c9c9c
          &.enough
            background: #ffc95d
            color: #383838
    .ball-container
      .ball
        position: fixed//相对于视口动画
        left: 32px
        bottom: 22px
        z-index: 200
        //all 0.4s晃动效果无抛物线效果需要使用cubic-bezier.com贝塞尔曲线
        &.drop-transtion//bug 少了这行
          transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
          .inner
            width: 16px
            height: 16px
            border-radius: 50%
            background: rgb(0, 160, 220)
            transition: all 0.4s linear//   linear X 线性效果 不需要晃动
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform: translate3d(0, -100%, 0)//宽度不会被无限撑高
      &.fold-enter-active, &.fold-leave-active
        transition: all 0.5s
      &.fold-enter, &.fold-leave-active
        transform: translate3d(0, 0, 0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .list-title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)
      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px
  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: -2
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-active
      opacity: 0
      background: rgba(7, 17, 27, 0)

</style> 