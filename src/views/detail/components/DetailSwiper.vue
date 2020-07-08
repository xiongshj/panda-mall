<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="(item, index) in topImages" :key="index">
      <img :src="item" @load="imageLoad" />
    </swiper-item>
  </swiper>
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
  },
  methods: {
    imageLoad() {
      this.$emit('image-load')
    }
  }
}
</script>

<style lang="less" scoped>
.detail-swiper {
  overflow: hidden;
  height: 300px;
}
</style>
