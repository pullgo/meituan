<template>
  <div class="goods">
    <h1 class="h1">附近商家</h1>
    <div class="goods-title clearfix">
      <div class="selectWrapper" :data="lists">
        <ul class="selectList">
          <li class="list" v-for="list in lists" :key="list.code">
            <span>{{lists.text}}00112</span>
          </li>
        </ul>
      </div>
      <!--<select name="select" class="select fl">
        <option class="option" value="综合排序" selected>综合排序</option>
        <option class="option" value="速度最快" @click="selectSort">速度最快</option>
        <option class="option" value="评分最高" @click="selectSort">评分最高</option>
        <option class="option" value="起送价最低">起送价最低</option>
        <option class="option" value="配送费最低">配送费最低</option>
        <option class="option" value="人均高到低">人均高到低</option>
        <option class="option" value="人均低到高">人均低到高</option>
      </select>-->
      <div class="list1">
        <span>销量最高</span>
      </div> 
      <div class="list2">
        <span>离我最近</span>
      </div> 
      <div class="list3">
        <span>筛选</span>
        <i class="iconfont icon-shaixuan i" width="15" height="15"></i>
      </div>
    </div>  
  	<div class="goods-wrapper" :data="poilist">
      <scroll ref="scroll" class="goods-content">
        <div>
          <ul>
            <router-link  :to="{path:'/home/menu'}">
              <li v-for="item in items" class="item" :key="item.code">
                <div class="icon">
                  <img v-lazy="item.pic_url" height="100" width="114">
                </div>
                <div class="text-wrapper">
                  <div class="title">
                    <h3 class="h3 fl">{{item.name}}</h3>
                    <span class="iconfont icon-gengduo fr"></span>
                  </div>
                  <!--star行-->
                  <div class="description" >
                    <star :size="36" :score="item.wm_poi_score" class="star fl"></star>
                    <span ref="sortList" class="score">{{item.wm_poi_score}}
                    </span>
                    <span class="btext">月售{{item.month_sale_num}}</span>
                  </div> 
                  <!--起送行-->  
                  <div class="price">
                    <span class="charging">{{item.min_price_tip}}</span>∣
                    <span class="average">{{item.average_price_tip}}</span>
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
        lists: [
          {
            text: '综合排序'
          },
          {
            text: '速度最快'
          },
          {
            text: '评分最高'
          },
          {
            text: '起送价最低'
          },
          {
            text: '配送费最低'
          },
          {
            text: '人均高到低'
          },
          {
            text: '人均低到高'
          }
        ]
  		};
  	},
    created() {
      axios.get('../data.json').then((res) => {
        this.goods = res.data.goods;
        this.seller = res.data.seller;
        this.items = res.data.poilist;
        // console.log(this.items.length);
      });
    },
    computed: {
      selectSort() {
        console.log(this.click);
        var len = this.items.length;
        for (var i = 0; i < len; i++) {
          // alert('123');
        }
      }
    },
    mothods: {

    },
    components: {
      star,
      loading,
      Scroll
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .goods-title
    width: 100%
    margin-left: 10px
    height: 20px
    line-height: 20px 
    display: flex
    margin-top: 10px
    .selectWrapper
      flex: 1
      border: none
      margin-right: 15px
      height: 20px
      line-height: 20px 
    .list1
      flex: 1
      font-size: 12px
      line-height: 20px
      height: 20px
      margin-right: 15px
    .list2
      flex: 1
      font-size: 12px
      line-height: 20px
      margin-right: 15px
      height: 20px
      border-right: 1px solid #ccc
    .list3
      flex: 1
      font-size: 12px
      height: 20px
      line-height: 20px
  .goods-wrapper	
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
        .goods-type
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