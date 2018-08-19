<template>
  <div class="massage">
    <!--massage打开页面-->
    <div class="massage-wrapper">
      <div class="massage-header">
        <router-link :to="{path:'/home'}">
          <span class="iconfont return icon-fanhui"></span>
        </router-link>
        <router-view></router-view>
        <span class="title">消息中心</span>
      </div>
      <div class="massage-content">
        <ul>
          <li v-for="mass in massages" class="mass">
            <img class="img" :src="mass.image" width="60" height="60">
            <span class="text">{{mass.title}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'

  export default {
    data() {
      return {
        massages: []
      }
    },
    created() {
      axios.get('../data.json').then((res) => {
        this.massages = res.data.massages
        //console.log(this.massages)
      })
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.massage
  height: 100%
  width: 100%
  .massage-wrapper
    width: 100%
    height: 100%
    z-index: 100
    background: #f6f6f6
    overflow-y: auto
    position: fixed//如果不用这个定位则会出现滚动无限制情况
    top: 0px
    left: 0px
    .massage-header
      background: #f6f6f6
      border-bottom: 1px solid #ededed
      height: 48px
      width: 100%
      box-sizing: border-box
      .return
        float: left
        text-align: left
        margin-left: 14px
        margin-top: 10px
        color: #727272
        font-size: 25px
        padding: 6px
      .title
        display: flex
        font-size: 18px
        color: #3c3c3c
        //align-items: center
        justify-content: center
        line-height: 48px
    .massage-content
      background: #ffffff
      text-align: left
      padding-left: 20px
      .mass
        height: 80px
        width: 100%
        border-bottom: 1px solid #ededed
        box-sizing: border-box
        .img
          margin-top: 11px
          margin-bottom: 11px
          vertical-align: middle
        .text
          margin-left: 18px
          color: #050505

</style> 