<template>
  <div id="detail">
    <detail-nav-bar />
    <detail-swiper :top-images="topImages" />
  </div>
</template>

<script>
import DetailNavBar from './components/DetailNavBar'
import DetailSwiper from './components/DetailSwiper'

import { getDetail } from '@/api/detail'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper
  },
  data() {
    return {
      id: null,
      topImages: []
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
        this.topImages = res.result.itemInfo.topImages
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
