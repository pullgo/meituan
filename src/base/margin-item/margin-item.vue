<template>
  <div class="marginItem">
      <div class="marginItem-wrapper" v-for="(item,index) in data" :key="index">
        <div class="classify">
          <span class="title">{{item.title}}</span>
        </div>
        <div class="item-wrapper">
          <ul class="item-list">
            <li class="item" v-for="(list, index) in item.children" :key="list.code">
              <span class="iconfont icons">{{list.icon}}</span>
              <p class="text">{{list.text}}</p>
              <p v-show="list.hight" class="hight-text">{{list.hight}}</p>
            </li>
          </ul>
        </div>
      </div> 
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
      };
    },
    props: {
      data: {
        type: Array
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"
  .marginItem
    height: 100%
    width: 100%
    .marginItem-wrapper
      line-height: 20px
      border-bottom: 10px solid #f3f5f7
      // padding: 0px 10px 20px 20px
      // display: flex
      justify-content: center
      align-items: center
      &:last-child
        margin-bottom: 50px
        border: none
      .classify
        width: 100%
        height: 38px
        margin-left: 15px
        // border-1px(rgba(7, 17, 27, 0.1))
        border-bottom: 1px solid #e4e4e4;
        // margin: 0px 5px 0px 5px
        .title
          // margin-left: 20px
          color: #383838
          font-size: 15px
          line-height: 38px
      .item-wrapper
        width :100%
        height: 100%
        margin-bottom: 10px
        // border-bottom: 10px solid #f3f5f7
        .item-list
          display: flex
          .item
            display: inline-block
            position: relative
            flex: 1
            width: 70px
            margin-right: 13px
            margin-top: 16px
            .icons
              display: flex
              flex-direction: column
              align-items: center
              font-size: 30px
              color: #7d7d7d
            .text
              display: flex
              flex-direction: column
              align-items: center
              margin-top: 10px
            .hight-text
              position: absolute
              top: -10px
              right: -15px
              background: #ff4f33
              color: #fff
              border-radius: 12px
              padding: 2px
              font-size: 6px
              list-style-type : disc
</style> 