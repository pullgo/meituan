<template>
  <div class="cartcontrol">
    <!--减-->
    <!--阻止点击冒泡.stop.prevent-->
    <transition class="move">
     <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
        <!--滚动层-->
        <span class="inner iconfont icon-53"></span>
      </div>
    </transition>
    <!--数字-->
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <!--加-->
    <div class="cart-add iconfont icon-jia1" @click.stop.prevent="addCart"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    props: { // 父辈传入food
      food: {}
    },
    watch: {
      food(v1) {
        // console.log(v1);
      }
    },
    methods: {
      // +的实现
      addCart(event) {
        // 首次点击无效 需要在初始化scroll的时候设置click: true 随后点击出现2次 需要传入event 对象和event._constructed判断
        // console.log('click'); 2次
        if (!event._constructed) {
          return;
        }
        // console.log('click'); // 一次
        // console.log(this.food.count);
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count ++;
        }
        // 往购物车添加商品时 派发事件 将event.target dom对象作为参数传给购物车组件 在父组件menu里面定义event事件 接收cart.add事件 参数为target
        this.$emit('add', event.target);
      },
      decreaseCart(event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease
      //横向排列用了inline-block空隙 父需要加font:0
      display: inline-block
      padding: 6px//扩大点击区域
      font-size: 24px
      color: #ffc95d
      transform: translate3d(0, 0, 0)//3D可以开起硬件加速 更加流畅
      .inner
        display: inline-block//否则动画做不起来 否则没有宽高 高度为0
        line-height: 24px
        font-size: 24px
        color: rgba(0, 160, 220, 0.5)
        transition: all 3s linear
        transfrom: rotate(0)
      &.move-enter-active, &.move-leave-active
        opacity: 1
        transition: all 3s linear
      &.move-enter, &.move-leave-active// 移除动画和开始动画
        opacity: 0
        transform: translate3d(30px, 0, 0)//x轴滚过去
        .inner
          transfrom: rotate(180dg)    
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)       
    .cart-add
      display: inline-block//横向排列 用了inline-block 父需要加font0
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: #ffc95d

</style>