import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    // mutations唯一的目的就是修改state中的状态
    // mutations中的每个方法尽可能完成的事件比较单一一点
    addCounter(state, payload) {
      payload.count++
    },
    addToCart(state, payload) {
      payload.checked = true
      state.cartList.push(payload)
    }
  },
  actions: {
    addCart(context, payload) {
      // 查找之前数组中是否有该商品
      const oldProduct = context.state.cartList.find(
        item => item.id === payload.id
      )

      // 判断oldProduct
      if (oldProduct) {
        context.commit('addCounter', oldProduct)
      } else {
        payload.count = 1
        context.commit('addToCart', payload)
      }
    }
  },
  modules: {},
  getters
})
