<template>
  <div class="FindList">
    <div class="findList-wrapper" v-for="item in findList">
      <FindItem :data="item"></FindItem>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import FindItem from 'base/find-item/find-item';
  import axios from 'axios';
  
  export default {
    data() {
      return {
        findList: []
      };
    },
    created() {
      axios.get('../data.json').then((res) => {
        this.findList = res.data.findList;
        // console.log(this.findList);
      });
    },
    // methods: {
    // },
    components: {
      FindItem
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .order
    color: #ccc
</style> 