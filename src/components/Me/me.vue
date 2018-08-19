<template>
  <div class="me">
    <div id="fixedBar">
      <p class="my fl">我的</p>
      <div class="head_address fr">
        <router-link :to="{path:'/me/setting'}">
          <span class="iconfont setting icon-iconfonticonfontjixieqimo"></span>
        </router-link>
        <router-link :to="{path:'/me/mmassage'}">
          <span class="iconfont icon-xiaoxi massage"></span>
        </router-link> 
        <transition name="hide">
          <router-view></router-view>       
        </transition> 
      </div>
    </div>
    <!--头像部分-->
    <div class="avatar">
      <div class="avatar-content">
        <img src="./logo.jpg" class="logo" width="85" height="85"/>
        <div class="account-content">
          <div class="account">HWH21244458</div>
          <div class="information">个人信息<i class="iconfont icon-tubiao-"></i></div>
        </div>
      </div>
    </div>
    <!--收藏主题部分-->
    <div class="icon-wrapper">
      <div class="icon-content">
        <ul>
          <li class="iconList">
            <span  class="iconfont icon-shoucang icons"></span>
            <p class="text">我的收藏</p>
          </li>
          <li class="iconList">
            <span  class="iconfont icon-tubiaolunkuo- icons"></span>
            <p class="text">我的足迹</p>
          </li>
          <li class="iconList">
            <span  class="iconfont icon-iconfontevaluate icons"></span>
            <p class="text">我的评价</p>
          </li>
          <li class="iconList">
            <span  class="iconfont icon-haoyou icons"></span>
            <p class="text">我的好友</p>
          </li>
          <li class="iconList">
            <span  class="iconfont icon-ganxie icons"></span>
            <p class="text">答谢记录</p>
          </li>
          <li class="iconList">
            <span  class="iconfont icon-ziyuan icons"></span>
            <p class="text">我的地址</p>
          </li>
        </ul>
      </div>
    </div>
    <!--中间图片轮播部分-->
    <div class="img-content">
      <span  class="iconfont icon-taocan icons"></span>
      <span class="information">红包来袭！5折抢30元红包套餐</span>
      <span class="iconfont next icon-tubiao-"></span>
    </div>
    <!--我的资产部分-->
    <div class="asset">
      <div class="classify border-1px">
        <p class="title">我的资产</p>
      </div>
      <div class="icon-wrapper1">
        <ul>
          <li class="iconList1">
            <span  class="iconfont icon-hongbao icons1"></span>
            <p class="text1">红包</p>
          </li>
          <li class="iconList1">
            <span  class="iconfont icon-wodedaijinquan icons1"></span>
            <p class="text1">代金券</p>
          </li>
          <li class="iconList1">
            <span  class="iconfont icon-iconfontevaluate icons1"></span>
            <p class="text1">我的钱包</p>
          </li>
          <li class="iconList1">
            <span  class="iconfont icon-jinqian icons1"></span>
            <p class="text1">金额</p>
          </li>
        </ul>
      </div>
      </div>    
    <!--我的服务部分-->
    <div class="serve">
      <classify title="我的服务"></classify>
      <div class="icon-wrapper2">
        <ul>
          <li class="iconList2">
            <span  class="iconfont icon-bangzhu icons2"></span>
            <p class="text2">帮助与反馈</p>
          </li>
          <li class="iconList2">
            <span  class="iconfont icon-kefuzhongxin icons2"></span>
            <p class="text2">客服中心</p>
          </li>
        </ul>
      </div>
    </div>
    <!--更多推荐部分-->
    <div class="recommend">
      <classify title="更多推荐"></classify>
      <div class="icon-wrapper3">
        <ul>
          <li class="iconList3">
            <span  class="iconfont icon-youjiang icons3"></span>
            <p class="text3">邀请有奖</p>
          </li>
          <li class="iconList3">
            <span  class="iconfont icon-shangjia icons3"></span>
            <p class="text3">商家入驻</p>
          </li>
          <li class="iconList3">
            <span  class="iconfont icon-wentiqishouwenti icons3"></span>
            <p class="text3">骑手招募</p>
          </li>
          <li class="iconList3">
            <span  class="iconfont icon-hezuo icons3"></span>
            <p class="text3">我要合作</p>
          </li>
          <li class="iconList3">
            <span  class="iconfont icon-huanbao icons3"></span>
            <p class="text3">环保挑战</p>
          </li>
        </ul>
      </div>
    </div> 
  </div>
