<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <scroll
      ref="scroll"
      :data="watchDataObj"
      :probe-type="3"
      :pull-up-load="true"
      class="content"
      @scroll="contentScroll"
      @pulling-up="loadMore"
    >
      <home-swiper :banners="banners" />
      <home-recommend :recommends="recommends" />
      <feature-view />
      <tab-control ref="tabControl" :titles="['流行','新款','精选']" @tab-click="tabClick" />
      <goods-list :goods="showGoods" />
    </scroll>

    <back-top v-show="isBackTopShow" @click.native="backTopClick" />
  </div>
</template>

<script>
import NavBar from 'components/navbar/NavBar'
import TabControl from 'components/TabControl/TabControl'
import GoodsList from 'components/Goods/GoodsList'
import Scroll from 'components/Scroll/Scroll'
import BackTop from 'components/BackTop/BackTop'

import HomeSwiper from './components/HomeSwiper'
import HomeRecommend from './components/HomeRecommend'
import FeatureView from './components/FeatureView'

import { debounce } from '@/utils'

import { getHomeMultidata, getHomeGoods } from '@/api/home'

export default {
  name: 'Home',
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
    HomeSwiper,
    HomeRecommend,
    FeatureView
  },
  data() {
    return {
      tabOffsetTop: 0,
      currentType: 'pop',
      isBackTopShow: false,
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      }
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    },
    watchDataObj() {
      const obj = {
        banners: this.banners,
        recommends: this.recommends,
        goods: this.goods
      }
      return obj
    }
  },
  created() {
    // 获取多个数据
    this.getHomeMultidata()

    // 获取商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    // 监听GoodsListItem中图片加载完成
    // 在mounted阶段获取refs
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    this.$bus.$on('item-image-load', () => {
      refresh()
    })

    // 获取tabControl的offsetTop
    // 所有的组件都有一个属性$el：用于获取组件中的元素
    // this.tabOffsetTop = this.$refs.tabControl
    console.log(this.$refs.tabControl.$el.offsetTop)
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
      }
    },
    backTopClick() {
      // 调用scroll组件的scrollTo方法
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll(position) {
      this.isBackTopShow = -position.y > 1000
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },

    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        // 完成上拉加载更多后调用
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
#home {
  position: relative;
  height: 100vh;
  padding-top: 44px;
}

.home-nav {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 9;
  color: #fff;
  background: #ff8e96;
}

.content {
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 49px;
  left: 0;
  overflow: hidden;
}
</style>
