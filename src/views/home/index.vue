<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <scroll
      ref="scroll"
      :data="watchDataObj"
      :probe-type="3"
      class="content"
      @scroll="contentScroll"
    >
      <home-swiper :banners="banners" />
      <home-recommend :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行','新款','精选']" class="tab-control" @tab-click="tabClick" />
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
    this.getHomeMultidata()

    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
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
      // 调用 scroll 组件的 scrollTo 方法
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll(position) {
      console.log(position)
      this.isBackTopShow = -position.y > 1000
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

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}

.content {
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 49px;
  left: 0;
  overflow: hidden;
}

/* .content {
  overflow: hidden;
  height:calc(100%-93px);
  margin-top:44px;
} */
</style>
