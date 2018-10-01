<template>
  <div class="cartcontrol">
    <!--减-->
    <!--阻止点击冒泡.stop.prevent-->
    <transition class="move">
     <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
        <!--滚动层-->
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <!--数字-->
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <!--加-->
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">

  import Vue from 'vue'

  export default {
    props: {
      food: {//父辈传入food
        type: Object
      } 
    },
    methods: {
      //+的实现
      addCart(event) {
        if(!event._constructed) {//不是bscroll派发点击事件
          return;
        }
        //console.log('click');点击无效果
        //第一次点击赋值为1

        if(!this.food.count) {

        //点击+的时候-那边无法更新 无法关注到新添加的属性 需要全局使用vue 和set方法 这样就可以观测到dom发生的变化
          Vue.set(that.food,'count', 1); 
          that.food.count = 1;
        }else{
          that.food.count++;
        //console.log(this.food.count)
        }
        //如何找到+-所在俄位置 需要用下代码派发事件 在在good  events接收子组件传入的方法 event.target作为参数传入

        this.$emit('cart.add', event.target);
      },
      //-的时候 需要传入event 否则就没有效果
      decreaseCart(event) {
        if(!event._constructed) {
          return;
        }
        if(this.food.count) {
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
      display: inline-block//横向排列 用了inline-block 父需要加font0
      padding: 6px//扩大点击区域
      //font-size: 24px
      color: rgb(0, 160, 260)
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
      line-height: 30px
      font-size: 24px
      color: rgb(0, 160, 220)

</style>