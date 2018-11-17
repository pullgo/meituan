<template>
  <div class="ratings" ref="ratings">
    <FoodHeader></FoodHeader>      
    <div class="ratings-content">
      <div class="content-wrapper">
      <!--评分-->
        <div class="wrapper-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="wrapper-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}"</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}"</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="deliveryTime">{{seller.deliveryTime}}分钟"</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect @click="selectRating" :ratings="ratings" :select-type="selectType" :only-content="onlyContent"></ratingselect> 
      <scroll ref="scroll">
        <div>
          <div class="ratings-wrapper">
            <ul>
              <li v-for="rating in ratings" :value="rating.code" :key="rating.code" v-show="needShow(rating.rateType,rating.text)" class="item border-1px">
                <div class="avatar">
                  <img class="img" width="28" height="28" :src="rating.avatar">
                </div>
                <div class="content">
                  <h1 class="name">{{ratings.username}}</h1>
                  <div class="star-wrapper">
                    <span :size="24" :score="rating.score"></span>
                    <span class="delivery">{{rating.deliveryTime}}</span>
                  </div>
                  <p class="text">{{rating.text}}</p>
                  <div class="recommend">
                    <span class="iconfont icon-tuijian icon"></span>
                    <span class="item" v-for="item in rating.recommend" :value="item.code" :key="item.code" >{{item}}</span>
                  </div>
                  <div class="time"></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import FoodHeader from 'components/food-header/food-header';
  import axios from 'axios';
  import Scroll from 'base/Scroll/scroll';
  import star from 'base/star/star';
  import Split from 'base/Split/split';
  import Ratingselect from 'components/Ratingselect/ratingselect';
  import BScroll from 'better-scroll';
  const ALL = 2;
  export default {
    data() {
      return {
        seller: [],
        ratings: [],
        onlyContent: true,
        selectType: ALL
      };
    },
    created() {
      axios.get('../data.json').then((res) => {
        this.seller = res.data.seller;
        this.ratings = res.data.ratings;
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          });
        });
      });
    },
    methods: {
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
      selectRating(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    },
    events: {
      'ratingType.select'(type) {
        this.selectType = type;
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
      FoodHeader,
      star,
      Split,
      Scroll,
      Ratingselect
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"
  .ratings
    width: 100%
    height: 100%
    position: absolute
    top: 0
    left: 0
    background: #fff
    z-index: 110    
    .ratings-content
      position: absolute
      top: 220px
      left: 0px
      width: 100%
      height: 100%
      background: #fff
      color: #8b8b8b
      .content-wrapper
        display: flex
        padding: 10px 0
        .wrapper-left
          flex: 0 0 135px
          padding: 6px 0
          width: 135px
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          text-align: center
          @media only screen and (max-width: 320px)
            flex: 0 0 120px
            width: 120px
          .score
            margin-bottom: 6px
            line-height: 28px
            font-size: 24px
            color: rgb(255, 153, 0)
          .title
            margin-bottom: 8px
            font-size: 12px
            line-height: 12px
            color: rgb(7, 17, 27)
          .rank
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
        .wrapper-right
          flex: 1
          padding: 6px 0 6px 24px
          @media only screen and (max-width: 320px)
            padding-left: 6px
          .score-wrapper
            margin-bottom: 8px
            font-size: 0
            .title
              display: inline-block
              font-size: 12px
              color: rgb(7, 17, 27)
              line-height: 18px//给子元素加
              vertical-align: top
            .star
              display: inline-block
              margin: 0 12px
              vertical-align: top
            .score
              display: inline-block
              line-height: 18px//给子元素加 
              vertical-align: top
              font-size: 12px
              color: rgb(255, 153, 0)
          .delivery-wrapper
            font-size: 0
            .title
              font-size: 12px
              color: rgb(7, 17, 27)
              line-height: 18px//给子元素加
            .deliveryTime
              font-size: 12px
              margin-left: 12px
              color: rgb(7, 17, 27)
      .ratings-wrapper
        padding: 0px 10px 
        .item
          display: flex
          padding: 18px 0
          border-bottom: 1px solid rgba(7, 17, 27, 0.1)
          .avatar
            flex: 0 0 28px
            width: 28px;
            margin-right: 12px;
            .img
              border-radius: 50%
          .content
            position: relative
            flex: 1
            .name
              line-height:  12px
              font-size: 10px
              margin-bottom: 4px
              color: rgb(1, 17, 27)
            .star-wrapper
              margin-bottom: 6px
              font-size: 0
              .star
                display: inline-block
                vertical-align: top 
                margin-right: 6px
              .delivery
                display: inline-block
                vertical-align: top 
                color: rgb(147, 153, 159)
            .text
              line-height: 18PX
              color: rgb(7, 17, 27)
              margin-bottom: 18px
              font-size: 12px
            .recommend
              line-height: 16px
              font-size: 0
              .icon, .item
                display: inline-block
                margin: 0 8px 4px 0
                font-size: 9px
              .icon
                color: #ffc95d
                font-size: 18px
              .item
                padding: 0 6px
                border: 1px solid rgba(7, 17, 27, 0.1)
                border-radius: 1px
                color: rgb(147, 153, 159)
                background: #fff
            .time
              position: absolute
              top: 0
              right: 0
              line-height: 12px
              font-size: 10px
              color: rgb(147, 153, 159)
</style> 