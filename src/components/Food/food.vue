<template>
  <div class="food">
    <FoodHeader></FoodHeader>    
    <div class="ttab">
      <span class="ttab-item">
        <router-link to="/home/food/menu">点菜</router-link>
      </span>
      <span class="ttab-item">
         <router-link to="/home/food/ratings">评价</router-link>
      </span>
      <span class="ttab-item">
         <router-link to="/home/food/seller">商家</router-link>
      </span>
      <div class="text">邀请拼单</div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
    <!--模糊的背景层-->
    <div class="background">
      <img :src="seller.avatar" class="img">
    </div>    
  </div>
</template>
<script type="text/ecmascript-6">
  import FoodHeader from 'components/food-header/food-header';
  import Icon from 'base/Icon/icon';
  import axios from 'axios';

  export default {
    data() {
      return {
        seller: []
      };
    },
    created() {
      axios.get('../data.json').then((res) => {
        this.seller = res.data.seller;
        // console.log(1)
      });
    },
    components: {
      FoodHeader,
      Icon
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  // @import "../../common/stylus/mixin"
  .food
    width: 100%
    height: 100%
    position: fixed
    top: 0
    left: 0
    background: #fff
    z-index: 110
    .ttab
      width: 100%
      height: 40px
      position: relative
      line-height: 40px
      border-1px(rgba(7, 17, 27, 0.1))
      margin-left: 20px
      margin-top: 40px
      padding-left: 10px
      .ttab-item
        display: inline-block
        width: 40px
        height: 40px
        margin-right: 30px
        text-align: center
        & > a
          display: block
          font-size: 14px
          color: rgb(77, 85, 93)
          &.active
            border-bottom: 4px solid #ffc95d
      .text
        position: absolute
        right: 38px
        bottom: 10px
        z-index: 10
        height: 24px
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        font-size: 10px
        border-radius: 12px
        color: #ffc95d
        border: 1px solid #ffc95d
    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 160px
      z-index: -1
      filter: blur(10px)
      .img
        width: 100%
        height: 100%

</style>