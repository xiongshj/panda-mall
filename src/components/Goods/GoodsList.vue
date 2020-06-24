
<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :key="item.title" :goods-item="item" />
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'

export default {
  name: 'GoodsLists',
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.goods {
  display: flex;
  justify-content: space-around;
  flex-flow: row wrap;
  padding: 2px;
}
</style>
