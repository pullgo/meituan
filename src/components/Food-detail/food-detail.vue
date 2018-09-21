<template><!--点击跳到单个商品页面-->

    <div class="FoodDetail" ref="food">
      <div class="detail-content">
        <div class="icon-wrapper"></div>
        <div class="image-wrapper"></div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">{{food.sellCount}}</span>
            <span class="rating">{{food.rating}}</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span><span class="old">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <Cartcontrol></Cartcontrol>
          </div>
          <div class="buy">加入购物车</div>
        </div>
        <div class="ratings"></div>
      </div>
    </div>

</template>

<script type="text/ecmascript-6">

  import Cartcontrol from 'components/Cartcontrol/cartcontrol'
  import axios from 'axios'

  export default {
    propos: {
      goods: {
        type: Object
      }
    },
    data() {
      return {
      }
    },
    created() {
      axios.get('../data.json').then((res) => {
        this.goods = res.data.goods
        //console.log(this.goods[0].foods[0].name)
      })
    },
    components: {
      Cartcontrol
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">


  .FoodDetail
    position: fixed//屏幕定位
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: #fff


</style>