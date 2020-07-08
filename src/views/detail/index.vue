<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" />
    <scroll ref="scroll" class="content">
      <detail-swiper :top-images="topImages" @image-load="imageLoad" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/Scroll/Scroll'

import DetailNavBar from './components/DetailNavBar'
import DetailSwiper from './components/DetailSwiper'
import DetailBaseInfo from './components/DetailBaseInfo'
import DetailShopInfo from './components/DetailShopInfo'

import { debounce } from '@/utils'

import { getDetail, Goods, Shop } from '@/api/detail'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll
  },
  data() {
    return {
      id: null,
      topImages: [],
      goods: {},
      shop: {}
    }
  },
  created() {
    this.id = this.$route.params.id
    this.getDetailData()
  },
  methods: {
    getDetailData() {
      getDetail(this.id).then(res => {
        console.log(res)
        const data = res.result
        // 获取顶部的图片轮播数据
        this.topImages = data.itemInfo.topImages

        // 获取商品信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        )

        // 创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
      })
    },
    imageLoad() {
      const refresh = debounce(this.$refs.scroll.refresh, 50)
      refresh()
    }
  }
}
</script>

<style lang="less" scoped>
#detail {
  position: relative;
  z-index: 9;
  height: 100vh;
  background: #fff;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background: #fff;
}

.content {
  height: calc(100% - 44px);
}
</style>
