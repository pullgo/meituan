<template>
  <div class="head">
    <div class="content-wrapper">
    <!--图标栏-->
      <div class="icon-content">
        <div class="icon-left">
        <router-link :to="{path:'/home'}">
          <i class="iconfont icon-ziyuan"></i>
        </router-link>
        <router-view></router-view>
        </div>
        <div class="icon-right">
          <i class="iconfont icon-search"></i>
          <i class="iconfont icon-shoucang1"></i>
          <i class="iconfont icon-pin"></i>
          <!--更多-->
          <i class="iconfont icon-gengduo"></i>
        </div>
      </div>
    <!--商家消息栏-->
      <div class="description">
        <div class="avatar">
          <img width="64" height="64" :src="seller.avatar">
        </div>
        <div class="description-content">
            <div class="name">{{seller.name}}</div>
            <!--公告-->
            <div class="notice"></div>
            <div class="rating">{{ratings.text}}</div>
        </div>
      </div>
    </div>      
    <!--优惠消息栏-->
      <div v-if="seller.supports" class="supports">
        <div class="icon-wrapper">
          <icon :size="12" :class="classMap[seller.supports[0].type]"></icon>
        </div>
        <span class="text">{{seller.supports[0].description</span>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import icon from 'components/icon/icon'

  export default {
    // props: {
    // },
    // data() {
    // },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    // methods: {
    // },
    components: {
      icon
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style> 