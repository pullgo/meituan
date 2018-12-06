<template>
  <div class="tab border-1px">
    <router-link to="/home">
      <i class="iconfont icon-shouye i"></i>
      <span class="text">首页</span>
    </router-link>
    <router-link to="/findList">
      <i class="iconfont icon-shangjia i"></i>
      <span class="text">发现</span>
    </router-link>
    <router-link to="/order">
      <i class="iconfont icon-dingdan i"></i>
      <span class="text">订单</span>
    </router-link>
    <router-link to="/me">
      <i class="iconfont icon-wode i"></i>
      <span class="text">我的</span>
    </router-link>
  </div> 
</template>
<script type="text/ecmascript-6">
/* eslint-disable no-new */
  export default {
  };
</script>
<style scoped  lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin";
  .tab
    display: flex
    position: fixed
    bottom: 0px
    left: 0px
    width: 100%
    height: 50px
    font-size: 16px
    //align-items: center//上下居中
    background: #fff
    z-index: 100
    border-top: 1px solid (rgba(7, 17, 27, 0.1))
    box-sizing: border-box
    a//子元素直接写a就可以了 
      display: flex
      flex: 1
      flex-direction: column//上下排布 列布局  内容垂直居中
      align-items: center//内容水平居中
      &.active
        color: #ffc847
    .i
      font-size: 18px
      margin-top: 4px
    .text
      font-size: 15px
</style>
