<template>
  <div class="home">
    <!--头部开始-->
    <div class="head">
      <div class="head_address">
        <i class="iconfont icon-ziyuan address_icon"></i>
        <span class="address">日立汽车系统(广州)有限公司(...</span>
        <span class="iconfont icon-xiaoxi fr" @click="showDetail"></span>
      </div>
      <div class="search">
        <input type="text" class="input" placeholder="请输入商家或商品名称">
        <span class="iconfont icon-search icon"></span>
      </div>
      <!--<form method="get">
        <fieldset class="search clearfix">
          <button class="btn fl"></button>
          <input type="text" class="box fr" placeholder="请输入商家或商品名称">
        </fieldset>
      </form>-->
    </div>
    <!--messages打开页面-->
    <transition class="hide">
      <div class="messages-wrapper" v-show="detailShow">
        <div class="messages-header">
          <span class="iconfont return icon-fanhui" @click="hideDetail"></span>
          <span class="title">消息中心</span>
        </div>
        <div class="messages-content">
          <ul>
            <li v-for="mess in messages" class="mess">
              <img class="img" :src="mess.image" width="70" height="70">
              <span class="text">{{mess.title}}</span>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <!--背景图片随轮播图切换-->
    <!--<div class="background" >
      <img :src="recommends.picUrl" width="100%" height="100%"/>
    </div>-->
    <!--头部end-->
    <!--轮播图组件开始-->
    <scroll ref="scroll" class="slider-content">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div v-for="item in recommends">
              <a :href="item.linkUrl">
                <img :src="item.picUrl"/>
              </a>
            </div>
          </slider>
        </div>
      </div>
    </scroll>      
    <!--轮播图组件end-->
    <!--菜单切换组件start-->
    <swich></swich>
    <!--菜单切换组件end-->
    <!--优惠专区start-->
    <div class="FavorableZone">
      <h1 class="h1">优惠专区</h1>
      <div class="specialPic">
        <div class="specialPic-fl">
          <p class="text1">天天特价</p>
          <p class="text2">周三半价日</p>
          <p class="text3">疯抢仅一天</p>
        </div>
        <div  class="specialPic-fr">
          <p class="text1">餐餐优惠</p>
          <p class="text2">汇聚午时</p>
          <p class="text3">套餐19.9</p>
        </div>
      </div>
      <div class="sellPic">
        <ul class="clearfix">
          <li class="fl">
            <img src="../../common/image/sellPic4.png" width="78" height="98px">
          </li>
          <li class="fl">
            <img src="../../common/image/sellPic4.png" width="78" height="98px">
          </li>
          <li class="fl">
            <img src="../../common/image/sellPic4.png" width="78" height="98px">
          </li>
          <li class="fl">
            <img src="../../common/image/sellPic4.png" width="78" height="98px">
          </li>
        </ul>
      </div>
    </div>
    <!--优惠专区end-->
    <!--为你优选start -->  
    <div class="FavorableZone1">
      <h1 class="h1">为你优选</h1>
      <div class="specialPic1">
        <div class="specialPic1-fl">
          <div class="background"></div>
          <div class="text-content">
            <p class="text-content1">优选菜品</p>
            <p class="text-content2">为你选择最好的</p>
          </div>
        </div>
        <div  class="specialPic1-fr" >
          <div class="background"></div>
          <div class="text-content">
            <p class="text-content1">品质单人餐</p>
            <p class="text-content2">精心搭配套餐</p>
          </div>
        </div>
      </div>
    </div>
    <!--为你优选end--> 
    <!--商家start--> 
    <h1 class="h1">附近商家</h1>
    <div class="sell-title clearfix">
      <select name="select" class="select fl">
        <option class="option" value="综合排序" selected>综合排序</option>
        <option class="option" value="速度最快">速度最快</option>
        <option class="option" value="评分最高">评分最高</option>
        <option class="option" value="起送价最低">起送价最低</option>
        <option class="option"  value="配送费最低">配送费最低</option>
        <option class="option"  value="人均高到低">人均高到低</option>
        <option class="option"  value="人均低到高">人均低到高</option>
      </select>
      <div class="list1">
        <span>销量最高</span>
      </div> 
      <div class="list2">
        <span>离我最近</span>
      </div> 
      <div class="list3">
        <span>筛选</span>
        <i class="iconfont icon-shaixuan i" width="15" height="15"></i>
      </div>
    </div>
    <goods></goods>
    <!--商家end--> 
    <!--购物车start-->
    <touch>
      <div class="shopcart">
        <span class="iconfont icon-gouwucheman icon"></span>
        <span class="num" v-show="totalCount>0">{{totalCount}}</span>
      </div>
    </touch>
    <!--购物车end-->
  </div>
</template>

<script type="text/ecmascript-6">

  import Slider from 'base/Slider/Slider'
  import Scroll from 'base/Scroll/scroll'
  import axios from 'axios'
  import Swich from 'components/Swich/Swich'
  import Goods from 'components/goods/goods'
  import Touch from 'base/Touch/touch'

  export default {
    props: {
      slider: {
        type: Object
      }
    },
    data() {
      return {
        recommends: [],
        detailShow: false
      }
    },
    //购物车有商品的时候
    computd: {
      totalCount() {
        let count = 0;
 
      }
    },
    methods: {
      showDetail() {
        this.detailShow = true
      },
      hideDetail() {
        this.detailShow = false
      }
    },
    created() {
      axios.get('../data.json').then((res) => {
        this.recommends = res.data.slider
        this.messages = res.data.messages
        //console.log(this.messages)
      })
    },
    components: {
      Slider,
      Scroll,
      Swich,
      goods,
      Touch
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
//@import "../../common/stylus/mixin"
.home
  position: relative
  //background: #fff
  .head
    width: 100%
    height: 70px
    position: relative
    background: #ffc847
    .head_address
      padding: 10px
    .search
      position: relative
      text-aglin: center
      .input
        width: 88%
        height: 30px
        padding-left: 25px
        margin-left: 10px
      .icon
        position: absolute
        top: 8px
        left: 15px
        width: 15px
        height: 15px
  /*.background
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: -1*/
  .FavorableZone
    width: 100% 
    padding-top: 10px
    .specialPic
      padding-top: 10px
      //width: 375px
      display: flex
      .specialPic-fl
        flex: 1
        width: 170px
        height: 120px
        margin-right: 10px
        margin-left: 10px
        background: url(special1.png) no-repeat
        background-size: 100% 100%
        .text1
          width: 60px
          height: 14px
          background: #fc84ac
          font-size: 10px
          color: #fff
          padding: 2px
          text-align: center
          border-bottom-right-radius: 10px
        .text2
          width: 80px
          height: 20px
          background: #888585
          margin-top: 20px
          font-size: 14px
          color: #fff
          padding: 2px
          text-align: center
        .text3
          width: 60px
          height: 12px
          background: #e8d162
          font-size: 6px
          color: #1f1e1e
          padding: 2px
          text-align: center
      .specialPic-fr
        flex: 1
        width: 170px
        height: 120px
        margin-right: 10px
        background: url(special2.png) no-repeat
        background-size: 100% 100%
        .text1
          width: 64px
          height: 14px
          line-height: 14px
          background: #fc84ac
          font-size: 10px
          color: #fff
          padding: 2px
          text-align: center
          border-bottom-right-radius: 10px
        .text2
          width: 80px
          height: 20px
          line-height: 20px
          background: #888585
          margin-top: 20px
          font-size: 14px
          color: #fff
          padding: 2px
          text-align: center
        .text3
          width: 60px
          height: 12px
          line-height: 12px
          background: #e8d162
          font-size: 6px
          color: #1f1e1e
          padding: 2px
          text-align: center
  .FavorableZone1
    width: 100% 
    z-index: -2
    .specialPic1
      padding-top: 10px
      //width: 375px
      display: flex
      padding: 10px
      .specialPic1-fl
        flex: 1
        width: 170px
        height: 120px
        margin-right: 10px
        background: url(special1.png) no-repeat
        background-size: 100% 100%
        position: relative
        .background
          width: 100%
          height: 100%       
          background: rgba(0, 0, 0, 0.5)
        .text-content
          width: 100px
          height: 50px
          background: #fff
          position: absolute
          top: 50%
          left: 20%
          .text-content1
            color: #1f1e1e
            line-haight: 16px
            font-size: 16px
            text-align: center
            margin-top: 5px
            font-weight: bold
          .text-content2
            color: #1f1e1e
            line-haight: 12px
            font-size: 10px
            text-align: center
            margin-top: 10px
      .specialPic1-fr
        flex: 1
        width: 170px
        height: 120px
        margin-left: 10px
        background: url(special2.png) no-repeat
        background-size: 100% 100%
        position: relative
        .background
          width: 100%
          height: 100%        
          background: rgba(0, 0, 0, 0.5)
        .text-content
          width: 100px
          height: 50px
          background: #fff
          position: absolute
          top: 50%
          left: 20%
          .text-content1
            color: #1f1e1e
            line-haight: 16px
            font-size: 16px
            text-align: center
            font-weight: bold
            margin-top: 5px
          .text-content2
            color: #1f1e1e
            line-haight: 12px
            font-size: 10px
            text-align: center
            margin-top: 10px
  .sellPic
    width: 100%
    padding: 10px
    ul li
      width: 78px
      margin-right: 13px
  .sell-title
    width: 100%
    margin-left: 10px
    height: 20px
    line-height: 20px 
    display: flex
    margin-top: 10px
    .select
      flex: 1
      border: none
      margin-right: 15px
      height: 20px
      line-height: 20px 
    .list1
      flex: 1
      font-size: 12px
      line-height: 20px
      height: 20px
      margin-right: 15px
    .list2
      flex: 1
      font-size: 12px
      line-height: 20px
      margin-right: 15px
      height: 20px
      border-right: 1px solid #ccc
    .list3
      flex: 1
      font-size: 12px
      height: 20px
      line-height: 20px
  .messages-wrapper
    width: 100%
    height: 100%
    background: #f6f6f6
    position: absolute
    top: 0px
    left: 0px
    z-index: 10
    .hide-enter-active, .hide-leave-active
      transition: opacity 10s
    .hide-enter, .hide-leave-to       
      opacity: 0
    /*&.hide-enter-active 
      transition: all .3s ease
    &.hide-leave-active 
      transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)
    &.hide-enter, .hide-leave-to
      transform: translateX(10px)
      opacity: 0*/
    .messages-header
      background: #f6f6f6
      border-bottom: 1px solid #ededed
      height: 76px
      width: 100%
      box-sizing: border-box
      .return
        float: left
        text-align: left
        margin-left: 14px
        margin-top: 20px
        color: #727272
        font-size: 25px
        padding: 6px
      .title
        display: flex
        font-size: 20px
        color: #3c3c3c
        //align-items: center
        justify-content: center
        line-height: 76px
    .messages-content
      background: #ffffff
      text-align: left
      padding-left: 20px
      .mess
        height: 112px
        width: 100%
        border-bottom: 1px solid #ededed
        box-sizing: border-box
        .img
          margin-top: 22px
          margin-bottom: 22px
          vertical-align: middle
        .text
          margin-left: 18px
          color: #050505
  .shopcart
    position: fixed
    bottom: 68px
    right: 20px
    border-radius: 50%
    border: 1px solid #727272
    width: 28px
    height: 28px
    padding: 6px
    .icon
      position: relative
      top: 5px
      left: 5px
</style> 