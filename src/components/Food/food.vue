<template>
  <div class="food">
    <FoodHeader></FoodHeader>
    <!--活动页面-->
    <!--<transition class="fold">
      <div  class="activity">
        <!--隐藏活动页面
        <div class="icon-wrapper">
          <ul>
            <li v-for="(item, index) in seller.supports">
            <icon class="icons" :size="16" :class="classMap[seller.supports[index].type]"></icon>
            <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
        </div>-->
        <!--印象
        <div class="info-wrapper">
          <p class="title">印象墙</p>
          <span class="text">服务好<span class="delimiter">∣</span></span>
          <span class="text">包装好</span>
        </div>
        <div class="info-wrapper">
          <p class="title">配送</p>
          <div>
            <span class="text">{{seller.description}}<span class="delimiter">∣</span></span>
            <span class="text">配送费<span class="monery">¥</span>{{seller.deliveryPrice}}<span class="delimiter">∣</span></span>
            <span class="text">{{seller.deliveryTime}}分钟</span>
            <span class="ttext">配送时间：00:00-01:00,09:00-23:59</span>
          </div>
        </div>    
        <div class="info-wrapper">
          <p class="title">公告</p>
          <div>
            <span class="text">所有美好的记忆和爱都应该被珍藏，用心为你。</span>
          </div>
        </div>-->
        <!--印象
        <div class="pullUp">
          <span class="iconfont icon-shangla-yuan pullUpIcon"></span>
        </div>    
      </div>
    </transition>-->
    <div class="ttab border-1px">

      <div class="ttab-item">
        <router-link to="/home/food/menu">点菜</router-link>
      </div>

      <div class="ttab-item">
         <router-link to="/home/food/ratings">评价</router-link>
      </div>

      <div class="ttab-item">
         <router-link to="/home/food/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import FoodHeader from 'components/food-header/food-header'
  import Icon from 'base/Icon/icon'
  import axios from 'axios'

  export default {
    data() {
      return {
        seller: []
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'] 
      axios.get('../data.json').then((res) => {
        this.seller = res.data.seller
        //console.log(1)
      })
    },
    components: {
      FoodHeader,
      Icon
    },
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin"

  .food
    width: 100%
    height: 100%
    position: absolute
    top: 0
    left: 0
    background: #fff
    z-index: 110
    .activity
      padding: 2px
      //height: 20px
      //overflow: hidden
      margin-bottom: 30px
      margin-left: 15px
      height: 300px
      .icon-wrapper
        //position: relative
        margin-bottom: 30px
        color: #343434
        .icons
          margin-bottom: 10px
        .text
          font-size: 10px
      .info-wrapper
        margin-bottom: 30px
        .title
          font-size: 16px
          color: #373737
          margin-bottom: 5px
        .text
          font-size: 12px
          color: #7d7d7d
          margin-bottom: 5px
          .monery
            margin-left: 3px
            margin-right: 3px
          .delimiter
            margin-left: 3px
            margin-right: 3px        
        .ttext
          display: block
          font-size: 12px
          color: #7d7d7d
          margin-top: 5px
      .pullUp
        text-aglin: center
        position: relative
        .pullUpIcon
          font-size: 24px
          position: absolute
          left: 50%
          transform: translateX(-50%)
          color: #343434
    .ttab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7, 17, 27, 0.1))
      .ttab-item
        flex: 1
        text-align: center
        & > a
          display: block
          font-size: 14px
          color: rgb(77, 85, 93)
          &.active
            color: rgb(240, 20, 20)


</style> 