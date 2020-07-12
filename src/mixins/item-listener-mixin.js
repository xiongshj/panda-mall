import { debounce } from '@/utils'
import BackTop from 'components/BackTop/BackTop'

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    // 监听GoodsListItem中图片加载完成
    // 在mounted阶段获取refs
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('item-image-load', this.itemImgListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isBackTopShow: false
    }
  },
  methods: {
    backTopClick() {
      // 调用scroll组件的scrollTo方法
      this.$refs.scroll.scrollTo(0, 0)
    }
  }
}
