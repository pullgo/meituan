<template>
  <div class="seller" ref="seller">
    <FoodHeader></FoodHeader>    
    <div class="seller-wrapper">
      <div class="address-wrapper border-1px">
        <div class="address-left">
          <i class="iconfont icon-ziyuan"></i>
          <span class="text">广州市增城区沙浦大道31号嘉业购物广场1楼</span>
        </div>
        <div class="address-right">
          <i class="iconfont icon-kefuzhongxin"></i>
        </div>
      </div>
      <!--商家实景-->
      <Scroll ref="scroll">
        <div>
          <div class="pic-wrapper" ref="picWrapper">
            <ul class="pic-list" ref="picList">
              <li class="pic-item" v-for="pic in seller.pics">
                <img :src="pic" width="120" height="90">
              </li>
            </ul>        
          </div>
        </div>
      </Scroll>
      <!--档案-->
      <div class="archives-box">
        <ul>
          <li v-for="item in items " class=" item border-1px">
            <i class="iconfont icon">{{item.icon}}</i>
            <p class="text">{{item.text}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import FoodHeader from 'components/food-header/food-header';
  import axios from 'axios';
  import Scroll from 'base/Scroll/scroll';
  import BScroll from 'better-scroll';

  export default {
    props: {
    },
    data() {
      return {
        seller: [],
        items: [
          {
            icon: '\ue607',
            text: '查看食品安全档案'
          },
          {
            icon: '\ue653',
            text: '配送服务：由美团提供配送服务'
          },
          {
            icon: '\ue630',
            text: '配送时间：11:20-23:20'
          },
          {
            icon: '\ue605',
            text: '本店搬迁至李复广场停车场里面'
          },
          {
            icon: '\ue8c0',
            text: '商家服务 到店自取'
          },
          {
            icon: '\ue6af',
            text: '新用户立减16元，首次使用美团支付最高减3元'
          }
        ]
      };
    },
    created() {
      axios.get('../data.json').then((res) => {
        this.seller = res.data.seller;
      });
    },
    watch: {
      'seller'() {
        this._initPics(); // 如果没有的话 无法滚动 因为在reday之后写的话还没有seller
      }
    },
    ready() { // 可以操作dom 来回执行
      this._initPics(); // 如果没有的话 无法滚动
    },
    methods: {
      // 给每张图片加上宽度
      _initPics() {
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.lengtgh - margin;
          this.$refs.picList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical' // 规定图片横向滚动 忽略竖向的滚动
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      }
    },
    components: {
      FoodHeader,
      Scroll
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"
  .seller
    width: 100%
    height: 100%
    position: fixed
    top: 0
    left: 0
    background: #fff
    z-index: 110    
    // color: #8b8b8b
    .seller-wrapper
      position: absolute
      top: 220px    
      padding: 10px 0
      .address-wrapper
        display: flex
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        padding: 0px 0px 10px 5px
        .address-left
          flex: 0 0 320px
          padding: 0px 0px 0px 10px
          width: 320px
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          @media only screen and (max-width: 320px)
            flex: 0 0 380px
            width: 380px
          .text
            color: #000
            font-size: 14px
        .address-right
          flex: 1
          padding: 0px 15px 0px 15px 
      .pic-wrapper
        width: 100%
        overflow: hidden
        white-space: nowrap
        padding: 10px 10px 0px 10px
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        .pic-list
          font-size: 0
          .pic-item
            display: inline-block
            margin-right: 6px
            margin-left: 5px
            width: 120px
            height: 90px
            &:last-child
              margin: 0
      .archives-box
        padding: 2px
        .item
          width: 100%
          height: 40px
          margin-left: 10px
          line-height: 40px
          display: -webkit-inline-box
          border-bottom: 1px solid rgba(7, 17, 27, 0.1)
          &.nth-last-child
            border: none
          .icon
            font-size: 20px
            color: #7d7d7d
            margin-right: 10px
          .text
            font-size: 14px
            color: #000

</style> 