import { HTTP } from './request';
import { paramsHandler } from '../utils/publicFn'

const LOCAL_URL = {}
if (process.env.VUE_APP_HOST === 'dev') LOCAL_URL.baseURL = process.env.VUE_APP_PROXY;


const API = {

  // 获取签名信息
  getSignatureByApp: function (params) {
    return HTTP('post', '/workwx-api/workwechat/getSignatureByApp', paramsHandler(params));
  },
  
};

export default API;
