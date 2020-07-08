<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" />
    <scroll ref="scroll" class="content">
      <detail-swiper :top-images="topImages" @image-load="imageLoad" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @image-load="imageLoad2" />
      <detail-param-info :param-info="paramInfo" />
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/Scroll/Scroll'

import DetailNavBar from './components/DetailNavBar'
import DetailSwiper from './components/DetailSwiper'
import DetailBaseInfo from './components/DetailBaseInfo'
import DetailShopInfo from './components/DetailShopInfo'
import DetailGoodsInfo from './components/DetailGoodsInfo'
import DetailParamInfo from './components/DetailParamInfo'

import { debounce } from '@/utils'

import { getDetail, Goods, Shop, GoodsParam } from '@/api/detail'

export default {
  name: 'Detail',
  components: {
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo
  },
  data() {
    return {
      id: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      DetailParamInfo: {},
      paramInfo: {}
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

        // 保存商品的详情数据
        this.detailInfo = data.detailInfo

        // 获取参数信息
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        )
      })
    },
    imageLoad() {
      const refresh = debounce(this.$refs.scroll.refresh, 50)
      refresh()
    },
    imageLoad2() {
      this.$refs.scroll.refresh()
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
