<template><!--点击跳到单个商品页面" @click="showdialogueBox"  -->
  <transition class="move">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="icon-wrapper">
          <div class="fl foodheader-left">
            <span class="iconfont return icon-xiala" @click="closeDetail"></span>          
          </div>
          <div class="fr foodheader-right">
            <span class="iconfont icons icon-xiaoxi"@click="toDialogueBox"></span>
            <span class="iconfont icons icon-fenxiang" @click="showList"></span>
            <span class="iconfont icons icon-gengduo"  @click="showBox"></span>
          </div>
        </div>
        <!--中心内容-->
        <div class="image-wrapper" @click="hideBox">
          <img class="img" :src="food.image"/>
        </div>
        <div class="content" @click="hideBox">
          <h1 class="title">{{food.name}}</h1>
          <div class="price">
            <span class="now">￥{{food.price}}</span><span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
          </div>
          <Split></Split>
          <div class="cartcontrol-wrapper">
            <Cartcontrol :food="food" @add="addFood"></Cartcontrol>
          </div>
          <div class="buy" @click.stop.prevent="addFrist" v-show="!food.count || food.count ===0">加入购物车</div>
        </div>
        <div class="info">
          <h1 class="title">商品描述</h1>
          <div class="text" v-show="food.info">{{food.info}}</div>
        </div>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect @select="selectRating" :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <!--评价的筛选needShow(rating.rateType,rating.text) 定义一个函数将所需要的返回值传入即可v-show也可以绑定一个函数的表达式-->
              <li v-for="rating in food.ratings" class="rating-item border-1px" v-show="needShow(rating.rateType,rating.text)">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar">
                </div>
                <!--时间戳 转为字符串用formatDate 在定义一个方法 filters-->
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateTyp===0,'icon-thumb_down':rating.rateTyp===1}"></span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div> 
      </div>
      <!--点击分享弹出的对话框-->
      <div class="shareBox" v-if="listShow" ref="shareBox">
        <h1 class="top-title border-1px">商家配送范围有限，建议分享给您附近的朋友</h1>
        <div class="box-content border-1px">
          <ul class="box-list">
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
        <div class="cancal" @click="hideList">取消</div>
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
          <i class="iconfont icons icon-dianhua"></i>
          <span>联系商家</span>
        </div>
      </div>      
      <transition name="fade">
        <div class="list-mask" v-show="listShow" @click="hideList"></div>
      </transition>
      <router-view :food="food"></router-view>
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
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        seller: [],
        ratings: [],
        // food: {}, //会报重复定义的错 因为props里面已经定义过了
        showFlag: false, // 观测
        selectType: ALL, // 子传父
        onlyContent: true,
        listShow: false,
        boxShow: false,
        dialogueBoxShow: false,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    directives: {
      focus: {
        // 指令的定义
        inserted: function (el) {
          el.focus();
        }
      }
    },
    created() {
      axios.get('../data.json').then((res) => {
        this.goods = res.data.goods;
        this.seller = res.data.seller;
        this.ratings = res.data.ratings;
        // console.log(this.food);
      });
    },
    watch: {
      food(v1) {
        // console.log(v1);
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
          // console.log(this.scroll);
        });
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      },
      addFood(target) {
        this.$emit('add', target);
      },
      addFrist(event) {
        // console.log(this.event);
        if (!event._constructed) {
          return;
        }
        this.$emit('cart-add', event.target); // 父----子
        Vue.set(this.food, 'count', 1);
      },
      showList() {
        this.listShow = true;
      },
      selectRating(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
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
      },
      toDialogueBox() {
        this.$router.push('/home/menu/dialogueBox');
      }
    },
    computed: {
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
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
  .food
    // touch-action: none
    position: fixed//屏幕定位
    left: 0
    top: 0
    bottom: 48px
    z-index: 32
    width: 100%
    height: 100%
    background: #fff
    overflow: hidden
    &.move-transtion//最终状态
      transition: all 0.2s linear//晃动为线性移动
      transform: translate3d(0, 0, 0)
    &.move-enter, &.move-leave//开始和离开的位置
      transform: translate3d(100%, 0, 0)//X轴平移100%
    .food-content
      padding: 10px
      // background: #fff
      .icon-wrapper
        width: 100%
        height: 40px
        line-height: 40px
        .foodheader-left
          margin-left: 1px
          .return
            padding: 6px
        .foodheader-right
          margin-right: 25px
          .icons
            padding: 6px         
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
          bottom: 16px
          // z-index: 10
          height: 26px
          line-height: 26px
          padding: 0 10px
          box-sizing: border-box
          font-size: 10px
          border-radius: 12px
          color: #fff
          background: #ffc95d
          &.fade-transition
            transition: all 0.2s
            opacity: 1
          &.fade-enter, &.fade-leave
            opacity: 0
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
      .rating-wrapper
        padding: 0 18px
        .rating-item
          position: relative
          padding: 16px 0
          border-1px(rgba(7, 17, 27, 0.1))
          .user
            position: absolute
            right: 0
            top: 16px
            line-height: 12px
            font-size: 0
            .name
              display: inline-block
              margin-right: 6px
              vertical-align: top
              font-size: 10px
              color: rgb(147, 153, 159)
            .avatar
              border-radius: 50%
          .time
            margin-bottom: 6px
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
          .text
            line-height: 16px
            font-size: 12px
            color: rgb(7, 17, 27)
            .icon-thumb_up, .icon-thumb_down
              margin-right: 4px
              line-height: 24px
              font-size: 12px
              color: rgb(0, 160, 220)
            .icon-thumb_down
              color: rgb(147, 153, 159)
        .no-rating
          padding: 16px 0
          font-size: 12px
          color: rgb(147, 153, 159)
    .shareBox
      width: 100%
      // height: 150px
      position: fixed
      bottom: 0px
      left: 0px
      background: #fff
      font-size: 12px
      color: #000
      z-index: 1
      .top-title
        font-size: 15px
        text-align: center
        margin-top: 10px
        padding-bottom: 10px
        border-bottom: 1px solid (rgba(7, 17, 27, 0.1))
      .box-content
        padding: 5px 0px 10px 0px
        border-bottom: 1px solid (rgba(7, 17, 27, 0.1))
        .box-list
          display: flex
          .box
            display: inline-block
            flex: 1
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
        font-size: 16px
        text-align: center
        height: 40px
        line-height: 40px
        color: #5a5a5a
    .moreBox
      position: absolute
      top: 51px
      right: 12px
      padding: 0px 5px 10px 5px
      z-index: 200
      background: #fff
      font-size: 12px
      .box
        padding: 10px 5px 8px 10px
        .icons
          margin-right: 5px
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