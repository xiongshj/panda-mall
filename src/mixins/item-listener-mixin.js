import { debounce } from '@/utils'

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
