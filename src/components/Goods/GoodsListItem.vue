<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" @load="imageLoad" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    imageLoad() {
      this.$bus.$emit('item-image-load')
    },
    itemClick() {
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  }
}
</script>

<style lang="less" scoped>
.goods-item {
  position: relative;
  width: 48%;
  padding-bottom: 40px;

  img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    position: absolute;
    right: 0;
    bottom: 5px;
    left: 0;
    overflow: hidden;
    font-size: 12px;
    text-align: center;

    p {
      overflow: hidden;
      margin-bottom: 3px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .price {
      margin-right: 20px;
      color: #ff8396;
    }

    .collect {
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: -1px;
        left: -15px;
        width: 14px;
        height: 14px;
        background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
      }
    }
  }
}
</style>
