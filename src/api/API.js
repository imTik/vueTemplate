import { setRequest, packageAxios } from './request';

const LOCAL_URL = {}
if (process.env.VUE_APP_HOST === 'dev') {
  LOCAL_URL.baseURL = process.env.VUE_APP_PROXY;
}

const API = {

  // 获取签名信息
  getSignatureByApp: function (params) {
    return setRequest('post', '/workwx-api/workwechat/getSignatureByApp', params);
  },
  
  // 获取用户信息
  getUserInfoByCode: function (params) {
    return HTTP('post', '/workwx-api/workwechat/getWorkWXUserByCode', params);
  },
  
};

export default API;
