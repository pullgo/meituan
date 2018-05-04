<template>
  <div class="recommend">
    <div class="recommend-content">
      <div class="slider-wrapper"></div>
      <div class="recommend-list">
        <h1 class="list-title">推荐</h1>
        <ul></ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  //import {getRecommend} from 'api/recommend'
  //import {ERR_OK} from 'api/config'
  export default {
    created() {
      this._getRecommend()
    },
    methods: {
      _getRecommend() {
        getRecommend().then((res) => {
          if(res.code === ERR_OK) {
            console.log(res.huodong)
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style> 