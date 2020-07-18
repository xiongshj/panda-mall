<template>
  <div v-show="show" class="toast">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    message: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 8px 10px;
  color: #fff;
  background: rgba(0, 0, 0, 0.75);
  transform: translate(-50%; -50%);
}
</style>
