<template>
  <div class="swich">
    <!--分类开始 注意href="" 如果是空 写上会报错的-->
    <scroll ref="scroll" class="classifications-content">
      <div>
        <div v-if="iconlibrary.length" class="classifications-wrapper">
          <Tslider>
            <div v-for="item in iconlibrary" class="item">
              <img class="img" :src="item.icon"/>
              <span class="text">{{item.title}}</span>
            </div>
          </Tslider>
        </div>
      </div>
    </scroll>
    <!--分类end-->
  </div>
</template>

<script type="text/ecmascript-6">
  import Tslider from 'base/Tslider/Tslider';
  import Scroll from 'base/Scroll/scroll';
  import axios from 'axios';

  export default {
    data() {
      return {
        iconlibrary: []
      };
    },
    created() {
      axios.get('../data.json').then((res) => {
        this.iconlibrary = res.data.classifications;
         // console.log(this.iconlibrary)
      });
    },
    components: {
      Tslider,
      Scroll
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .swich
      width: 100%
      height: 100%
    .classifications-content
      width: 100%
      height: 100%
      .classifications-wrapper
        width: 100%
        height: 220px 
        overflow: hidden
        .item
          height: 80px
          width: 58px
          float: right
          margin: 5px 7px 18px 7px
          text-align: center
          .img
            width: 58px
            display: inline-block
            height: 58px  
            margin: 10px 10px 20px 10px
            float: right
          .text
            display: inline-block
            text-align: center
            line-height: 12px
            font-size: 12px
            padding-top: 80px
            color: #000
</style> 