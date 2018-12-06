<template>
  <div class="FindItem">
    <div class="top">
      <img v-lazy="data.img">
    </div>
    <div class="bottom">
      <h4 class="title">{{data.title}}</h4>
      <span class="writer">周边生活</span>
      <span class="view">{{data.view}}人看过</span>
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
.FindItem
  //display: flex
  //flex-direction: column
  width: 100%
  height: 270px
  color: #333
  background: #fff
  padding: 0px 10px 0px 10px
  box-sizing: border-box
  //margin-bottom: 10px
  //z-index: -1
  .top
    width: 100%
    height: 160px
    overflow: hidden
    img
      width: 100%
      height: 160px
  .bottom
    width: 100%
    height: 100px
    //position: relative
    margin-top: 10px
    .title
      font-size: 18px
      font-weight: bold
      margin-bottom: 10px
    .writer
      color: #999
      font-size: 14px
      margin-top: 10px
    .view
      color: #999
      font-size: 14px
      float: right
      margin-right: 10px
</style> 