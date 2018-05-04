<template>
    <div class="tab">
  	  	<router-link to="/sale">
			<i class="iconfont icon-icon"></i>
			<span>今日特卖</span>
  	  	</router-link>
  	  	<router-link to="/special">
  	  		<i class="iconfont icon-tejiajinxingshi"></i>
			<span>淘特价</span>
		</router-link>
  	  	<router-link to="/spell">
  	  		<i class="iconfont icon-pintuanzhuanqu"></i>
			<span>拼团</span>
		</router-link>
  	  	<router-link to="/ShoppingCart">
  	  		<i class="iconfont icon-gouwucheman"></i>
			<span>购物车</span>
		</router-link>
  	  	<router-link to="/me">
  	  		<i class="iconfont icon-04f"></i>
			<span>我的</span>
		</router-link>
    </div>	
</template>

<script type="text/ecmascript-6">
  export default {
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.tab
		display: flex
		position: fixed
		bottom: 0px
		left: 0px
		width: 100%
		height: 68px
		font-size: 16px
		align-items: center//上下居中
		border: 1px solid #ccc
		a//子元素直接写a就可以了 
			display: flex
			flex: 1
			flex-direction: column//上下排布 列布局
			align-items: center//内容居中
			&.active
				color: #e70041
			i
				display: inline-block
				font-size: 20px
				padding-bottom: 10px
				padding-top: 10px
</style> 