<template>
  <div id="detail">
    <detail-nav-bar ref="nav" class="detail-nav" @title-click="titleClick" />
    <scroll ref="scroll" :probe-type="3" class="content" @scroll="contentScroll">
      <detail-swiper :top-images="topImages" @image-load="imageLoad" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @image-load="imageLoad2" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <back-top v-show="isBackTopShow" @click.native="backTopClick" />
    <detail-bottom-bar @add-to-cart="addToCart" />
    <!-- <toast :message="message" :show="show" /> -->
  </div>
</template>

<script>
import Scroll from 'components/Scroll/Scroll'
import GoodsList from 'components/Goods/GoodsList'
// import Toast from 'components/Toast'

import DetailNavBar from './components/DetailNavBar'
import DetailSwiper from './components/DetailSwiper'
import DetailBaseInfo from './components/DetailBaseInfo'
import DetailShopInfo from './components/DetailShopInfo'
import DetailGoodsInfo from './components/DetailGoodsInfo'
import DetailParamInfo from './components/DetailParamInfo'
import DetailCommentInfo from './components/DetailCommentInfo'
import DetailBottomBar from './components/DetailBottomBar'

import { debounce } from '@/utils'
import { itemListenerMixin, backTopMixin } from '@/mixins/item-listener-mixin'
import { mapActions } from 'vuex'

import { getDetail, getRecommend, Goods, Shop, GoodsParam } from '@/api/detail'

export default {
  name: 'Detail',
  components: {
    Scroll,
    GoodsList,
    // Toast,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      id: null,
      message: '',
      currentIndex: 0,
      show: false,
      topImages: [],
      recommends: [],
      themeTopYs: [],
      goods: {},
      shop: {},
      detailInfo: {},
      DetailParamInfo: {},
      paramInfo: {},
      commentInfo: {}
    }
  },
  created() {
    this.id = this.$route.params.id
    this.getDetailData() // 获取详情数据
    this.getRecommendData() // 获取推荐数据
  },
  destroyed() {
    this.$bus.$off('item-image-load', this.itemImgListener)
  },
  methods: {
    ...mapActions(['addCart']),
    getDetailData() {
      getDetail(this.id).then(res => {
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

        // 取出评论的信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })
    },
    getRecommendData() {
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
    },
    imageLoad() {
      const refresh = debounce(this.$refs.scroll.refresh, 50)
      refresh()
      this.themeTopYs = []
      this.themeTopYs.push(0 - 44)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
    },
    imageLoad2() {
      this.$refs.scroll.refresh()
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
      this.themeTopYs.push(Number.MAX_VALUE)
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 1000)
    },
    contentScroll(position) {
      // 判断BackTop是否显示
      this.isBackTopShow = -position.y > 1000

      // 获取y值
      const positionY = -position.y

      // positionY和主题中值进行对比
      const length = this.themeTopYs.length
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          i < length - 1 &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
    },
    addToCart() {
      // 获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.id = this.id

      // 将商品添加到购物车里
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res)
      // })
      this.addCart(product).then(res => {
        // this.show = true
        // this.message = res

        // setTimeout(() => {
        //   this.show = false
        //   this.message = ''
        // }, 1500)

        this.$toast.show(res, 2000)
      })
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
  overflow: hidden;
  height: calc(100% - 44px - 58px);
}
</style>
