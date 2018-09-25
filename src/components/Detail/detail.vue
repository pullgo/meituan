<template><!--点击跳到单个商品页面 v-show="showFlag-->
  <transition class="move">
    <div class="detail" v-show="showFlag">
      <div class="detail-content">
        <div class="icon-wrapper">
          <div class="fl foodheader-left">
            <span class="iconfont return icon-xiala"></span>
          </div>
          <div class="fr foodheader-right">
            <span class="iconfont icons icon-xiaoxi"></span>
            <span class="iconfont icons icon-fenxiang"></span>
            <span class="iconfont icons icon-gengduo"></span>
          </div>
        </div>
        <div class="image-wrapper">
          <img :src="goods[0].foods[0].image"/>
        </div>
        <div class="content">
          <h1 class="title">{{goods[0].foods[0].name}}</h1>
          <div class="detail-text">
            <span class="sell-count">月售{{goods[0].foods[0].sellCount}}</span>
            <span class="rating">好评度{{goods[0].foods[0].rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{goods[0].foods[0].price}}</span><span v-show="goods[0].foods[0].oldPrice" class="old">￥{{goods[0].foods[0].oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <Cartcontrol :food="food"></Cartcontrol>
          </div>
          <div  class="buy">加入购物车</div>
        </div>
        <div class="ratings"></div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">

  import Cartcontrol from 'components/Cartcontrol/cartcontrol'
  import axios from 'axios'
  import Vue from 'vue'

  export default {
    propos: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        goods: '',
        foods: '',
        showFlag: false
      };
    },
    created() {
      axios.get('../data.json').then((res) => {
        this.goods = res.data.goods
        //console.log(this.goods[0].foods[0].name)
      })
    },
    methods: {
      show() {
        this.showFlag = true;
      }
      /*addFrist(event) {
        if(!event._constructed) {
          return
        }
        Vue.set(this.food, 'count', 1);
      }*/
    },
    components: {
      Cartcontrol
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">


  .detail
    position: fixed//屏幕定位
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: #fff
    &.move-transtion//最终状态
      transition: all 0.2s linear//晃动为线性移动
      transform: translate3d(0, 0, 0)
    &.move-enter, &.move-leave//开始和离开的位置
      transform: translate3d(100%, 0, 0)//X轴平移100%
    .detail-content
      margin: 10px
      .icon-wrapper
        width: 100%
        height: 40px
        line-height: 40px
        .foodheader-left
          margin-left: 15px
        .foodheader-right
          margin-right: 25px
          .icons
            margin-right: 8px
      .image-wrapper
        border-radius: 10px
        img
          width: 100%
          height: 100%
          border-radius: 10px
      .content
        position: relative
        .title
          margin-bottom: 15px
          margin-top: 15px
          line-height: 14px
          font-size: 24px
          font-weight: 700
          color: rgb(7, 17, 27)
        .sell-count, .rating
          font-size: 10px
          color: rgb(147, 153, 159)
          line-height: 10px
        .sell-count
          margin-right: 12px
        .price
          font-weight: 700
          line-height: 24px
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
          right: 12px
          bottom: 12px
        .buy
          position: absolute
          right: 18px
          bottom: 18px
          z-index: 10
          height: 24px
          line-height: 24px
          padding: 0 12px
          box-sizing: border-box
          font-size: 10px
          border-radius: 12px
          color: #fff
          background: rgb(0, 160, 220)


</style>