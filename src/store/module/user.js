import LOCAL from '../../utils/localStorageFn';
import { getSignatureByApp, loginWX } from '../../api/API';
import { getUrlParams, getUrlNoHash } from '../../utils/index';

let user_module = {
  state: {
    insideAppName: 'test',
    userInfo: null,
    token: '',
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
  },
  getters: {
    INSIDE_APP_NAME: (state) => state.insideAppName,
    USER_INFO: (state) => {
      if (!state.userInfo) state.userInfo = LOCAL.get('USER_INFO');
      return state.userInfo;
    },

    TOKEN: (state) => {
      if (!state.token) state.token = LOCAL.get('TOKEN');
      return state.token;
    },
  },
  actions: {
    // CODE登录
    async loginByCode({ commit, state }) {
      let code = getUrlParams('code');
      let params = {
        appName: state.insideAppName,
        code,
        dept: true,
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
        url: getUrlNoHash(),
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
        jsApiList: ['chooseImage', 'uploadImage'], // 具体参考企业微信API
      });
    },
  },
};

export default user_module;
