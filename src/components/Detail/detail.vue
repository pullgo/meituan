<template><!--点击跳到单个商品页面-->
  <transition class="move" ref="food">
    <div class="detail" v-show="showFlag">
      <div class="detail-content">
        <div class="icon-wrapper">
          <div class="fl foodheader-left">
            <span class="iconfont return icon-xiala" @click="closeDetail"></span>            
          </div>
          <div class="fr foodheader-right">
            <span class="iconfont icons icon-xiaoxi"></span>
            <span class="iconfont icons icon-fenxiang" @click="showList"></span>
            <span class="iconfont icons icon-gengduo"  @click="showBox"></span>
          </div>
          <!--点击更多弹出的对话框-->
          <div class="moreBox" v-show="boxShow" @click="hideBox">
            <div class="box">
              <i class="iconfont icons icon-gouwuchekong"></i>
              <span>我的购物车</span>
            </div>
            <div class="box">
              <i class="iconfont icons icon-xiaoxi"></i>
              <span>消息中心</span>
            </div>
            <div class="box">
              <i class="iconfont icons icon-xiaoxi"></i>
              <span>联系商家</span>
            </div>
          </div>
          <!--点击消息弹出的对话框-->
          <div class="dialogueBox">
            <div class="box-wrapper">
              
            </div>
          </div>
        </div>
        <!--中心内容-->
        <div class="image-wrapper">
          <img class="img" :src="goods[0].foods[0].image"/>
        </div>
        <div class="content">
          <h1 class="title">{{goods[0].foods[0].name}}</h1>
          <div class="detail-text">
            <span class="sell-count"  v-show="goods[0].foods[0].sellCount">月售{{goods[0].foods[0].sellCount}}</span>
            <span class="rating" v-show="goods[0].foods[0].rating" >好评度{{goods[0].foods[0].rating}}%</span>
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
      <!--点击分享弹出的对话框-->
      <div class="shareBox" v-show="listShow" ref="shareBox">
        <h1 class="top-title border-1px">商家配送范围有限，建议分享给您附近的朋友</h1>
        <div class="box-content border-1px">
          <ul>
            <li class="box">
              <span class="iconfont icons icon-pengyouquan"></span>
              <span class="text">微信朋友圈</span>
            </li>
            <li class="box">
              <span class="iconfont icons icon-weixin"></span>
              <span class="text">微信好友</span>
            </li>
            <li class="box">
              <span class="iconfont icons icon-QQ"></span>
              <span class="text">QQ好友</span>
            </li>
          </ul>
        </div>
        <div class="cancal">取消</div>
      </div>
      <transition name="fade">
        <div class="list-mask" v-show="listShow" @click="hideList"></div>
      </transition>
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
        food: {},
        showFlag: false, // 观测
        selectType: ALL, // 子传父
        onlyContent: true, // 子传父
        listShow: false,
        boxShow: false,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    created() {
      axios.get('../data.json').then((res) => {
        this.goods = res.data.goods;
        this.foods = res.data.foods;
        // console.log(this.foods);
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
        /* this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
          // console.log(this.scroll);
        }); */
      },
      showList() {
        this.listShow = true;
        this.$refs.shareBox.style = 'z-index:35';
      },
      hideList() {
        this.listShow = false;
      },
      showBox() {
        this.boxShow = true;
      },
      hideBox() {
        this.boxShow = false;
      },
      closeDetail() {
        this.showFlag = false;
      }
    },
    // 子----父 因为选择的都是基础类型改变不了父级的组件
    events: {
    // TYPE里面的T是小写与$emit里面的评写一样
      'ratingtype.select'(type) {
        // 把子组件的type赋值给父组件selectType
        this.selectType = type;
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
    touch-action: none
    position: fixed//屏幕定位
    left: 0
    top: 0
    bottom: 48px
    z-index: 32
    width: 100%
    height: 100%
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
        .moreBox
          position: absolute
          top: 51px
          right: 12px
          padding: 0px 10px 10px 10px
          z-index: 200
          background: #fff
          font-size: 12px
          .icons
            margin-right: 5px
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
          margin-right: 100px
          line-height: 14px
          font-size: 22px
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
          bottom: 9px
        .buy
          position: absolute
          right: 18px
          bottom: 18px
          // z-index: 10
          height: 24px
          line-height: 24px
          padding: 0 12px
          box-sizing: border-box
          font-size: 10px
          border-radius: 12px
          color: #fff
          background: #ffc95d
      .info
        padding-top: 12px
        .title
          margin-bottom: 15px
          margin-top: 15px
          margin-right: 100px
          line-height: 14px
          font-size: 16px
          font-weight: 700
          color: rgb(7, 17, 27)
        .text
          font-size: 12px
          color: rgb(147, 153, 159)
          line-height: 14px
      .ratings
        padding: 0
        margin: 0
      .title
        margin-bottom: 15px
        margin-top: 15px
        margin-right: 100px
        line-height: 14px
        font-size: 14px
        font-weight: 700
        color: #292d31
    .shareBox
      width: 100%
      // height: 150px
      position: fixed
      bottom: 20px
      left: 0px
      background: #fff
      font-size: 12px
      color: #000
      .top-title
        font-size: 15px
        text-align: center
        margin-top: 10px
        padding-bottom: 10px
        border-bottom: 1px solid (rgba(7, 17, 27, 0.1))
      .box-content
        padding: 10px 10px 20px 31px
        border-bottom: 1px solid (rgba(7, 17, 27, 0.1))
        .box
          display: inline-block
          flex: 1
          margin-right: 55px
          flex-direction: column
          align-items: center
          .icons
            display: flex
            flex-direction: column
            align-items: center
            font-size: 50px
            margin-top: 16px
            color: #ffc95d
          .text
            display: flex
            flex-direction: column
            align-items: center
            margin-top: 10px
            line-height: 20px
      .cancal
        font-size: 16px;
        text-align: center
        height: 40px
        line-height: 40px
    .list-mask
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: 0
      backdrop-filter: blur(10px)
      opacity: 1
      background: rgba(7, 17, 27, 0.6)
      &.fade-enter-active, &.fade-leave-active
        transition: all 0.5s
      &.fade-enter, &.fade-leave-active
        opacity: 0
        background: rgba(7, 17, 27, 0)
</style>