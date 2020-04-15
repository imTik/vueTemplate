import axios from 'axios';
import store from '@/store';
import { errHandler } from '../utils/ErrorHandler';
import { getClientInfo } from '@/utils/client_info'
// import { Toast } from 'vant'

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL; 
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
        config.headers['Authorization'] = JSON.stringify({ 'token': store.getters.TOKEN })
        config.headers['clientInfo'] = getClientInfo()
      }

      if (userConfig) {
        Object.assign(config, userConfig);
      }

      setParams(config);
      return config;
    },
    error => Promise.reject(error)
  );

  function setParams(c) {
    let method = c.method.toLocaleUpperCase();
    if (method === 'POST') {
      c.data = params;
    } else if (method === 'GET') {
      c.params = params;
    }
  }

  // 响应拦截
  axiosInstance.interceptors.response.use(
    response => {

      // ...自定义code失败提示
      let code = Number(response.data.code);
      if (code === 0) {
        return response.data;
      } else {
        errHandler(code, response.data.message);
        // if (response.data.message) Toast(response.data.message);
        return response.data;
      }
      
    },
    error => Promise.reject(error)
  )

  return axiosInstance();
};


/**
 * 
 * @param {String} method      方法
 * @param {String} url         地址 
 * @param {Object} params      数据
 * 先创建实例之后在请求拦截器判断请求类型
 */

const packageAxios = axios.create();

// 请求响应
packageAxios.interceptors.request.use(
  config => {

    config.timeout = 120000;
    // config.url = url;
    // config.method = method;
    // config.headers['X-Session-Token'] = store.state.token;

    // 用户信息采集
    if (store.getters.TOKEN) {
      config.headers['Authorization'] = JSON.stringify({ 'token': store.getters.TOKEN })
      config.headers['clientInfo'] = getClientInfo()
    }

    if (!(config.data instanceof FormData)) {
      const req_model = {
        appName: packageConfig.name,
        format: '',
        sign: '',
        source: 'aloha_front_web',
        timestamp: new Date().getTime() + '',
        version: packageConfig.version
      }
      switch (config.method.toUpperCase()) {
        case 'POST':
          req_model.param = config.data
          config.data = req_model
          break
        case 'GET':
          break
      }
    };

    // setParams(config);
    return config;
  },
  error => Promise.reject(error)
);

function setParams(c) {
  let method = c.method.toLocaleUpperCase();
  if (method === 'POST') {
    c.data = c.params;
    c.params = '';
  };
}

// 响应拦截
packageAxios.interceptors.response.use(
  response => {

    // ...自定义code失败提示
    let code = Number(response.data.code);
    if (code === 0) {
      return response.data;
    } else {
      errHandler(code, response.data.message);
      return response.data;
    }
    
  },
  error => Promise.reject(error)
)


export {
  HTTP,
  packageAxios
}