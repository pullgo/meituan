<template>
  <div class="order">
    <div class="fixedBox">
      <div class="title-box">
        <span class="title">订单</span>
        <span class="iconfont icon-search icon"></span>
      </div>
      <div class="ttab">
        <span class="ttab-item active">
          <router-link to="/order/all">全部订单</router-link>
        </span>
        <span class="ttab-item">
          <router-link to="/order/NRatings">待评价</router-link>
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
    <div v-for="item in orderData" :value="item.code" :key="item.code" class="item">
      <order-item :data="item"></order-item>
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
      width: 100%
      position: fixed
      top: 0px
      left: 0px
      padding-top: 10px
      background: #f3f3f373
      .title-box
        width: 100%
        height: 30px
        text-align: center
        line-height: 30px
        .title
          color: #000
          font-size: 20px
          margin-left: 15px
        .icon
          float: right
          font-size: 24px
          margin-right: 15px
      .ttab
        width: 100%
        height: 40px
        display: flex
        line-height: 40px
        border-1px(rgba(7, 17, 27, 0.1))
        margin-left: 20px
        padding-top: 20px
        padding-left: 10px
        .ttab-item
          flex: 1
          text-align: center
          & > a
            display: block
            font-size: 16px
            color: rgb(77, 85, 93)
            &.active
              border-bottom: 4px solid #ffc95d
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
</style> 