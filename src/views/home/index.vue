<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend :recommends="recommends"></home-recommend>
    <feature-view></feature-view>
    <tab-control :titles="['流行','新款','精选']" class="tab-control"></tab-control>

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

import HomeSwiper from './components/HomeSwiper'
import HomeRecommend from './components/HomeRecommend'
import FeatureView from './components/FeatureView'

import { getHomeMultidata } from '@/api/home'

export default {
  name: 'Home',
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    HomeRecommend,
    FeatureView
  },
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  created() {
    getHomeMultidata().then(res => {
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
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
}
</style>
