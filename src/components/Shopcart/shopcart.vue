<template>
  <div class="shopcart">
    <div class="shopcart-wrapper">
      <div class="wrapper-left">
        <div class="icon-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <i class="iconfont icon-gouwuchekong" :class="{'highlight':totalCount>0}"></i>
          </div>
          <div class="num">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{seller.deliveryPrice}}</div>
      </div>
      <div class="wrapper-right"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  
  export default {
    props: {
      selectFoods: {
        type: Array,//为object/Array时default是个函数
        default() {
          return [
            {
              price: 10,
              count: 1
            }
          ];
        }
      },
    },
    data() {
      return {
        seller: []
      }
    },
    created() {
      axios.get('../data.json').then((res) => {
        this.seller = res.data.seller
        //console.log(this.seller.deliveryPrice)
      })
    },
    methods: {

    },
    computed: {
      totalPrice() {//所选商品的价格
        let tolal = 0;
        this.selectFoods.forEach((food) => {
          tolal += food.price * food.count;
        });
        return tolal;
      },
      totalCount() {//所选商品的总和
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count
      }
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position: fixed
    bottom: 0px
    left: 0px
    width: 100%
    height: 58px
    z-index: 156
    .shopcart-wrapper
      background: #141d27
      display: flex
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .wrapper-left
        flex: 1
        .icon-wrapper
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          background: #141d27
          border-radius: 50%
          border-sizing: border-box
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: rgb(0, 160, 220)
            .icon-gouwuchekong
              font-size: 28px
              &.highlight
                color: #fff
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
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
          color: #fff
      .wrapper-right
        flex: 0 0 105px
</style> 