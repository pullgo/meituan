<template>
  <div class="me">
    <div class="me-wrapper">
      <div id="fixedBar">
        <p class="my fl">我的</p>
        <div class="head_address fr">
          <span class="iconfont setting icon-iconfonticonfontjixieqimo" @click="toSetting"></span>
          <span class="iconfont icon-xiaoxi massage" @click="toMassage"></span>
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
      <div class="icon-wrapper" :data="lists">
        <div class="icon-content">
          <ul>
            <li class="iconList" v-for="list in lists">
              <span  class="iconfont icons">{{list.icon}}</span>
              <p class="text">{{list.text}}</p>
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
      <!--我的资产/我的服务/更多推荐-->
      <marginItem :data='items'></marginItem>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import marginItem from 'base/margin-item/margin-item';
  import Scroll from 'base/Scroll/scroll';

  export default {
    data() {
      return {
        items: [
          {
            'title': '我的资产',
            children: [
              {
                icon: '\ue62b',
                text: '红包'
              },
              {
                icon: '\ue668',
                text: '代金券'
              },
              {
                icon: '\ue60e',
                text: '我的钱包'
              },
              {
                icon: '\ue651',
                text: '金额'
              }
            ]
          },
          {
            'title': '我的服务',
            children: [
              {
                icon: '\ue609',
                text: '帮助反馈'
              },
              {
                icon: '\ue706',
                text: '邀请有奖'
              },
              {
                icon: '\ue63b',
                text: '我要合作'
              },
              {
                icon: '\ue601',
                text: '客服中心'
              }
            ]
          },
          {
            'title': '更多推荐',
            children: [
              {
                icon: '\ue6c7',
                text: '商家入驻'
              },
              {
                icon: '\ue68d',
                text: '骑手招募'
              },
              {
                icon: '\ue63b',
                text: '我要合作'
              },
              {
                icon: '\ue608',
                text: '环保挑战'
              }
            ]
          }
        ],
        lists: [
          {
            icon: '\ue648',
            text: '我的收藏'
          },
          {
            icon: '\ue60f',
            text: '我的足迹'
          },
          {
            icon: '\ue621',
            text: '我的评价'
          },
          {
            icon: '\ue625',
            text: '我的好友'
          },
          {
            icon: '\ue6e5',
            text: '答谢记录'
          },
          {
            icon: '\ue63c',
            text: '我的地址'
          }
        ]
      };
    },
    methods: {
      toMassage() {
        this.$router.push('/me/massage');
      },
      toSetting() {
        this.$router.push('/me/setting');
      }
    },
    components: {
      marginItem
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin"
.me
  position: relative
  width: 100%
  height: 100%
  border-bottom: 10px solid #f3f5f7
  font-size: 14px
  color: #383838
  background: #fff
  .me-wrapper
    // margin: 10px
    overflow: hidden
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
      border-bottom: 10px solid #f3f5f7
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
      border-bottom: 10px solid #f3f5f7
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
      border-bottom: 10px solid #f3f5f7
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
</style> 