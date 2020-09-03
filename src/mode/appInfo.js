import { getSingleton } from './index';

let getApp = function(config) {
  let appInfo = {
    appName: '',
    workWechatAppName: '',
    code: '',
    param: []
  };
  appInfo = Object.assign(appInfo, config);

  function set(key, val) {
    appInfo[key] = val;
  }

  return {
    info: appInfo,
    set
  };
};

let createApp = getSingleton(getApp);

export default createApp;
