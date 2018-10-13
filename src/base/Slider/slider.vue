<!--轮播图组件-->
<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <!--小圆点-->
    <div class="dots">
       <span class="dot" v-for="(item, index) in dots" :class="{active: currentPageIndex === index}"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import {addClass} from 'common/js/dom';
  export default {
    data() {
      return {
        dots: [],
        currentPageIndex: 0 // 默认第几页
      };
    },
    props: { // 外部组件控制组件的属性
      loop: { // 是否循环轮播
        type: Boolean,
        default: true
      },
      autoPlay: { // 是否自动轮播
        type: Boolean,
        default: true
      },
      interval: { // 轮播的间隔
        type: Number,
        default: 4000
      }
    },
    mounted() { // 初始化better-scroll
      setTimeout(() => { // 浏览器刷新时间17S  推荐20s
        this._setSliderWidth(); // 封装到methods里面 容易维护
        this._initDots();// 自动轮播的 小圆点
        this._inSlider();
        if (this.autoPlay) {
          this._play();
        }
      }, 20);
      window.addEventListener('resize', () => { // 屏幕改变大小slider 宽度还是不变  监听resize窗口改变事件 
        if (!this.slider) {
          return;
        }
        this._setSliderWidth(true);
        this.slider.refresh() ;// 重新计算宽度
      });
    },
    methods: { // 将mounted方法封装进来
      _setSliderWidth(isResize) { // 横向滚动的一个宽度 isResize标志位窗口事件
          this.children = this.$refs.sliderGroup.children; //获得列表的元素个数
         // console.log(this.children.length)  7多了2个
          let width = 0;
          let sliderWidth = this.$refs.slider.clientWidth; // 父元素的宽度
          for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]; // 是child 不是children 否则会提示找不到children
          addClass(child, 'slider-item'); // DOM操作 统一在dom.js里面 给每个元素添加slider-item 的class
          child.style.width = sliderWidth + 'px'; // child宽度等于父容器的宽度
          width += sliderWidth; // 总的宽度累加
         };
         if (this.loop && !isResize) { // 克隆2倍DOM宽度用于循环切换 窗口事件isResize
          width += 2 * sliderWidth;
          // console.log(width)//3000
         }
         this.$refs.sliderGroup.style.width = width + 'px';
      },
      _initDots() { // 自动轮播 小圆点
          this.dots = new Array(this.children.length); // 长度为5的空数组
      },
      _inSlider() { // 初始化slide 
          this.slider = new BScroll(this.$refs.slider, {
            scrollX: true,  // 横向滚动 大写
            scrollY: false, // 纵向滚动  大写
            momentum: false, // 惯性
            snap: true,
            snapLoop: this.loop, // 循环等于传入的循环
            snapThreshold: 0.3,
            snapSpeed: 400
            // click: true如果加了这句 会与better-scroll fastclick冲突造成轮播图点击补跳转页面 这句应该取消
          });
          // 维护currentPageIndex
          this.slider.on('scrollEnd', () => { // 绑定scrollEnd事件
            let pageIndex = this.slider.getCurrentPage().pageX;
            if (this.loop) { // 如果是循环的 则-1
              pageIndex -= 1;
            }
            this.currentPageIndex = pageIndex;
            if (this.autoPlay) {
              clearTimeout(this.timer); // 自动轮播前clear
              this._play();
            }
          });
      },
       _play() { // 自动播放 修改currentPageIndex
        let pageIndex = this.currentPageIndex + 1;
        if (this.loop) {
          pageIndex += 1;
        }
        this.timer = setTimeout(() => { // 自动播放定时器
          this.slider.goToPage(pageIndex, 0, 400); // Bscroll接口goToPage  0 代表Y方向 ageIndex 代表x方向  400是滚动间隔
        }, this.interval);
       }
    },
    destroyed() {
    // 清除组件里面有计时器的时候在组件销毁的时候应该destroyed的是奇偶及销毁 是好的编程习惯
      clearTimeout(this.timer);
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        //overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>