<template>
  <div class="OrderItem">
    <div class="top">
      <img v-lazy="data.pic_url">
      <div class="info-box border-1px">
        <span class="name">{{data.name}}</span>
        <span class="status">订单已完成</span>
      </div>
    </div>
    <div class="describe-wrapper">
      <div class="describe">
        <span class="text">香辣爆炒牛肚煲仔饭</span>
        <span class="num">x1</span>
      </div>
      <div class="cost">
        <span class="text">总计1个菜，实付</span>
        <span class="text">￥12.00</span>
      </div>
    </div>
    <div class="business">
      <div class="again border-1px">再来一单</div>
      <div class="again border-1px">相似商家</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {};
  },
  props: {
    data: {
      type: Object
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin"
.OrderItem 
  display: flex
  width: 100%
  height: 210px
  flex-direction: column
  padding: 15px 5px
  border-bottom: 10px solid #f3f5f7;
  box-sizing: border-box
  color: #333
  background: #f9f9f39
  .top
    flex: 1
    padding: 0 15px
    font-size: 14px
    height: 50px
    line-height: 50px
    img
      float: left
      width: 40px
      height: 40px
      margin-top: 5px
      margin-right: 10px
      border-radius: 50%
    .info-box
      border-bottom: 1px solid (rgba(7, 17, 27, 0.1))
      height: 60px
      margin-left: 50px
      .name
        display: inline-block
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
        width: 160px
        height: 50px
        float: left
        color: #333
        font-size: 16px
        font-weight: bold
     .status
        float: right
        margin-right: 10px
        font-size: 15px
  .describe-wrapper
    flex: 2
    margin-left: 62px
    margin-right: 15px
    padding-top: 10px
    box-sizing: border-box
    font-size: 14px
    color: #666
    .describe
      width: 288px
      line-height: 25px
      font-size: 12px
      margin-top: 10px
      @media only screen and (max-width: 288px)
        width: 320px
      .text
        font-size: 14px
        color: #151515
        padding-right: 140px
      .num
        margin-right: 15px
    .cost
      font-size: 12px
      line-height: 25px
      float: right
      .text
        font-size: 14px
        color: #151515
  .business 
    flex: 1
    padding: 0 15px
    font-size: 14px
    height: 24px
    line-height: 24px
    .again
      float: right
      width: 76px
      height: 24px
      line-height: 24px
      border: 1px solid (rgba(7, 17, 27, 0.1))
      text-align: center
      font-size: 14px
      border-radius: 2px
      margin: 9px 0px 9px 5px
</style> 