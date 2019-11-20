import Vue from 'vue'
import Vuex from 'vuex'
import localFn from './utils/localStorageFn'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    appId: '1000014',
    appName: 'TourRoadmap',
    corpID: 'ww23abd7b4543370ca',
    batchNumber: 63, // 63

    keepAliveLists: [],

    userInfo: {},
    storeInfo: {},

  },
  mutations: {

    // 保存用户信息
    SAVE_USER_INFO (state, data) {
      state.userInfo = data;
      localFn.saveUserInfo(data);
    },

    // 保存batchNumber
    SAVE_BATC_NUMBER(state, data) {
      state.batchNumber = data;
      localFn.saveBatchNumber(data);
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

    APP_ID: state => state.appId,
    APP_NAME: state => state.appName,
    CORP_ID: state => state.corpID,
    KEEP_ALIVE_LISTS: state => state.keepAliveLists,

    BATCH_NUMBER: state => {
      if(!state.batchNumber) state.batchNumber = localFn.getBatchNumber();
      return state.batchNumber;
    },


  },
})
