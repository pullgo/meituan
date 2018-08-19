<template>
  <div class="FoodHeader">
  <!--图标栏-->
    <div class="IconBox">
      <div class="fl foodheader-left">
        <router-link :to="{path:'/home'}">
          <span class="iconfont return icon-fanhui"></span>
        </router-link>
      </div>
      <div class="fr foodheader-right">
        <span class="iconfont icons icon-search"></span>
        <span class="iconfont icons icon-star1"></span>
        <span class="iconfont icons icon-gengduopintuan"></span>
        <span class="iconfont icons icon-gengduo"></span>
      </div>
    </div>
    <!--头像 店铺名称栏-->
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="name">{{seller.name}}</div>
        <div class="bulletin">{{seller.bulletin}}</div>
      </div>
    </div>
    <div class="icon-wrapper">
      <icon class="icons" :size="16" :class="classMap[seller.supports[0].type]"></icon>
      <span class="text">{{seller.supports[0].description}}</span>
      <!--共多少活动页面-->
      <div class="Nactivity"  @click="hideList" >
        <span>5个活动</span>
        <span class="iconfont icon-shangla list"></span>
      </div>
    </div>
    <!--模糊的背景层-->
    <div class="background">
      <img :src="seller.avatar" class="img">
    </div>
    <router-view></router-view>    
  </div>
</template>

<script type="text/ecmascript-6">

  import axios from 'axios'
  import Icon from 'base/Icon/icon'

  export default {
    data() {
      return {
        seller: [],
        listShow: false
      }
    },
    created() {
      axios.get('../data.json').then((res) => {
        this.seller = res.data.seller
      }),
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'] 
    },
    methods: {
      showList() {
        this.listShow = true
      },
      hideList() {
        this.listShow = false
      },
    },
    components: {
      Icon
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .FoodHeader
    width: 100%
    height: 130px
    margin-bottom: 20px
    margin-left: 15px
    .IconBox
      width: 100%
      height: 40px
      line-height: 40px
      .foodheader-left
        margin-left: 15px
      .foodheader-right
        margin-right: 25px
        .icons
          margin-right: 8px
    .content-wrapper
      padding: 20px 10px 10px 5px
      font-size: 0
      .avatar
        display: inline-block
        vertical-align: top
        width: 64px
      .content
        margin-left: 10px
        display: inline-block
        .name
          font-size: 16px
          color: #fffefb
          margin-bottom: 10px
        .bulletin
          font-size: 12px
          color: #5e6159
          width: 260px
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
    .icon-wrapper
      position: relative
      margin-bottom: 30px
      color: #343434
      .icons
        margin-bottom: 10px
      .text
        font-size: 10px
      .Nactivity
        display: inline-block
        position: absolute
        top: 0px
        right: 20px
        font-size: 10px
        .list
          display: inline-block
          //&.showList
            //transform-origin: center center
            //transform: rotate(180deg)
            //transition: tranform 0.2s
    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 130px
      z-index: -1
      filter: blur(14px)
      .img
        width: 100%
        height: 100%

</style> 