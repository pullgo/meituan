<template>
  <div class="OrderItem">
    <div class="top">
      <img v-lazy="data.pic_url">
      <div class="info-box border-1px">
        <div class="name">{{data.name}}</div>
        <div class="status">订单已完成</div>
      </div>
    </div>
    <div class="describe-wrapper">
      <div class="food">香辣爆炒牛肚煲仔饭<span>x1</span></div>
      <div class="cost">总计1个菜，实付<span>￥12.00</span></div>
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
  flex-direction: column
  width: 100%
  height: 200px
  padding: 15px 5px
  color: #333
  background: #fff
  box-sizing: border-box
  margin-bottom: 10px
  border-bottom: 10px solid #ededed;
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
    .food
      line-height: 25px
      font-size: 12px
      margin-top: 10px
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