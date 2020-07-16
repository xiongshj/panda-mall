<template>
  <div class="cart-list">
    <scroll ref="scroll" class="content">
      <cart-list-item v-for="item in cartList" :key="item.id" :item-info="item" />
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/Scroll/Scroll'
import CartListItem from './CartListItem'
import { mapGetters } from 'vuex'

export default {
  name: 'CartList',
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    // 回到购物车页面调用方法使得滚动正常
    // 也可以监听cartList的变化来实现
    this.$refs.scroll.refresh()
  }
  // watch: {
  //   cartList(val) {
  //     this.$refs.scroll.refresh()
  //   }
  // }
}
</script>

<style lang="less" scoped>
.cart-list {
  height: calc(100% - 44px - 49px);
}

.content {
  overflow: hidden;
  height: 100%;
}
</style>
