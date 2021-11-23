import { createSingleton } from './index';

let getApp = function(config) {
  let appInfo = {
    appName: '',
    workWechatAppName: '',
    code: '',
    param: []
  };
  appInfo = Object.assign(appInfo, config);

  return appInfo;
};

let createApp = createSingleton(getApp);

export default createApp;
