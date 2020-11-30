import SERVER from '../api/serverConfig';
import {
  getSignatureByApp,
  loginWX,
  getUserByToken,
  getUserById,
  queryStoreByStoreId
} from '../api/API';
import { getUrlParams, getUrlNoHash } from '../utils/public';

const actions = {
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
};

export default actions;
