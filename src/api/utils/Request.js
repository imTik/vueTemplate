import axios from 'axios';
import { errHandler } from '../../utils/ErrorHandler';
import SERVER from './serverConfig';

axios.defaults.baseURL = SERVER.WECHAT;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 'application/json' / 'multipart/form-data' / 'application/x-www-form-urlencoded'

const axiosInstance = axios.create();

// 请求响应
axiosInstance.interceptors.request.use(
  config => {
    config.timeout = 120000;
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
axiosInstance.interceptors.response.use(response => {
  // ...自定义code失败提示
  let format = response.config.headers.format;
  if (format === 'blob') {
    return response.data;
  } else {
    let code = Number(response.data.code);
    let msg = response.data.message;
    if (code !== 0) errHandler(code, msg);
    return response.data;
  }
});

export default axiosInstance;
