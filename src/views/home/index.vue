<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend :recommends="recommends"></home-recommend>
    <feature-view></feature-view>
    <tab-control :titles="['流行','新款','精选']" class="tab-control" @tab-click="tabClick"></tab-control>
    <goods-list :goods="showGoods"></goods-list>

    <div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
      <div>~~~---------</div>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/navbar/NavBar'
import TabControl from 'components/TabControl/TabControl'
import GoodsList from 'components/Goods/GoodsList'

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
    HomeSwiper,
    HomeRecommend,
    FeatureView
  },
  data() {
    return {
      currentType: 'pop',
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
</style>
