<template>
  <div id="app">
    <tab></tab>
    <keep-alive>
      <router-view></router-view> 
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
/* eslint-disable no-new */

  import Tab from 'base/tab/tab'

  export default {
    components: {
      Tab
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
