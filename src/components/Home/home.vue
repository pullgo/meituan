<template>
  <div class="home">
    <!--头部开始-->
    <div class="head" ref="head">
      <div class="head_address" ref="headAddress">
        <i class="iconfont icon-ziyuan address_icon"></i>
        <span class="address">日立汽车系统(广州)有限公司(...</span>      
        <router-link :to="{path:'/home/massage'}">
          <span class="iconfont icon-xiaoxi fr"></span>
        </router-link> 
        <transition name="hide">
          <router-view></router-view>       
        </transition> 
      </div>
      <div id="fixedSearch" :class="fixedSearch?isFixed:noFixed" ref="fixedSearch" >
        <input type="text" class="input" placeholder="面包鲜花">
        <span class="iconfont icon-search icon"></span>
      </div>
    </div>
    <!--头部end-->
    <!--轮播图组件开始-->
    <scroll ref="scroll" class="slider-content">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div v-for="item in recommends">
              <a :href="item.linkUrl">
                <img :src="item.picUrl"/>
              </a>
            </div>
          </slider>
        </div>
      </div>
    </scroll>      
    <!--轮播图组件end-->
    <!--菜单切换组件start-->
    <swich></swich>
    <!--菜单切换组件end-->
    <!--优惠专区start-->
    <div class="FavorableZone">
      <h1 class="h1">优惠专区</h1>
      <div class="specialPic">
        <div class="specialPic-fl">
          <p class="text1">天天特价</p>
          <p class="text2">周三半价日</p>
          <p class="text3">疯抢仅一天</p>
        </div>
        <div  class="specialPic-fr">
          <p class="text1">餐餐优惠</p>
          <p class="text2">汇聚午时</p>
          <p class="text3">套餐19.9</p>
        </div>
      </div>
      <div class="sellPic">
        <ul class="clearfix">
          <li class="fl">
            <img src="../../common/image/sellPic4.png" width="78" height="98px">
          </li>
          <li class="fl">
            <img src="../../common/image/sellPic4.png" width="78" height="98px">
          </li>
          <li class="fl">
            <img src="../../common/image/sellPic4.png" width="78" height="98px">
          </li>
          <li class="fl">
            <img src="../../common/image/sellPic4.png" width="78" height="98px">
          </li>
        </ul>
      </div>
    </div>
    <!--优惠专区end-->
    <!--为你优选start -->  
    <div class="FavorableZone1">
      <h1 class="h1">为你优选</h1>
      <div class="specialPic1">
        <div class="specialPic1-fl">
          <div class="background"></div>
          <div class="text-content">
            <p class="text-content1">优选菜品</p>
            <p class="text-content2">为你选择最好的</p>
          </div>
        </div>
        <div  class="specialPic1-fr" >
          <div class="background"></div>
          <div class="text-content">
            <p class="text-content1">品质单人餐</p>
            <p class="text-content2">精心搭配套餐</p>
          </div>
        </div>
      </div>
    </div>
    <!--为你优选end--> 
    <!--商家start--> 
    <h1 class="h1">附近商家</h1>
    <div class="sell-title clearfix">
      <select name="select" class="select fl">
        <option class="option" value="综合排序" selected>综合排序</option>
        <option class="option" value="速度最快">速度最快</option>
        <option class="option" value="评分最高">评分最高</option>
        <option class="option" value="起送价最低">起送价最低</option>
        <option class="option"  value="配送费最低">配送费最低</option>
        <option class="option"  value="人均高到低">人均高到低</option>
        <option class="option"  value="人均低到高">人均低到高</option>
      </select>
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
    <goods></goods>
    <!--商家end--> 
    <!--购物车start
    <shopcart ref="shopcart" @touch="touthes"
    ></shopcart>-->
    <!--购物车end-->
    <!--店铺页面start-->
    <!--店铺页面start-->
  </div>
</template>

<script type="text/ecmascript-6">
  
  import Slider from 'base/Slider/slider'
  import Scroll from 'base/Scroll/scroll'
  import axios from 'axios'
  import Swich from 'components/Swich/Swich'
  import Goods from 'components/Goods/goods'
  import Massage from 'components/Massage/massage'
  import Shopcart from 'components/Shopcart/shopcart'


  export default {
    props: {
      slider: {
        type: Object
      }
    },
    data() {
      return {
        recommends: [],
        isFixed:'isFixed',
        noFixed:'noFixed',
        fixedSearch: false,
      }
    },
    //购物车有商品的时候
    computd: {
      //totalCount() {
        //let count = 0; 
      //}
    },
    created() {
      axios.get('../data.json').then((res) => {
        this.recommends = res.data.slider
        //this.messages = res.data.messages
        //console.log(this.messages)
      })
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll)//添加滚动监听事件
    },
    methods: {
      //滑动搜索框特效
      handleScroll () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || 
        document.body.scrollTop;
        if (scrollTop > 0) {
          this.fixedSearch = true;
          this.$refs.headAddress.style="display:none";
          //this.$refs.head.style.tranform = `translate3d(0,40px,0)`
        } else{
          this.fixedSearch = false;
          this.$refs.headAddress.style="display:block";
        }
          return ''        
        //console.log(offsetTop)
      },
      touthes(event) {
        this.$emit('touchStart','touchMove','touchEnd', event)      
      },
    },
    destroyed () {//销毁
      window.removeEventListener('scroll', this.handleScroll);
    },
    components: {
      Slider,
      Scroll,
      Swich,
      Goods,
      Massage
      //Shopcart
    },
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
//@import "../../common/stylus/mixin"
.home
  position: relative
  height: 100%
  overflow-y: auto
  background: #fff
  .head
    width: 100%
    height: 80px
    position: relative
    background: #ffc847
    .head_address
      padding: 15px
      .icon-xiaoxi
        font-size: 18px
    .isFixed
      position: fixed
      top: 0
      left: 0
      background: #fff
      width: 100%
      padding-top: 5px
      padding-bottom: 5px
      z-index: 500
      .input
        width: 88%
        height: 30px
        padding-left: 25px
        margin-left: 10px
        background: #e1e1e1
        border-radius: 3px
      .icon
        position: absolute
        top: 12px
        left: 15px
        width: 15px
        height: 15px 
        background: #e1e1e1     
    .noFixed
      position: relative
      text-aglin: center
      .input
        width: 88%
        height: 30px
        padding-left: 25px
        margin-left: 10px
      .icon
        position: absolute
        top: 8px
        left: 15px
        width: 15px
        height: 15px
  .FavorableZone
    width: 100% 
    padding-top: 10px
    .specialPic
      padding-top: 10px
      //width: 375px
      display: flex
      .specialPic-fl
        flex: 1
        width: 170px
        height: 120px
        margin-right: 10px
        margin-left: 10px
        background: url(special1.png) no-repeat
        background-size: 100% 100%
        .text1
          width: 60px
          height: 14px
          background: #fc84ac
          font-size: 10px
          color: #fff
          padding: 2px
          text-align: center
          border-bottom-right-radius: 10px
        .text2
          width: 80px
          height: 20px
          background: #888585
          margin-top: 20px
          font-size: 14px
          color: #fff
          padding: 2px
          text-align: center
        .text3
          width: 60px
          height: 12px
          background: #e8d162
          font-size: 6px
          color: #1f1e1e
          padding: 2px
          text-align: center
      .specialPic-fr
        flex: 1
        width: 170px
        height: 120px
        margin-right: 10px
        background: url(special2.png) no-repeat
        background-size: 100% 100%
        .text1
          width: 64px
          height: 14px
          line-height: 14px
          background: #fc84ac
          font-size: 10px
          color: #fff
          padding: 2px
          text-align: center
          border-bottom-right-radius: 10px
        .text2
          width: 80px
          height: 20px
          line-height: 20px
          background: #888585
          margin-top: 20px
          font-size: 14px
          color: #fff
          padding: 2px
          text-align: center
        .text3
          width: 60px
          height: 12px
          line-height: 12px
          background: #e8d162
          font-size: 6px
          color: #1f1e1e
          padding: 2px
          text-align: center
  .FavorableZone1
    width: 100% 
    z-index: -2
    .specialPic1
      padding-top: 10px
      //width: 375px
      display: flex
      padding: 10px
      .specialPic1-fl
        flex: 1
        width: 170px
        height: 120px
        margin-right: 10px
        background: url(special1.png) no-repeat
        background-size: 100% 100%
        position: relative
        .background
          width: 100%
          height: 100%       
          background: rgba(0, 0, 0, 0.5)
        .text-content
          width: 100px
          height: 50px
          background: #fff
          position: absolute
          top: 50%
          left: 20%
          .text-content1
            color: #1f1e1e
            line-haight: 16px
            font-size: 16px
            text-align: center
            margin-top: 5px
            font-weight: bold
          .text-content2
            color: #1f1e1e
            line-haight: 12px
            font-size: 10px
            text-align: center
            margin-top: 10px
      .specialPic1-fr
        flex: 1
        width: 170px
        height: 120px
        margin-left: 10px
        background: url(special2.png) no-repeat
        background-size: 100% 100%
        position: relative
        .background
          width: 100%
          height: 100%        
          background: rgba(0, 0, 0, 0.5)
        .text-content
          width: 100px
          height: 50px
          background: #fff
          position: absolute
          top: 50%
          left: 20%
          .text-content1
            color: #1f1e1e
            line-haight: 16px
            font-size: 16px
            text-align: center
            font-weight: bold
            margin-top: 5px
          .text-content2
            color: #1f1e1e
            line-haight: 12px
            font-size: 10px
            text-align: center
            margin-top: 10px
  .sellPic
    width: 100%
    padding: 10px
    ul li
      width: 78px
      margin-right: 13px
  .sell-title
    width: 100%
    margin-left: 10px
    height: 20px
    line-height: 20px 
    display: flex
    margin-top: 10px
    .select
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
  //打开massgae消息页面的动画 因为是属于路由里面的动画 应该在router-view外一层做 否则无效果
  .hide-enter-active, .hide-leave-active 
    transition: opacity .5s
  .hide-enter, .hide-leave-active
    opacity: 0
</style> 