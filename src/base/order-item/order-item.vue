<template>
  <div class="OrderItem">
    <div class="top">
      <img v-lazy="data.pic_url">
      <div class="name">{{data.name}}</div>
      <div class="status">订单已完成</div>
    </div>

    <div class="mid">
      <div class="food">香辣爆炒牛肚煲仔饭<span>x1</span></div>
      <div class="cost">总计1个菜，实付<span>￥12.00</span></div>
    </div>

    <div class="bottom">
      <div class="again border-1px">再来一单</div>
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
  flex-direction: column
  width: 100%
  height: 180px
  padding: 15px 5px
  color: #333
  background-color: #fff
  box-sizing: border-box
  margin-bottom: 10px
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
    .name
      position: relative
      float: left
      max-width: 50%
      color: #333
      font-size: 16px
      font-weight: bold
    .status
      float: right
      color: #999
  .mid
    flex: 2
    margin-left: 62px
    margin-right: 15px
    padding-top: 10px
    box-sizing: border-box
    font-size: 14px
    color: #666
    .food
      line-height: 25px
      font-size: 12px
      span
        font-size: 14px
        color: #151515
        float: right
    .cost
      float: right
      font-size: 12px
      line-height: 25px
      span
        font-size: 14px
        color: #151515
  .bottom 
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
      border: 1px solid #ccc
      text-align: center
      font-size: 14px
      border-radius: 2px
      margin: 9px 0
</style> 