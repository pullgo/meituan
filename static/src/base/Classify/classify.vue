<template>
  <div class="classify border-1px">
    <div class="title">{{title}}</div>
  </div> 
</template>

<script type="text/ecmascript-6">
/* eslint-disable no-new */
  export default {
    props:
      ['title'],
    data () {
      return {
      };
    }
  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"
  .classify
    height: 40px
    border-1px(rgba(7, 17, 27, 0.1))
    .title
      margin-left: 20px
      color: #383838
      font-size: 16px
      line-height: 40px
</style>
