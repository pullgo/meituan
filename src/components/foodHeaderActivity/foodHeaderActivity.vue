<template><!--活动页面-->
<transition class="fold">
    <div class="foodHeaderActivity">		
		<!--隐藏活动页面-->
		<div class="icon-wrapper">
			<ul>
				<li class="item" v-for="(item, index) in seller.supports">
					<icon class="icons" :size="16" :class="classMap[seller.supports[index].type]"></icon>
					<span class="text">{{seller.supports[index].description}}</span>
				</li>
			</ul>
		</div>
		<!--印象-->
		<div class="info-wrapper">
			<p class="title">印象墙</p>
			<span class="text">服务好<span class="delimiter">∣</span></span>
			<span class="text">包装好</span>
		</div>
		<div class="info-wrapper">
			<p class="title">配送</p>
			<div>
				<span class="text">{{seller.description}}<span class="delimiter">∣</span></span>
				<span class="text">配送费<span class="monery">¥</span>{{seller.deliveryPrice}}<span class="delimiter">∣</span></span>
				<span class="text">{{seller.deliveryTime}}分钟</span>
				<span class="ttext">配送时间：00:00-01:00,09:00-23:59</span>
			</div>
		</div>    
		<div class="info-wrapper">
			<p class="title">公告</p>
			<div>
				<span class="text">所有美好的记忆和爱都应该被珍藏，用心为你。</span>
			</div>
		</div>
		<!--印象-->
		<div class="pullUp" @click="hideFoodHeaderActivity">
			<span class="iconfont icon-shangla-yuan"></span>
		</div>    
    </div>
</transition>		
</template>
<script type="text/ecmascript-6">
import axios from 'axios';
import Icon from 'base/Icon/icon';
export default {
    data() {
      return {
        seller: []
      };
    },
    created() {
        axios.get('../data.json').then((res) => {
			this.seller = res.data.seller;
        });
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
	},
     methods: {
		hideFoodHeaderActivity() {
			this.$router.push('/home/menu');
		}
	},
    components: {
      Icon
    }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.foodHeaderActivity
		position: relative
		padding-bottom: 30px
		margin-top: 5px
		padding: 0px 10px 0px 10px;
		height: 100%
		background: #f3f5f7
		z-index: 300
		.icon-wrapper
			margin-bottom: 30px
			color: #343434
			.item
				maigin-top: 5px
				.icons
					margin-bottom: 10px
				.text
					font-size: 10px
		.info-wrapper
			margin-bottom: 30px
			.title
				font-size: 16px
				color: #373737
				margin-bottom: 5px
			.text
				font-size: 12px
				color: #7d7d7d
				margin-bottom: 5px
				.monery
					margin-left: 3px
					margin-right: 3px
				.delimiter
					margin-left: 3px
					margin-right: 3px        
			.ttext
				display: block
				font-size: 12px
				color: #7d7d7d
				margin-top: 5px
		.pullUp
			text-align: center
			position: relative
			padding-bottom: 60px
    		margin-top: 130px
			.icon-shangla-yuan
				position: absolute
				left: 50%
				transform: translateX(-50%)
				font-size: 24px
				color: #343434
</style> 