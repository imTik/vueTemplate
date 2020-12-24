import Vue from 'vue';
import Vuex from 'vuex';
import LOCAL from '../utils/localStorageFn';

import user from './module/user';
// import packageConfig from '../../package';

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    user
  },
  state: {
    keepAliveLists: []
  },
  mutations: {
    // 保存组件缓存列表
    SAVE_KEEP_ALIVE(state, name) {
      let index = state.keepAliveLists.indexOf(name);
      if (index === -1) state.keepAliveLists.push(name);
    },
    DEL_KEEP_ALIVE(state, name) {
      let index = state.keepAliveLists.indexOf(name);
      if (index > -1) state.keepAliveLists.splice(index, 1);
    }
  },
  getters: {
    KEEP_ALIVE_LISTS: state => state.keepAliveLists
  }
});
