import axios from 'axios';
import store from '@/store/store';
import { errHandler } from '../utils/ErrorHandler';
import { getClientInfo } from '@/utils/client_info';
import SERVER from './HttpConfige';
// import { Toast } from 'vant'

axios.defaults.baseURL = SERVER.WECHAT;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 'application/json' / 'multipart/form-data' / 'application/x-www-form-urlencoded'

/**
 * 
 * @param {String} method      方法
 * @param {String} url         地址 
 * @param {Object} params      数据
 * @param {Object} userConfig  自定义设置
 * 先创建实例之后在请求拦截器判断请求类型
 */
function HTTP(method, url, params = '', userConfig) {
  const axiosInstance = axios.create();

  // 请求响应
  axiosInstance.interceptors.request.use(
    config => {
      config.timeout = 120000;
      config.url = url;
      config.method = method;

      // 用户信息采集
      // config.headers['X-Session-Token'] = store.state.token;
      if (store.getters.TOKEN) {
        config.headers['Authorization'] = JSON.stringify({
          token: store.getters.TOKEN
        });
        config.headers['clientInfo'] = getClientInfo();
      }

      if (userConfig) Object.assign(config, userConfig);

      setParams(config);
      return config;
    }
    // error => errHandler(error)
  );

  function setParams(c) {
    let method = c.method.toLocaleUpperCase();
    switch (method) {
      case 'POST':
        c.data = params;
        break;
      case 'GET':
        c.params = params;
        break;
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
    error => errHandler(error)
  );

  return axiosInstance();
}

export { HTTP };
