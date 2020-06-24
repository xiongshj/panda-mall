<template>
  <div class="tab-control">
    <div
      v-for="(item,index) in titles"
      :key="item"
      :class="{active: index === currentIndex}"
      class="tab-control-item"
      @click="itemClick(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('tab-click', index)
    }
  }
}
</script>

<style lang="less" scoped>
.tab-control {
  display: flex;
  height: 40px;
  font-size: 15px;
  line-height: 40px;
  text-align: center;
  background: #fff;
}

.tab-control-item {
  flex: 1;

  span {
    padding: 5px;
  }
}

.active {
  color: #ff8396;

  span {
    border-bottom: 3px solid #ff8396;
  }
}
</style>
