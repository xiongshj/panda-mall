<template>
  <div id="detail">
    <detail-nav-bar />
    <detail-swiper :top-images="topImages" />
    <detail-base-info :goods="goods" />
  </div>
</template>

<script>
import DetailNavBar from './components/DetailNavBar'
import DetailSwiper from './components/DetailSwiper'
import DetailBaseInfo from './components/DetailBaseInfo'

import { getDetail, Goods } from '@/api/detail'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo
  },
  data() {
    return {
      id: null,
      topImages: [],
      goods: {}
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
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
