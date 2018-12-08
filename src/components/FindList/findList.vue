<template>
  <div class="FindList">
    <div class="nav-wrapper">
      <div class="nav">
        <span class="nav-item">发现全部
        </span>
        <span class="nav-item">附近
        </span>
        <span class="nav-item">美食
        </span>
      </div>      
    </div>
    <div class="findList-wrapper" v-for="item in findList" :key="item.code">
      <FindItem :data="item"></FindItem>
    </div>
    <!--没有更多-->
    <div class="emptyDataWrapper">
      <p class="emptyData">我是有底线的~~~~</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import FindItem from 'base/find-item/find-item';
  import axios from 'axios';
  
  export default {
    data() {
      return {
        findList: []
      };
    },
    created() {
      axios.get('../data.json').then((res) => {
        this.findList = res.data.findList;
        console.log(this.findList.length);
      });
    },
    components: {
      FindItem
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .FindList
    color: #ccc
    padding-bottom: 50px
    .nav-wrapper
      width: 100%
      height: 100%
      padding-bottom: 50px
      .nav
        position: fixed
        top: 0px
        left: 0px
        display: flex
        width: 100%
        height: 50px
        line-height: 50px
        background: #f3f5f7
        // border-1px(rgba(7, 17, 27, 0.1))
        //padding-left: 20px
        //padding-top: 15px
        .nav-item
          flex: 1
          display: inline-block;
          width: 75px
          height: 50px
          text-align: center
          // margin-right: 3rem
          & > a
            display: block
            font-size: 16px
            color: #7c7f82
            &.active
              color: #ffc847
              border-bottom: 3px solid #ffc847
        .text
          position: absolute
          right: 38px
          bottom: 10px
          z-index: 10
          height: 24px
          line-height: 24px
          padding: 0 12px
          box-sizing: border-box
          font-size: 10px
          border-radius: 12px
          color: #ffc95d
          border: 1px solid #ffc95d      
    .findList-wrapper
      background: #fff
    .emptyDataWrapper
        height: 20px
        width: 100%
        margin-bottom: 50px
        line-height: 20px
        text-align: center
        color: #0c0d0c
      .emptyData
        font-size: 16px
</style> 