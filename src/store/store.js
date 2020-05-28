import Vue from 'vue';
import Vuex from 'vuex';
import localFn from '../utils/localStorageFn';
import packageConfig from '../../package';

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    appName: packageConfig.name,
    insideAppName: 'questionnaire',

    keepAliveLists: [],
    userInfo: null,

    token: '',

  },
  mutations: {

    // 保存用户信息
    SAVE_USER_INFO (state, data) {
      state.userInfo = data;
      localFn.saveUserInfo(data);
    },

    // 保存组件缓存列表
    SAVE_KEEP_ALIVE (state, data) {
      if (!data.status) return;
      let index = state.keepAliveLists.indexOf(data.name);
      if (data.status === 'save') {
        if (index === -1) state.keepAliveLists.push(data.name);
      } else if (data.status === 'del') {
        let index = state.keepAliveLists.indexOf(data.name);
        state.keepAliveLists.splice(index, 1);
      }
    }

  },
  getters: {

    APP_NAME: state => state.appName,
    INSIDE_APP_NAME: state => state.insideAppName,
    
    KEEP_ALIVE_LISTS: state => state.keepAliveLists,

    USER_INFO: state => {
      if(!state.userInfo) state.userInfo = localFn.getLocalData('USER_INFO');
      return state.userInfo;
    },

    TOKEN: state => {
      if(!state.token) state.token = localFn.getLocalData('TOKEN');
      return state.token;
    },

  },
})
