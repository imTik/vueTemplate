import axios from 'axios';
import store from '../store/store';
import { errHandler } from '../utils/ErrorHandler';
import { getClientInfo } from './client_info';
import SERVER from './serverConfig';
// import { Toast } from 'vant'

axios.defaults.baseURL = SERVER.WECHAT;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 'application/json' / 'multipart/form-data' / 'application/x-www-form-urlencoded'

const axiosInstance = axios.create();

// 请求响应
axiosInstance.interceptors.request.use(
  config => {
    config.timeout = 120000;

    // 用户信息采集
    if (store.getters.TOKEN) {
      config.headers['Authorization'] = JSON.stringify({
        token: store.getters.TOKEN
      });
      config.headers['clientInfo'] = getClientInfo();
    }

    setParams(config);
    return config;
  }
);

function setParams(c) {
  let method = c.method.toLocaleUpperCase();
  if (method === 'GET') {
    c.params = c.data;
    delete c.data;
  }
}

// 响应拦截
axiosInstance.interceptors.response.use(
  response => {
    // ...自定义code失败提示
    let code = Number(response.data.code);
    if (code !== 0) errHandler(code);
    return response.data;
  },
);

export default axiosInstance;
