<template>
  <div class="back-top">
    <img class="img" src="~assets/img/common/back_top.png" />
  </div>
</template>

<script>
export default {
  name: 'BackTop'
}
</script>

<style lang="less" scoped>
.back-top {
  position: fixed;
  right: 8px;
  bottom: 55px;

  .img {
    width: 43px;
    height: 43px;
  }
}
</style>
