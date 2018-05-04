<template>
	<div class="star" :class="starType">
		<span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item" :key="index"></span>
	</div>
</template>

<script type="text/ecmascript-6">
	const LENGTH = 5
	const CLS_ON = 'on'
	const CLS_OFF = 'off'
	const CLS_HALF = 'half'

	export default {
		props: {
			size: {
				type: Number
			},
			score: {
				type: Number
			}
		},
		computed: {
			starType() {
				return 'star-' + this.size;//拼接一个class 比如star-48/35/24
			},
		itemClasses() {
			let result = [];
			//4.3->4向下取0.5倍数的值
			let score = Math.floor(this.score * 2) / 2;
			//判断是否有小数 不为0则是有小数的
			let hasDecimal = score % 1 !== 0;
			//整数 全心
			let integer = Math.floor(score);
			for (let i = 0; i < integer; i++) {
				result.push(CLS_ON);
				}
			if (hasDecimal)	{
				result.push(CLS_HALF);
				}
			while (result.length < LENGTH) {
				result.push(CLS_OFF);
				}
 		       return result;
			}	
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">

	@import "../../common/stylus/mixin.styl"
	
	.star
		font-size: 0
		.star-item
			display: inline-block
			background-repeat: no-repaet
			width: 100%
			height: 100%
		&.star-48
			background-size: 20px 20px
			.star-item
				width: 20px
				height: 20px
				margin-right: 22px
				background-size: 20px 20px
				&:last-child
					margin-right: 0
				&.on
					bg-image('star48_on')
				&.half
					bg-image('star48_half')
				&.off
					bg-image('star48_off')
		&.star-36
			.star-item
				width: 15px
				height: 15px
				margin-right: 8px
				background-size: 15px 15px
				&:last-child
					margin-right: 0
				&.on
					bg-image('star36_on')
				&.half
					bg-image('star36_half')
				&.off
					bg-image('star36_off')
		&.star-24
			.star-item
				width: 10px
				height: 10px
				margin-right: 3px
				background-size: 10px 10px
				&:last-child
					margin-right: 0
				&.on
					bg-image('star24_on')
				&.half
					bg-image('star24_half')
				&.off
					bg-image('star24_off')
</style>
