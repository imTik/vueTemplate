import { HTTP } from './request';

const LOCAL_URL = {}
if (process.env.VUE_APP_HOST === 'dev') {
  LOCAL_URL.baseURL = process.env.VUE_APP_PROXY;
}

function paramsHandler (params) {
  return {
    appName: '',
    format: '',
    param: params,
    sign: '',
    source: '',
    timestamp: '',
    version: ''
  }
}

const API = {

  // 获取签名信息
  getSignatureByApp: function (params) {
    return HTTP('post', '/workwx-api/workwechat/getSignatureByApp', params);
  },
  
};

export default API;
