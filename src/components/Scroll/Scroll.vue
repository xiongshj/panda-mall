<template>
  <div ref="wrapper" class="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
// import Pullup from '@better-scroll/pull-up'

// BScroll.use(Pullup)

export default {
  name: 'Scroll',
  props: {
    /**
     * 列表的数据
     */
    data: {
      type: Object,
      default: null
    },
    /**
     * 当数据更新后，刷新scroll的延时。
     */
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  watch: {
    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    data: {
      handler: function(newValue, oldValue) {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      },
      deep: true
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: 3
      // scrollY: true,
      // pullUpLoad: true
    })

    this.scroll.on('scroll', position => {
      console.log(position)
    })

    // this.scroll.on('pullingUp', () => {
    //   console.log('--------------上拉')
    //   // this.scroll.finishPullUp()
    // })
  },
  methods: {
    refresh() {
      // 代理better-scroll的refresh方法
      this.scroll && this.scroll.refresh()
    },
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
