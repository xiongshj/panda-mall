<template>
  <div class="detail-swiper">
    <swiper class="swiper">
      <swiper-item v-for="(item, index) in topImages" :key="index">
        <img :src="item" />
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'components/swiper'

export default {
  name: 'DetailSwiper',
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.swiper {
  overflow: hidden;
  height: 300px;
}
</style>
