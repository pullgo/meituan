<template>
  <div class="goods">
  	<div class="foods-wrapper">
      <scroll ref="scroll" class="goods-content" :data="poilist">
        <div>
          <ul>
            <router-link  :to="{path:'/home/food'}">
              <li v-for="item in items" class="item">
                <div class="icon">
                    <img v-lazy="item.pic_url" height="100" width="114">
                </div>
                <div class="text-wrapper">
                  <div class="title">
                    <h3 class="h3 fl">{{item.name}}</h3>
                    <span class="iconfont icon-gengduo fr"></span>
                  </div>
                  <!--star行-->
                  <div class="description">
                    <star :size="36" :score="item.wm_poi_score" class="star fl"></star>
                    <span class="score">{{item.wm_poi_score}}
                    </span>
                    <span class="btext">月售{{item.month_sale_num}}</span>
                  </div> 
                  <!--起送行-->  
                  <div class="price">
                    <span class="charging">{{item.min_price_tip}}</span>∣
                    <span class="average">{{item.average_price_tip}}</span>
                  </div>
                  <div class="foods-type">
                    <ul v-if="item.discounts2" class="supports">
                      <li class="support-supp" v-for="supp
             in item.discounts2[0]">
                        <span class="iconfont icon-store icon"></span>
                        <span class="text border-1px">{{item.discounts2[0].info}}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </router-link>  
          </ul>
        </div>
      </scroll>
  	</div>
    <div class="loading-content" v-show="!items.length">
      <loading></loading>
    </div>
    <router-view></router-view> 
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  import star from 'base/star/star';
  import loading from 'base/loading/loading';
  import Scroll from 'base/Scroll/scroll';
  
  export default {
    props: {
      poilist: {
        type: Object
      }
    },
  	data() {
  		return {
  			items: [],
  		};
  	},
  	created() {
  		axios.get('../data.json').then((res) => {
        this.goods = res.data.goods;
        this.seller = res.data.seller;
        this.items = res.data.poilist;
        // console.log(this.items)
  		})
	  },
    components: {
      star,
      loading,
      Scroll
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .foods-wrapper	
   	margin: 10px
    background: #fff
    .item
      width: 100%
      height: 110px
      position: relative
      display: flex
      margin-bottom: 15px
      overflow: hidden
      .icon
        flex: 0 0 114px
      .text-wrapper
        flex: 1
        margin-left: 10px
        width: 100%
        .title
          height: 25px
          margin-bottom: 5px
          .h3
            font-size: 18px
            color: #282828
            font-weight: bold
        .description
          height: 20px
          width: 210px
          display: inline-block
          text-align: center
          margin-bottom: 2px
          margin-top: 2px
          .score
            font-size: 14px
            line-height: 20px
            color: #666666
            margin-right: 8px
          .btext
            font-size: 14px
            line-height: 20px
            color: #666666
        .price
          height: 25px
          width: 100%
          color: #666666
          font-size: 15px
          line-height: 25px
          margin-bottom: 5px
          .charging
            margin-right: 6px
            .money
              padding-right: 10px
              margin-left: 6px
          .average
            margin-right: 6px
            .money
              padding-right: 10px
              margin-left: 6px
        .foods-type
          height: 20px
          display: inline-block
          .text
            font-size: 12px
            color: #424242
            line-height: 20px
            border: 1px solid #c9e2e1
            padding: 2px
            margin-bottom: 6px
  .loading-content
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style> 