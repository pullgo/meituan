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
        <span class="iconfont iconfonticons icon-search"></span>
        <span class="iconfont icons icon-star1"></span>
        <span class="iconfont icons icon-gengduopintuan"></span>
        <span class=" icons icon-gengduo"></span>
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

      <div class="icon-wrapper" v-if="seller.supports">
        <!--共多少活动页面-->
        <div class="Nactivity"  @click="toggleList"  v-show="!listShow">
          <icon class="icons" :size="16" :class="classMap[seller.supports[0].type]"></icon>
          <span class="text">{{seller.supports[0].description}}</span>
          <div class="listBox">
            <span>5个活动</span>
            <span class="iconfont icon-shangla list"></span>
          </div>
        </div>
        <!--活动页面-->
        <transition class="fold">
          <div class="activity" v-show="listShow">
            <!--隐藏活动页面-->
            <div class="icon-wrapper">
              <ul>
                <li v-for="(item, index) in seller.supports">
                <icon class="icons" :size="16" :class="classMap[seller.supports[index].type]"></icon>
                <span class="text">{{seller.supports[index].description}}</span>
                </li>
              </ul>
            </div>
            <!--印象-->
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
            </div>
            <!--印象-->
            <div class="pullUp">
              <span class="iconfont icon-shangla-yuan pullUpIcon" @click="hideList"></span>
            </div>    
          </div>
        </transition>
        <!--点击活动页面后面的遮罩层-->
        <div class="activityBg"></div>
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

  import axios from 'axios';
  import Icon from 'base/Icon/icon';

  export default {
    data() {
      return {
        seller: [],
        listShow: false
      };
    },
    created() {
      axios.get('../data.json').then((res) => {
        this.seller = res.data.seller;
      }),
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    methods: {
      toggleList(listShow) {
        this.listShow = true;
      },
      hideList(listShow){
        this.listShow = false;
      }
    },
    components: {
      Icon
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .FoodHeader
    width: 100%
    height: 130px
    margin-bottom: 20px
    //margin-left: 15px
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
      positive: relative
      font-size: 0
      //height: 80px
      margin-top: 20px
      background: rgba(255, 255, 255, 0.9)
      border-radius: 8px
      transform: scale(0.98)
      .avatar
        position: absolute
        right: 20px
        top: -20px
        display: inline-block
        width: 64px
        img
          border-radius: 3px
          float: right
      .content
        margin-left: 10px
        margin-top: 10px
        display: inline-block
        .name
          font-size: 18px
          //color: #fffefb
          margin-bottom: 10px
        .bulletin
          font-size: 12px
          color: #5e6159
          width: 260px
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
      .icon-wrapper
        margin-bottom: 30px
        color: #343434
        .Nactivity
          width: 100%
          display: inline-block
          margin-top: 10px
          font-size: 10px
          .icons
            margin: 0px 5px 0px 10px
          .text
            font-size: 10px
          .listBox
            float: right
            margin-right: 15px
            .list
              display: inline-block
              //&.showList
                //transform-origin: center center
                //transform: rotate(180deg)
                //transition: tranform 0.2s
        .activity
          //padding: 2px
          height: 20px
          //overflow: hidden
          padding-bottom: 30px
          margin-top: 15px
          height: 100%
          background: rgba(255, 255, 255, 0.9)
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
            padding-bottom: 20px
            margin-top: 162px
            .pullUpIcon
              font-size: 24px
              position: absolute
              left: 50%
              transform: translateX(-50%)
              color: #343434
        .activityBg
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 160px
          background: rgba(255, 255, 255, 0.9)
          z-index: -2          
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