<template>
  <div class="goods">
  	<scroll class="foods-wrapper" :data="items">
      <div>
        <ul>
          <li v-for="item in items" class="item">
            <ul>
              <li v-for="ele in item.foods" class="ele">
                <div class="icon">
                    <img v-lazy="ele.icon" height="100" width="114">
                </div>
                <div class="text-wrapper">
                  <div class="title">
                    <h3 class="h3 fl">{{ele.name}}</h3>
                    <span class="iconfont icon-gengduo fr"></span>
                  </div>
                  <!--star行-->
                  <div class="description">
                    <star :size="36" :score="seller.score" class="star fl"></star>
                    <span class="score">{{seller.score}}</span>
                    <span class="btext">月售{{ele.sellCount}}</span>
                  </div> 
                  <!--起送行-->  
                  <div class="price">
                    <span class="charging">起送<span class="money">¥{{ele.charging}}</span></span>
                    <span class="distribution">配送<span class="money">¥{{ele.distribution}}</span></span>
                    <span class="average">人均<span class="money">¥{{ele.average}}</span></span>
                  </div>
                  <div class="foods-type">
                    <span class="iconfont icon-store icon"></span>
                    <span class="text">{{ele.classifications}}</span>
                  </div>
                  <!--type开始
                  <div class="type">
                    <ul v-if="seller.supports" class="supports">
                      <li class="support-supp" v-for="supp
             in seller.supports">
                        <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                        <span class="text">{{seller.supports[0].description}}</span>
                      </li>
                    </ul>
                  </div>
                  type开始-->
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
  	</scroll>
    <div class="loading-content" v-show="!items.length">
      <loading></loading>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import star from 'components/star/star'
  import loading from 'base/loading/loading'
  import Scroll from 'base/scroll/scroll'

  export default {
  	props: {
  		goods: {
  			type: Object
  		}
  	},
  	data() {
  		return {
  			items: [],
  		}
  	},
  	created() {
  		axios.get('../data.json').then((res) => {
        this.items = res.data.goods
        this.seller = res.data.seller
        //console.log(this.item.foods)
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
    .item
      width: 100%
      height: 100%
      .ele
        display: flex
        //margin-top: 18px
        //height: 110px
        //width: 100%
        margin-bottom: 15px
        //overflow: hidden
        .icon
          flex: 0 0 114px
        .text-wrapper
          flex: 1
          margin-left: 10px
          //margin-bottom: 32px
          width: 100%
          //height: 85px
          //overflow: hidden
          //align-items: center//垂直方向居中
          .title
            height: 25px
            margin-bottom: 5px
            .h3
              font-size: 20px
              color: #303030
              font-weight: bold
          .description
            height: 20px
            width: 210px
            display: inline-block
            text-align: center
            margin-bottom: 5px
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
            height: 20px
            width: 100%
            color: #666666
            font-size: 14px
            line-height: 20px
            margin-bottom: 15px
            .charging
              margin-right: 6px
              .money
                padding-right: 10px
                border-right: 1px solid #ccc
                margin-left: 6px
            .distribution
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
            .icon
              height: 20px
              width: 20px
            .text
              font-size: 14px
              color: #424242
              line-height: 20px
              margin-left: 3px
  .loading-content
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style> 