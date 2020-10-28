import Vue from 'vue';
import Vuex from 'vuex';
import LOCAL from '../utils/localStorageFn';
// import packageConfig from '../../package';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    // appName: packageConfig.name,
    insideAppName: 'questionnaire',

    keepAliveLists: [],
    userInfo: null,

    token: ''
  },
  mutations: {
    // 保存用户信息
    SAVE_USER_INFO(state, data) {
      state.userInfo = data;
      LOCAL.set('USER_INFO', data);
    },

    SAVE_TOKEN(state, data) {
      state.token = data;
      LOCAL.set('TOKEN', data);
    },

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
    // APP_NAME: state => state.appName,
    INSIDE_APP_NAME: state => state.insideAppName,

    KEEP_ALIVE_LISTS: state => state.keepAliveLists,

    USER_INFO: state => {
      if (!state.userInfo) state.userInfo = LOCAL.get('USER_INFO');
      return state.userInfo;
    },

    TOKEN: state => {
      if (!state.token) state.token = LOCAL.get('TOKEN');
      return state.token;
    }
  }
});
