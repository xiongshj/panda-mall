<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/navbar/NavBar'
import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  components: {
    NavBar
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
.nav-bar {
  color: #fff;
  background: #ff8e96;
}
</style>
