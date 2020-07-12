<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          :key="item"
          :class="{active: index === currentIndex}"
          class="title-item"
          @click="titleClick(index)"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/navbar/NavBar'

export default {
  name: 'DetailNavBar',
  components: {
    NavBar
  },
  data() {
    return {
      currentIndex: 0,
      titles: ['商品', '参数', '评论', '推荐']
    }
  },
  methods: {
    backClick() {
      this.$router.back()
    },
    titleClick(index) {
      this.currentIndex = index
      this.$emit('title-click', index)
    }
  }
}
</script>

<style lang="less" scoped>
.back {
  img {
    width: 30px;
    height: 20px;
    margin-top: 12px;
  }
}

.title {
  display: flex;
  font-size: 13px;

  .title-item {
    flex: 1;
  }
}

.active {
  color: #ff8396;
}
</style>
