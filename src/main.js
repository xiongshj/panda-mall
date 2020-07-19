import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'

import toast from 'components/Toast' // 导入js的优先级比vue文件高，所以这里导入的是index.js文件

// 给Vue的prototype加上$bus(事件总线)
Vue.prototype.$bus = new Vue()

// 安装toast插件
Vue.use(toast)

// 解决移动端300ms延迟
FastClick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
