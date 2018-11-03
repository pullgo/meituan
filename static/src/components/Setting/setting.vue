<template>
  <div class="setting">
    <!--setting打开页面-->
    <div class="setting-wrapper">
      <div class="setting-header clearfix">
        <router-link :to="{path:'/me'}">
          <span class="iconfont return icon-fanhui"></span>
        </router-link>
        <router-view></router-view>
        <span class="title">设置</span>
      </div>
      <div class="setting-content">
        <ul>
          <li class="list">
            <span>清除缓存</span>
            <span class="nextt">5.34MB</span>
          </li>
          <li class="list">
            <span>WiFi环境下自动下载新版本</span>
            <div class="lableb-content">
              <lableb></lableb>
            </div>              
          </li>
          <li class="list">
            <span>网络诊断</span>
            <span class="iconfont next icon-tubiao-"></span>
          </li>
          <li class="list">
            <span>关于美团外卖</span>
            <span class="iconfont next icon-tubiao-"></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import lableb from 'base/lableb/lableb';

  export default {
    components: {
      lableb
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .setting
    height: 100%
    width: 100%
    .setting-wrapper
      width: 100%
      min-height: 100%
      z-index: 100
      background: #f6f6f6
      overflow-y: auto
      position: fixed//如果不用这个定位则会出现滚动无限制情况
      top: 0px
      left: 0px
      .setting-header
        background: #fff
        //border-bottom: 10px solid #ededed
        height: 58px
        width: 100%
        box-sizing: border-box
        .return
          float: left
          margin-left: 14px
          color: #727272
          font-size: 20px
          padding: 6px
        .title
          display: flex
          font-size: 18px
          color: #3c3c3c
          //justify-content: center
          line-height: 48px
      .setting-content
        background: #ffffff
        text-align: left
        padding-left: 20px
        .list
          height: 50px
          border-bottom: 1px solid #ededed
          line-height: 50px
          //text-align: center
          //&:nth-child(3)
            //border-bottom: 10px solid #ededed
          .lableb-content
            display: inline-block
            float: right
            margin-right: 15px
          .next
            margin-right: 15px
            font-size: 18px
          .nextt
            float: right
            margin-right: 15px



</style> 