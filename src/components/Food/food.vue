<template><!--点击跳到单个商品页面"-->
  <transition class="move">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="icon-wrapper">
          <div class="fl foodheader-left">
            <span class="iconfont return icon-xiala" @click="closeDetail"></span>          
          </div>
          <div class="fr foodheader-right">
            <span class="iconfont icons icon-xiaoxi" @click="showdialogueBox"></span>
            <span class="iconfont icons icon-fenxiang" @click="showList"></span>
            <span class="iconfont icons icon-gengduo"  @click="showBox"></span>
          </div>
        </div>
        <!--中心内容-->
        <div class="image-wrapper">
          <img class="img" :src="food.image"/>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="price">
            <span class="now">￥{{food.price}}</span><span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
          </div>
          <Split></Split>
          <!-- -->
          <div class="cartcontrol-wrapper">
            <Cartcontrol :food="food"></Cartcontrol>
          </div>
          <div class="buy" @click="addFrist" v-show="!food.count || food.count ===0">加入购物车</div>
        </div>
        <div class="info">
          <h1 class="title">商品描述</h1>
          <div class="text" v-show="food.info">{{food.info}}</div>
        </div>
        <div class="ratings">
          <h1 class="title">外卖评价</h1>
          <Ratingselect :select-type="selectType" :only-content="onlyContent"></Ratingselect>
        </div>
      </div>
      <!--点击消息弹出聊天页面-->      
      <div class="dialogueBox" v-show="dialogueBoxShow">
        <div class="dialogueBox-wrapper">
          <div class="wrapper-title">
            <span class="iconfont return icon-fanhui" @click="hidedialogueBox"></span>
            <h1 class="dialogueBox-title">{{seller.name}}</h1>
            <span class="iconfont telephone icon-dianhua"></span>
            <span class="text">进店</span>
          </div>
          <!--中心内容区域-->
          <div class="dialogueBox-content">
            <span class="content-warn">商家可能比较繁忙，若回复较慢，请电话联系</span>
            <div class="dialogueBox-info">                  
              <div class="icon" height="57" width="57">
                <img :src="food.icon" height="57" width="57">
              </div>
              <div class="info-content">
                <h2 class="name">{{food.name}}</h2>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <span class="info-text">发送商品链接</span>
              </div>
            </div>
          </div>
          <!--输入框区域-->
          <div class="dialogueBox-input">
            <span class="iconfont say icon-chakantiezimaikefeng"></span>
            <input v-focus v-if="dialogueBoxShow" type="text" class="input-box" placeholder="输入消息">
            <span class="iconfont  menu-icon icon-caidan1"></span>
            <span class="iconfont add-box icon-jia"></span>
          </div>
        </div>
      </div>     
      <!--点击分享弹出的对话框-->
      <div class="shareBox" v-if="listShow" ref="shareBox">
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
          <i class="iconfont icons icon-xiaoxi"></i>
          <span>联系商家</span>
        </div>
      </div>      
      <transition name="fade">
        <div class="list-mask" v-show="listShow" @click="hideList"></div>
      </transition>
      <!--selectFoods传入购物车组件 实现联动 -->     
      <Shopcart :select-foods="selectFoods"
                :delivery-price="seller.deliveryPrice"
                :min-price="seller.minPrice"
                ref="shopcart"
                >
      </Shopcart> 
    </div>    
  </transition>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  import BScroll from 'better-scroll';
  import Vue from 'vue';
  import Ratingselect from 'components/Ratingselect/ratingselect';
  import Split from 'base/Split/split';
  import Shopcart from 'components/Shopcart/shopcart';
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
        console.log(this.food);
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
        // this.$refs.shareBox.style = 'z-index:35';
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
      // 点击打开聊天页面
      showdialogueBox() {
        this.dialogueBoxShow = true;
      },
      hidedialogueBox() {
        this.dialogueBoxShow = false;
      }
    },
    computed: {
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
            foods.push(food);
            }
          });
        });
        return foods;
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
      Shopcart,
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
    &.move-transtion//最终状态
      transition: all 0.2s linear//晃动为线性移动
      transform: translate3d(0, 0, 0)
    &.move-enter, &.move-leave//开始和离开的位置
      transform: translate3d(100%, 0, 0)//X轴平移100%
    .food-content
      padding: 10px
      background: #fff
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
    .dialogueBox
      position: fixed
      top: 0
      left: 0
      width 100%
      height: 100%
      background: #f3f5f7
      z-index: 1
      .wrapper-title
        width: 100%
        height: 50px
        line-height: 50px
        font-size: 20px
        background: #fff
        .return
          margin-left 10px
        .dialogueBox-title
          display: inline-block
          font-size: 18px
          margin-left: 60px
        .telephone
          font-size: 22px
          margin-right: 10px
          margin-left: 20px
          color: #909090
        .text
          border: 1px solid #909090
          font-size: 10px
          padding: 4px
          color: #909090
      .dialogueBox-content
        height: 80px
        line-height: 80px
        text-align: center
        .content-warn
          color: #cdd0d2
          font-size: 12px
        .dialogueBox-info
          display: flex
          margin: 10px
          padding-bottom: 18px//描边不紧贴底部
          border-1px(rgba(7, 17, 27, 0.1))
          height: 80px
          background: #fff
          .icon
            flex: 0 0 57px//左右分栏布局
            margin: 10px
          .info-content
            flex: 1//左右分栏布局
            position: relative
            text-align: left
            display: inline-bloc
            .name
              // display: inline-block
              margin: 15px 0 0px 0
              font-size: 14px
              height: 14px
              line-height: 18px
              color: rgb(7, 17, 27)
            .price
              font-weight: 700
              line-height: 24px
              display: inline-block
              .now
                margin-right: 8px
                font-size: 14px 
                color: rgb(240, 20, 20) 
              .old
                text-decoration: line-through
                font-size: 10px 
                color: rgb(147, 153, 159)
            .info-text
              height: 24px
              line-height: 24px
              padding: 3px 18px
              box-sizing: border-box
              font-size: 14px
              border-radius: 12px
              color: #ffc95d
              border: 1px solid #ffc95d
      .dialogueBox-input
        position: fixed
        bottom: 0px
        left: 0px
        background: #fff
        padding-bottom: 11px
        height: 38px
        width: 100%
        line-height: 38px
        .say
          padding: 10px
          font-size: 28px
          color: #909090
        .input-box
          width: 60%;
          margin-right: 10px;
          border: 1px solid #dcdcdc;
          height: 25px;
          font-size: 14px;
          padding: 4px;
          background: #fafcff
          border-radius: 6px
        .menu-icon
          padding-right: 10px
          font-size: 28px
          color: #909090
        .add-box
          padding-right: 10px
          font-size: 28px
          color: #909090
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