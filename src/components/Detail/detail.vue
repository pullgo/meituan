<template><!--点击跳到单个商品页面 v-show="showFlag-->
  <transition class="move" ref="food">
    <div class="detail" v-show="showFlag">
      <div class="detail-content">
        <div class="icon-wrapper">
          <div class="fl foodheader-left">
            <span class="iconfont return icon-xiala"></span>
          </div>
          <div class="fr foodheader-right" @click="showList">
            <span class="iconfont icons icon-xiaoxi"></span>
            <span class="iconfont icons icon-fenxiang" ></span>
            <span class="iconfont icons icon-gengduo"></span>
          </div>
          <!--点击分享弹出的对话框-->
          <div class="shareBox" v-show="listShow">
            <div class="top"></div>
            <span class="text">商家配送范围有限，建议分享给您附近的朋友</span>
            <div class="box-content">
              <div class="box">
                <span class="iconfont icons"></span>
                <span class="text">微信朋友圈</span>
              </div>
              <div class="box">
                <span class="iconfont icons"></span>
                <span class="text">微信好友</span>
              </div>
              <div class="box">
                <span class="iconfont icons"></span>
                <span class="text">QQ好友</span>
              </div>
            </div>
            <span class="cancal">取消</span>
          </div>
          <!--点击更多弹出的对话框-->
          <div class="moreBox">
            <div class="icons">
              <i class="iconfont icon-gouwuchekong"></i>
              <i class="iconfont icon-xiaoxi"></i>
            </div>
            <div class="text">
              <span>我的购物车</span>
              <span>消息中心</span>
            </div>
          </div>
        </div>
        <div class="image-wrapper">
          <img class="img" :src="goods[0].foods[0].image"/>
        </div>
        <div class="content">
          <h1 class="title">{{goods[0].foods[0].name}}</h1>
          <div class="detail-text">
            <span class="sell-count">月售{{goods[0].foods[0].sellCount}}</span>
            <span class="rating">好评度{{goods[0].foods[0].rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{goods[0].foods[0].price}}</span><span v-show="goods[0].foods[0].oldPrice" class="old">￥{{goods[0].foods[0].oldPrice}}</span>
          </div>
          <Split></Split>
          <div class="cartcontrol-wrapper">
            <Cartcontrol :food="food"></Cartcontrol>
          </div>
          <div class="buy">加入购物车</div>
        </div>
        <div class="info">
          <h1 class="title">商品描述</h1>
          <div class="text" v-show="goods[0].foods[0].info">{{goods[0].foods[0].info}}</div>
        </div>
        <div class="ratings">
          <h1 class="title">外卖评价</h1>
          <Ratingselect :select-type="selectType" :only-content="onlyContent"></Ratingselect>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  import BScroll from 'better-scroll';
  import Vue from 'vue';
  import Ratingselect from 'components/Ratingselect/ratingselect';
  import Split from 'base/Split/split';
  import Cartcontrol from 'base/Cartcontrol/cartcontrol';
  const ALL = 2;
  export default {
    propos: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        goods: '',
        foods: '',
        showFlag: false, // 观测
        selectType: ALL, // 子传父
        onlyContent: true, // 子传父
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
      listShow: false
    },
    created() {
      axios.get('../data.json').then((res) => {
        this.goods = res.data.goods;
         // console.log(this.food)
      });
    },
    watch: {
      food: {
        handler(v1) {
          // console.log(v1);
        },
        deep: true // 深度观测
      }
    },
    methods: {
      show() {
        this.showFlag = true; // 父调子
        this.selectType = ALL;
        this.onlyContent = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
          // console.log(this.scroll)
        });
      },
      showList(listShow) {
        this.listShow = true;
      }
    },
    events: { // 子----父 因为选择的都是基础类型改变不了父级的组件
      'ratingtype.select'(type) { // TYPE 里面的T是小写 与$emit里面的评写一样
        this.selectType = type; // 把子组件的type赋值给父组件selectType
         // 选择筛选后窗口的高度会更改 需要进行下一步的操作this.scroll.refresh()但是没有效果 因为DOM没有更新还是需要nexttick 异步更新DOM
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      'content.toggle'(onlyContent) {
        this.onlyContent = onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    }, 
    components: {
      Cartcontrol,
      Split,
      Ratingselect
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin";

  .detail
    position: fixed//屏幕定位
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: #fff
    &.move-transtion//最终状态
      transition: all 0.2s linear//晃动为线性移动
      transform: translate3d(0, 0, 0)
    &.move-enter, &.move-leave//开始和离开的位置
      transform: translate3d(100%, 0, 0)//X轴平移100%
    .detail-content
      margin: 10px
      .icon-wrapper
        width: 100%
        height: 40px
        line-height: 40px
        .foodheader-left
          margin-left: 5px
        .foodheader-right
          margin-right: 25px
          .icons
            margin-right: 8px
        .shareBox
          width: 100%
          height: 100%
          position: fixed
          bottom: 0px
          left: 0px
          background: #fff
          font-size: 12px
          color: #000
          //z-index: 200
          display: flex
          .top
            height: 20px
            border-bottom: 1px solid (rgba(7, 17, 27, 0.1))
          .text
            text-aglin: center
          .box-content
            margin: 20px 20px 5px 20px
            .box
              flex: 1
              //.icons
                
              //.text
      .image-wrapper
        border-radius: 10px
        .img
          width: 100%
          height: 100%
          transform: scale(0.99)
          border-radius: 10px
          border-shadow: -2px 0 3px -1px rgb(7, 17, 27)
          border-shadow: 0 -2px 3px -1px rgb(7, 17, 27)
          border-shadow: 0 2px 3px -1px rgb(7, 17, 27)
          border-shadow: 2px 0 3px -1px rgb(7, 17, 27)
      .content
        position: relative
        .title
          margin-bottom: 15px
          margin-top: 15px
          line-height: 14px
          font-size: 24px
          font-weight: 700
          color: rgb(7, 17, 27)
        .sell-count, .rating
          font-size: 10px
          color: rgb(147, 153, 159)
          line-height: 10px
        .sell-count
          margin-right: 12px
        .price
          font-weight: 700
          line-height: 24px
          .now
            margin-right: 8px
            font-size: 14px 
            color: rgb(240, 20, 20) 
          .old
            text-decoration: line-through
            font-size: 10px 
            color: rgb(147, 153, 159)
        .cartcontrol-wrapper
          position: absolute
          right: 12px
          bottom: 12px
        .buy
          position: absolute
          right: 18px
          bottom: 18px
          z-index: 10
          height: 24px
          line-height: 24px
          padding: 0 12px
          box-sizing: border-box
          font-size: 10px
          border-radius: 12px
          color: #fff
          background: rgb(0, 160, 220)
      .info
        padding-top: 12px
        .title
          margin-bottom: 15px
          margin-top: 15px
          line-height: 14px
          font-size: 16px
          font-weight: 700
          color: rgb(7, 17, 27)
        .text
          font-size: 12px
          color: rgb(147, 153, 159)
          line-height: 12px

</style>