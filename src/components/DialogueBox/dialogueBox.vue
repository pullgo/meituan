<template>
	<!--点击消息弹出聊天页面-->
	<div class="DialogueBox" v-show="showDialogueBox">
		<div class="dialogueBox-wrapper">
			<div class="wrapper-title">
				<span class="iconfont return icon-fanhui" @click="hideDialogueBox"></span>
				<h1 class="dialogueBox-title">{{seller.name}}</h1>
				<span class="iconfont telephone icon-dianhua"></span>
				<span class="text">进店</span>
			</div>
			<!--中心内容区域-->
			<div class="dialogueBox-content">
				<span class="content-warn">商家可能比较繁忙，若回复较慢，请电话联系</span>
				<div class="dialogueBox-info">                  
					<div class="icon" height="57" width="57">
						<img :src="goods[0].foods[0].icon" height="57" width="57">
					</div>
					<div class="info-content">
						<h2 class="name">{{goods[0].foods[0].name}}</h2>
						<div class="price">
							<span class="now">￥{{goods[0].foods[0].price}}</span><span class="old" v-show="goods[0].foods[0].oldPrice">￥{{goods[0].foods[0].oldPrice}}</span>
						</div>
						<span class="info-text">发送商品链接</span>
					</div>
				</div>
			</div>
			<!--输入框区域-->
			<div class="dialogueBox-input">
				<span class="iconfont say icon-chakantiezimaikefeng"></span>
				<input v-focus type="text" class="input-box" placeholder="输入消息" v-focus="true">
				<span class="iconfont  menu-icon icon-caidan1"></span>
				<span class="iconfont add-box icon-jia"></span>
			</div>
		</div>
	</div>  
</template>
<script type="text/ecmascript-6">
  import axios from 'axios';
  export default {
    data() {
      return {
        dialogueBoxShow: false,
        seller: '',
        goods: '',
        foods: ''
      };
    },
    created() {
      axios.get('../data.json').then((res) => {
        this.goods = res.data.goods;
        this.foods = res.data.foods;
        this.seller = res.data.seller;
        // console.log(this.seller);
      });
    },
    methods: {
      showDialogueBox() {
        this.dialogueBoxShow = true;
      },
      hideDialogueBox() {
        this.dialogueBoxShow = false;
      }
    },
    directives: {
      focus: {
        // 指令的定义
        inserted: function (el) {
          el.focus();
        }
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .DialogueBox
    position: fixed
    top: 0
    left: 0
    width 100%
    height: 100%
    background: #f3f5f7
    // z-index: 1
    .dialogueBox-wrapper
      margin: 1px
      .wrapper-title
        width: 100%
        height: 50px
        line-height: 50px
        font-size: 20px
        background: #fff
        .return
          margin-left 10px
        .dialogueBox-title
          display: inline-block
          font-size: 18px
          margin-left: 60px
        .telephone
          font-size: 22px
          margin-right: 10px
          margin-left: 20px
          color: #909090
        .text
          border: 1px solid #909090
          font-size: 10px
          padding: 4px
          color: #909090
      .dialogueBox-content
        height: 80px
        line-height: 80px
        text-align: center
        .content-warn
          color: #cdd0d2
          font-size: 12px
        .dialogueBox-info
          display: flex
          margin: 10px
          padding-bottom: 18px//描边不紧贴底部
          border-1px(rgba(7, 17, 27, 0.1))
          height: 80px
          background: #fff
          .icon
            flex: 0 0 57px//左右分栏布局
            margin: 10px
          .info-content
            flex: 1//左右分栏布局
            position: relative
            text-align: left
            display: inline-bloc
            .name
              // display: inline-block
              margin: 15px 0 0px 0
              font-size: 14px
              height: 14px
              line-height: 18px
              color: rgb(7, 17, 27)
            .price
              font-weight: 700
              line-height: 24px
              display: inline-block
              .now
                margin-right: 8px
                font-size: 14px 
                color: rgb(240, 20, 20) 
              .old
                text-decoration: line-through
                font-size: 10px 
                color: rgb(147, 153, 159)
            .info-text
              height: 24px
              line-height: 24px
              padding: 3px 18px
              box-sizing: border-box
              font-size: 14px
              border-radius: 12px
              color: #ffc95d
              border: 1px solid #ffc95d
      .dialogueBox-input
        position: fixed
        bottom: 40px
        left: 0px
        background: #fff
        height: 48px
        width: 100%
        line-height: 48px
        .say
          margin-left: 10px;
          margin-right: 10px
          font-size: 28px
          color: #909090
        .input-box
          width: 60%;
          margin-right: 10px;
          border: 1px solid #dcdcdc;
          height: 25px;
          font-size: 14px;
          padding: 4px;
          background: #fafcff
          border-radius: 6px
        .menu-icon
          padding-right: 10px
          font-size: 28px
          color: #909090
        .add-box
          padding-right: 10px
          font-size: 28px
          color: #909090
</style> 