import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    x_name: '',
    socketId: '',
  },
  mutations: {
    setName (state, payload) {
      state.x_name = payload
    }
  },
  actions: {

  }
})