</template>

<script type="text/ecmascript-6">
  import Classify from 'base/Classify/classify'
  import Scroll from 'base/Scroll/scroll'

  export default {
    data() {
      return {
      }
    },
    mounted () {
    },
    methods: {
    },
    components: {
      Classify
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin"
.me
  position: relative
  width: 100%
  height: 100%
  border-bottom: 10px solid #ededed
  font-size: 14px
  color: #383838
  background: #fff
  #fixedBar
    position: fixed
    top: 0px 
    left: 0px
    padding: 5px 10px 5px 20px
    height: 40px
    width: 100%
    background: #ffc847
    line-height: 40px
    .my
      font-size: 16px
    .head_address
      width: 90px
      .setting
        margin-right: 12px
        font-size: 18px
      .massage
        margin-right: 12px
        font-size: 18px
      .hide-enter-active, .hide-leave-active 
        transition: opacity .5s
      .hide-enter, .hide-leave-active
        opacity: 0
  .avatar
    display: flex
    height: 84px
    background: #ffc847
    padding-bottom: 10px
    padding-top: 60px
    border-bottom: 10px solid #ededed
    .avatar-content
      margin-left: 20px
      width: 85px
      display: inline-block
      display: flex
      flex: 1
      .logo
        border-radius: 50%
      .account-content
        display: inline-block
        line-height: 20px
        color: #2b3432
        margin-left: 12px
        margin-top: 25px
        flex: 1
        .account
          font-size: 16px
  .icon-wrapper
    width :100%
    height: 100%
    border-bottom: 10px solid #ededed
    .icon-content
      padding: 0px 10px 12px 10px
      .iconList
        display: inline-block
        flex: 1
        height: 70px
        width: 70px
        margin-right: 15px
        flex-direction: column
        align-items: center
        .icons
          display: flex
          flex-direction: column
          align-items: center
          font-size: 30px
          margin-top: 16px
          color: #ffe593
        .text
          display: flex
          flex-direction: column
          align-items: center
          margin-top: 10px
          line-height: 20px
  .img-content
    height: 92px
    border-bottom: 10px solid #ededed
    color: #8d5d41
    text-align: center
    line-height: 92px
    .icons
      font-size: 40px
      color: #ff4f33
    .information
      margin-left: 10px
      font-size: 16px
    .next
      font-size: 16px
      margin-left: 30px
  .asset
    height: 100%
    width: 100%
    .classify
      height: 40px
      border-1px(rgba(7, 17, 27, 0.1))
      .title
        margin-left: 20px
        color: #383838
        font-size: 16px
        line-height: 40px
    .icon-wrapper1
      line-height: 20px
      border-bottom: 10px solid #ededed
      .iconList1
        display: inline-block
        flex: 1
        height: 70px
        width: 70px
        margin-top: 16px
        margin-right: 15px
        .icons1
          display: flex
          flex-direction: column
          align-items: center
          font-size: 26px
          color: #7d7d7d
        .text1
          margin-top: 10px
          display: flex
          flex-direction: column
          align-items: center
  .serve
    height: 100%
    width: 100%
    .icon-wrapper2
      line-height: 20px
      border-bottom: 10px solid #ededed
      padding: 0px 10px 12px 20px
      display: flex
      .iconList2
        display: inline-block
        width: 70px
        margin-right: 15px
        margin-top: 16px
        flex: 1
        .icons2
          display: flex
          flex-direction: column
          align-items: center
          font-size: 30px
          color: #7d7d7d
        .text2
          display: flex
          flex-direction: column
          align-items: center
          margin-top: 10px
  .recommend
    height: 100%
    width: 100%
    .icon-wrapper3
      line-height: 20px
      border-bottom: 10px solid #ededed
      padding: 0px 10px 42px 20px//下的padding加上tab的高度 否则内容会被盖住
      display: flex
      justify-content: center
      align-items: center
      .iconList3
        display: inline-block
        flex: 1
        width: 70px
        margin-right: 13px
        margin-top: 16px
        .icons3
          display: flex
          flex-direction: column
          align-items: center
          font-size: 30px
          color: #7d7d7d
        .text3
          display: flex
          flex-direction: column
          align-items: center
          margin-top: 10px
</style> 