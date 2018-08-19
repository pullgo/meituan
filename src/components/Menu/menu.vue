<template>
  <div class="menu">
  <!--左边-->
    <div class="menu-left">
      <ul>
        <li v-for="(item, index) in items" class="menu-item">
          <span class="text">
            <div class="icon-wrapper">
            <icon class="icon" :size="12" :class="classMap[item.type]"></icon>{{item.name}}
            </div>
          </span>
        </li>
      </ul>
    </div>
  <!--右边-->
    <div class="menu-right">
      <ul>
        <li v-for="(item,index) in items" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item border-1px">
              <div class="icon" height="57" width="57">
                <img :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}个</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import loading from 'base/loading/loading'
  import Scroll from 'base/Scroll/scroll'
  import Icon from 'base/Icon/icon'

  export default {
    props: {
      goods: {
        type: Object
      }
    },
  	data() {
  		return {
        items: []
  		}
  	},
  	created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  		axios.get('../data.json').then((res) => {
        this.items = res.data.goods
        this.seller = res.data.seller
        //console.log(2)
  		})
	  },
    computed: {
    },
    components: {
      loading,
      Scroll,
      Icon
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"

  .menu
    display: flex
    position: absolute
    top: 190px
    bottom: 56px
    width: 100%
    overflow: hidden
    .menu-left
      flex: 0 0 90px//等分 内容的缩放情况 占位宽度
      width: 90px//不写这个 在安卓有兼容问题
      background: #f3f5f7
      color: #8b8b8b
      .menu-item
        display: table //一行或者多行垂直居中
        height: 54px
        width: 80px
        line-height: 14px
        padding: 0 5px//居中
        &.current
          position: relative
          z-index: 10
          margin-top: -1px//盖住
          background: #fff
          font-weight: 700
        .text
          border-none()
          display: table-cell//格子
          width: 70px
          vertical-align: middle//垂直居中
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
          .icon-wrapper
            display: inline-block
            vertical-align: top
    .menu-right
      flex: 1
      overflow: hidden
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dd1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px//描边不紧贴底部
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0//最后一个屋描边
        .icon
          flex: 0 0 57px//左右分栏布局
          margin-right: 10px
        .content
          flex: 1//左右分栏布局
          font-size: 0
          .name
            display: inline-block
            margin: 2px 0 8px 0
            font-size: 14px
            height: 14px
            line-height: 18px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            display: inline-block
            margin: 3px 0px 3px 1px
          .extra
            .count
              margin-right: 10px
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
              color: rgb(147, 153, 159)</style> 