<template>
  <div class="cart-list">
    <scroll ref="scroll" class="content">
      <cart-list-item v-for="item in cartList" :key="item.id" :product="item" />
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
  watch: {
    cartList(val) {
      this.$refs.scroll.refresh()
    }
  }
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
