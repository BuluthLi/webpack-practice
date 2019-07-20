import Vue from 'vue';
import Vuex from 'vuex';
import add from './modules/add'
Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    add
  },
  strict: debug,
})
