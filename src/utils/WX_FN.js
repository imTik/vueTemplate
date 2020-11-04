import { getSignatureByApp, loginWX } from '../api/API';
import { getUrlParams } from './publicFn';
import { errHandler } from './ErrorHandler';
import store from '../store/store';

// 获取url
function getUrlNoHash() {
  var href = window.location.href;
  var hash = window.location.hash;
  if (!hash) {
    return href;
  } else if (href) {
    return href.substr(0, href.length - hash.length);
  }
  return null;
}

// 初始化SDK
export async function initSDK(corpId, apiList) {
  try {
    let params = {
      appName: store.getters.INSIDE_APP_NAME,
      type: 0,
      url: getUrlNoHash()
    };

    let { result } = await getSignatureByApp(params);
    if (!result) throw 'sdk注册失败';

    let { timestamp, noncestr, signature } = result;

    wx.config({
      beta: true,
      debug: false,
      appId: corpId, // 必填，企业微信的corpID
      timestamp,
      nonceStr: noncestr,
      signature,
      jsApiList: apiList
    });
    console.info('sdk注册成功');
  } catch (e) {
    errHandler(e);
  }
}

// 获取用户数据
export function getUserInfo() {
  let code = getUrlParams('code');
  let params = {
    appName: store.getters.INSIDE_APP_NAME,
    code: code,
    dept: true
  };

  return loginWX(params);
}

export function checkApi(api, sdk, callback) {
  try {
    if (!sdk) throw '微信JS-SDK注册失败,无法使用';

    sdk.checkJsApi({
      jsApiList: [api],
      success: res => {
        if (!res.checkResult[api]) throw '微信JS-SDK不支持该功能';
        sdk[api](callback);
      }
    });
  } catch (e) {
    console.error(e);
  }
}
