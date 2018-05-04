<template>
  <div id="app">
    <zheader></zheader>
    	<keep-alive>
    		<router-view></router-view>
    	</keep-alive>
      <tab></tab>
  </div>
</template>

<script type="text/ecmascript-6">
/* eslint-disable no-new */
import Zheader from 'components/z-header/z-header'
import Tab from 'components/Tab/Tab'


  export default {
    components: {
      Zheader,
      Tab
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
         
</style>
