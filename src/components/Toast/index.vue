<template>
  <div v-show="isShow" id="toast" class="toast">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message = '默认文字', duration = 2000) {
      this.isShow = true
      this.message = message

      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration)
    }
  }
}
</script>

<style lang="less" scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 9;
  padding: 8px 10px;
  color: #fff;
  background: rgba(0, 0, 0, 0.75);
  transform: translate(-50%; -50%);
}
</style>
