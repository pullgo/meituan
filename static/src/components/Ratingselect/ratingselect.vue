<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span @click="select(2, event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count ">{{ratings.length}}</span></span>
      <span  @click="select(0, event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span  @click="select(1, event)" class="block negetive" :class="{'active':selectType===1}">{{desc.negetive}}<span class="count">{{negetive.length}}</span></span>
    </div>
    <div class="switch" :class="{'on':onlyContent}" @click="toggleContent">
      <span></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  const POSITIVE = 0;// 正
  const NEGATIVE = 1;// 负
  const ALL = 0;// 全部评价
  export default {
    props: {
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
      selectType: {// 选择类型
        type: Number,
        default: ALL// 默认显示所有的
      },
      onlyContent: {// 读内容或者不读内容 是布尔值
        type: Boolean,
        default: false
      },
      desc: {// 描述
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negetive: '不满意'
          };
        }
      }
    },
    methods: {
      select(type, event) {
        if (!event._constructed) {
          return;
        }
        this.selectType = type;
        // 点击更改按钮后告知父级 值告诉父的变化 父就可以监听组件
        this.$emit('ratingtype.select', type);
      },
      toggleContent(event) {
        if (!event._constructed) {
          return;
        }
        this.onlyContent = !this.onlyContent;
        // 告诉content.toggle把onlyContent传出去
        this.$emit('content.toggle', this.onlyContent);
      }
    },
    computed: {
      positives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      negetive() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"

  .ratingselect
    .rating-type
      padding: 10px 0
      margin: 0 0px//padding的话下划线会满
      //border-1px(rgba(7, 17, 27, 0.1))
      //border: 1px solid #ffc95d
      font-size: 0
      .block
        display: inline-block//有间隙 父级加font size
        padding: 8px 12px
        border-radius: 2px
        margin-right: 8px
        font-size: 12px
        line-height: 16px
        color: rgb(77, 85, 93)
        &.active
          color: #fff
        .count
          font-size: 8px
          margin-left: 2px
        &.positive
          background: #fff
          &.active
            background: #ffc95d
            color: #383838
        &.negative
          background: rgba(77, 85, 93, 0.2)
          &.active
            background: #ffc95d
            color: #383838
    .switch
      //padding: 12px 18px
      line-height: 24px
      border-bottom: rgba(7, 17, 27, 0.1)
      color: rgb(147, 153, 159)
      font-size: 0
      &.on
        .icon-check_circle
          color: #00B43C
      .icon-check_circle
        margin-right: 4px
        display: inline-block
        vertical-align: top
        font-size: 24px
      .text
        font-size: 12px
        display: inline-block
        vertical-align: top






</style>