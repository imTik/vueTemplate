import { getSingleton } from './index';

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

let createApp = getSingleton(getApp);

export default createApp;
