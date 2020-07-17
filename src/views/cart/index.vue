<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <cart-list />
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from 'components/navbar/NavBar'
import CartList from './components/CartList'
import CartBottomBar from './components/CartBottomBar'
import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    /**
     * 两种语法
     */
    // ...mapGetters({
    //   length: 'cartLength'
    // })
    ...mapGetters(['cartLength'])
  }
}
</script>

<style lang="less" scoped>
.cart {
  height: 100vh;
}

.nav-bar {
  color: #fff;
  background: #ff8e96;
}
</style>
