<template>
  <div class="classify">
    <div class="classify-wrapper">
      <span class="classify-item active">
        <router-link to="/home/Menu">点菜</router-link>
      </span>
      <span class="classify-item">
         <router-link to="/home/ratings">评价</router-link>
      </span>
      <span class="classify-item">
         <router-link to="/home/seller">商家</router-link>
      </span>
      <div class="text">邀请拼单</div>
    </div>
  </div> 
</template>
<script type="text/ecmascript-6">
/* eslint-disable no-new */
  export default {
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin";
  .classify
    width: 100%
    height: 40px
    position: relative
    line-height: 40px
    //border-1px(rgba(7, 17, 27, 0.1))
    margin-left: 20px
    margin-top: 40px
    padding-left: 10px
    z-index: -1
    .classify-wrapper
      padding: 0px 10px 0px 10px
      .classify-item
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
            color: #000
      .text
        position: absolute
        right: 38px
        bottom: 10px
        z-index: 0
        height: 24px
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        font-size: 10px
        border-radius: 12px
        color: #ffc95d
        border: 1px solid #ffc95d

</style>
