<template>
  <div class="shopcart-icon" ref="shopcart-icon"
    @touchstart.prevent='touchStart'
    @touchmove.prevent='touchMove'
    @touchsend.prevent='touchEnd'
  >
    <div class="ShopCartIcon-wrapper" ref="remove">
      <div ref="ShopCartIcon-content" class="ShopCartIcon-content"">   
        <span class="iconfont icon-gouwucheman"></span>
        <!--购物车选择多少个 v-show="totalCount>0"{{totalCount}}-->
        <div class="num"></div>
      </div>      
    </div>
    <!--购物车详情页--> 
    <div class="ShopCartIcon-list">
      <!--购物车头部--> 
      <div class="list-header">
        <div class="list-left">
          <span class="iconfont return icon-fanhui"></span>
          <span class="text">购物车</span>
        </div>
        <div class="list-right">
          <span class="text">编辑</span>
        </div>
      </div>
      <!--购物车内容部分--> 
      <!--<div class="list-content">
        <ul>
          <li v-for="item in items" class="item">
            <ul>
              <li v-for="ele in item.foods" class="ele">
                <div class="address">
                  <span class="text">{{seller.name}}</span>
                </div>
                <div class="content">
                  <img  v-lazy="ele.icon" height="100" width="114"/>
                  <span class="title">{{ele.name}}</span>
                  <span class="count">数量 待     </span>
                   {{totalPrice}}--> 
                  <!--<span class="price">￥</span>
                </div>
                <div class="other-price">
                  <span>包装费 待</span>
                  <!--{{deliveryPrice}}--> 
                  <!--<span class="desc">另需配送费￥元</span>
                </div>
                <div class="ZPrice-wrapper">
                  <span class="ZPrice"></span>
                  <span>去结算</span>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>--> 
    </div>
    <!--购物车详情页-->
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  
  export default {
    props: {
      touch: 'touthes',
    },
    data() {
      return {
        items: [],
        startX: 0,//开始触摸的位置
        moveX: 0,//滑动时的位置
        endX: 0,//结束触摸的位置
        disX: 0,//移动的位置
      }
    },
    created() {
      axios.get('../data.json').then((res) => {
        this.items = res.data.goods
        this.seller = res.data.seller
        //console.log(this.item.foods)
      })
    },
    methods: {
      //购物车动效
      touchStart:function(ev) {
        ev = ev || event;
        //ev.preventDefault();
        //console.log(ev.targetTouches);
        //console.log(ev.changedTouches);  
        if (ev.touches.length == 1) {
          this.startY = ev.touches[0].clientY; // 记录开始位置 clientY Y轴坐标的位置  x=event.screenX 相对于屏幕的 x 和 y 坐标
        //console.log(this.startY)
        this.$emit('touch-start', event)
        }      
      },
      touchMove:function(ev) {
        ev = ev || event;
        //ev.preventDefault();//阻止事件相关的的默认行为
        //console.log(ev.targetTouches);
        //console.log(ev.changedTouches);
        if(ev.touches.length == 1) {
          //滑动时距离浏览器的距离
          this.moveY = ev.touches[0].clientY;
          //console.log(this.moveY);
          //实时的滑动的距离-起始位置=实时移动的位置
          this.disY = this.moveY-this.startY;
          //console.log(this.disY);往上滑是负数  往下滑是正数
          if(this.disY < 0) {
            this.$refs.ShopCartIcon.style ="display:none";
            //transform:translateX(-30px)
          this.$emit('touch-move', event)
          }
        }
      },
      touchEnd:function(ev) {
        ev = ev || event;
        //ev.preventDefault();
        //console.log(ev.changedTouches);
        if(ev.changedTouches.length == 1) {
          let endY = ev.changedTouches[0].clientY;
          this.disY = endY-this.startY;
          //console.log(this.disY,'this.disY')
          if(this.disY < 0) {
            this.$refs.ShopCartIcon.style = 'transform:translateX(30px)';
            this.$emit('touch-end', event)
          }
        }
      }      
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .ShopCartIcon-wrapper
    position: fixed
    bottom: 68px
    right: 20px
    border-radius: 50%
    border: 1px solid #727272
    background: #fff
    width: 28px
    height: 28px
    padding: 6px
    .ShopCartIcon-content
      position: relative
      top: 5px
      left: 5px

</style> 