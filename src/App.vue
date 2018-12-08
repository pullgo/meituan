<template>
  <div id="app">
    <tab></tab>
    <keep-alive>
      <router-view :seller="seller"></router-view> 
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
/* eslint-disable no-new */

  import Tab from 'base/tab/tab';
  import {urlParse} from 'common/js/util';
  import axios from 'axios';
  const ERR_OK = 0;
  export default {
    data() {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse(); // 立即执行函数
            return queryParam.id;
          })()
        }
      };
    },
    created() {
      axios.get('../data.json?id=' + this.seller.id).then((res) => { // 加上?id=' + this.seller.id)
        this.seller = res.data.seller;
        this.goods = res.data.goods;
        this.ratings = res.data.ratings;
        // this.seller = Object.assign({},this.seller.response.data);
        // ES6 方法 assign VUE官网  得到后台缓存数据
      });
    },
    components: {
      Tab
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
</style>
