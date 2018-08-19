<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  
  export default {
    props: {
      probeType: {//什么情况下都可以监听到
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      // listenScroll: {
        // type: Boolean,
        // default: false
      // },
      data: {
        type: Array,
        default: null
      },
      // pullup: {
        // type: Boolean,
        // default: false
      // },
      // beforeScroll: {
        // type: Boolean,
        // default: false
      // },
     //  refreshDelay: {
        // type: Number,
        // default: 20
      // }
    },
    mounted() {//初始化后调用地方
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll() {//初始化
        if (!this.$refs.wrapper) {//this.$refs.wrapper无值是返回
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {//初始化
          probeType: this.probeType,
          click: this.click
        })
        if (this.listenScroll) {
          let me = this
          this.scroll.on('scroll', (pos) => {//pos位置
            me.$emit('scroll', pos)//派发scroll事件
          })
        }
      //   if (this.pullup) {
      //     this.scroll.on('scrollEnd', () => {
      //       if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
      //         this.$emit('scrollToEnd')
      //       }
      //     })
      //   }
      //   if (this.beforeScroll) {
      //     this.scroll.on('beforeScrollStart', () => {
      //       this.$emit('beforeScroll')
      //     })
      //   }
      },
      disable() {//代理
        this.scroll && this.scroll.disable()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      refresh() {//刷新scroll 重新计算高度
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {//A-Z滚动条 滚动到相对应的位置
        //调用betscroot方法
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)//apply传参
      },
      scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {//观测data变化 
      data() {
        setTimeout(() => {
          this.refresh()
        }, 20)
      }
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>