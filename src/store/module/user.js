import LOCAL from '../../utils/localStorageFn';
import SERVER from '../../api/serverConfig';
import {
  getSignatureByApp,
  loginWX,
  getUserByToken,
  getUserById,
} from '../../api/API';
import { getUrlParams, getUrlNoHash } from '../../utils/index';

let user_module = {
  state: {
    // appName: packageConfig.name,
    insideAppName: 'questionnaire',
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
    }
  },
  getters: {
    // APP_NAME: state => state.appName,
    INSIDE_APP_NAME: state => state.insideAppName,
    USER_INFO: state => {
      if (!state.userInfo) state.userInfo = LOCAL.get('USER_INFO');
      return state.userInfo;
    },

    TOKEN: state => {
      if (!state.token) state.token = LOCAL.get('TOKEN');
      return state.token;
    }
  },
  actions: {
    // TOKEN登录
    async loginByToken({ commit }) {
      let token = getUrlParams('token');
      commit('SAVE_TOKEN', token);
      let tokenParams = { token };
      let { result: tokenResult } = await getUserByToken(tokenParams); // 根据TOKEN获取部分用户信息
  
      let userId = tokenResult.userId;
      let userParams = { userId };
      let { result } = await getUserById(userParams); // 根据ID 获取完整用户信息
      commit('SAVE_USER_INFO', result);
      return result;
    },
  
    // CODE登录
    async loginByCode({ commit, state }) {
      let code = getUrlParams('code');
      let params = {
        appName: state.insideAppName,
        code,
        dept: true
      };
  
      let { result } = await loginWX(params);
      commit('SAVE_USER_INFO', result);
      commit('SAVE_TOKEN', result.token);
      return result;
    },
  
    // 注册SDK
    async initSDK({ state }) {
      let params = {
        appName: state.insideAppName,
        type: 0,
        url: getUrlNoHash()
      };
      let { result } = await getSignatureByApp(params);
      if (!result) console.log('sdk注册失败');
  
      const corpId = getUrlParams('state');
      let { timestamp, noncestr, signature } = result;
      wx.config({
        beta: true,
        debug: false,
        appId: corpId, // 必填，企业微信的corpID SERVER.CORPID
        timestamp,
        nonceStr: noncestr,
        signature,
        jsApiList: ['chooseImage', 'uploadImage'] // 具体参考企业微信API
      });
    },
  
    // 获取门店信息
    async getStoreInfo({ commit, state }, storeId) {
      let user_info = JSON.parse(JSON.stringify(state.userInfo));
      let params = { storeId };
      let { result } = await queryStoreByStoreId(params); // 获取门店信息
      user_info.storeName = result.storeNameShort;
      commit('SAVE_USER_INFO', user_info);
    }
  }
};

export default user_module;
