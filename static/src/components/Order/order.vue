<template>
  <div class="order">
    <div class="fixedBox">
      <div class="title-left">
        <span class="title">订单</span>
      </div>
      <div class="title-right">
        <span class="iconfont icon-search icon"></span>
      </div>
      <div class="ttab">
        <span class="ttab-item active">
          <router-link to="/order">全部订单</router-link>
        </span>
        <span class="ttab-item">
          <router-link to="/order/toBeEvaluated">待评价</router-link>
        </span>
        <span class="ttab-item">
          <router-link to="/order/refund">退款</router-link>
        </span>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <!--订单列表-->
    <div class="item-wrapper">
      <div v-for="item in orderData" :value="item.code" :key="item.code" class="item">
        <order-item :data="item"></order-item>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  import OrderItem from 'base/order-item/order-item';
  export default {
    data() {
      return {
        orderData: []
      };
    },
    created() {
      axios.get('../data.json').then((res) => {
        this.orderData = res.data.poilist;
      });
    },
    components: {
      OrderItem
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .order
    width: 100%
    height: 100%
    .fixedBox
      position: fixed
      top: 0px
      left: 0px
      width: 100%
      padding-top: 10px
      background: #ffc847
      color: #383838
      z-index: 10
      border-bottom: 10px solid #ededed
      .title-left
        width: 100%
        height: 30px
        display: inline
        // text-align: center
        // line-height: 30px
        .title
          color: #000
          font-size: 20px
          margin-left: 10rem
      .title-right
        float: right
        .icon
          font-size: 24px
          margin-right: 30px
          color: #000
      .ttab
        width: 100%
        height: 40px
        display: flex
        line-height: 40px
        border-1px(rgba(7, 17, 27, 0.1))
        margin-left: 20px
        .ttab-item
          flex: 1
          text-align: center
          & > a
            display: block
            font-size: 16px
            color: #7c7f82
            &.active
              color: #000
        .text
          position: absolute
          right: 38px
          bottom: 10px
          z-index: 10
          height: 24px
          line-height: 24px
          padding: 0 12px
          box-sizing: border-box
          font-size: 10px
          border-radius: 12px
          color: #ffc95d
          border: 1px solid #ffc95d    
    .item-wrapper
      position: absolute
      top: 84px
      left: 0px
</style> 