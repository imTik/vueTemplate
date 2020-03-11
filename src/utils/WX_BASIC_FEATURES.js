import { HTTP } from '../api/request';

function init (appName = '', insideAppName = '') {
  this.appName = appName;
  this.insideAppName = insideAppName;
};

// 获取url
init.prototype.getUrlNoHash = function () {
  var href = window.location.href;
  var hash = window.location.hash;
  if (!hash) {
    return href;
  } else if (href) {
    return href.substr(0, href.length - hash.length);
  }
  return null;
};

// 从url截取参数
init.prototype.getUrlParams = function (name) {
  try {

    const urlSplits = window.location.href.split('?');
    if (urlSplits.length <= 1) throw('URL参数截取错误');
    
    let hrefParams = window.location.href.split('?')[1].split('#/')[0];
    if (hrefParams) {
      let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      let dataArr = hrefParams.match(reg);
      return dataArr[2];

    } else {
      throw('从URL获取' + name + '错误');
    }
  }
  catch (err) {
    console.error(err);
  }
  
};

// 初始化sdk
init.prototype.initSDK = function (corpId, apiList) {

  let params = {
    appName: this.appName,
    format: "",
    param: {
      appName: this.insideAppName,
      type: 0,
      url: this.getUrlNoHash(),
    },
    version: ""
  };

  HTTP('post', '/workwx-api/workwechat/getSignatureByApp', params).then(res => {
    console.log('sdk注册', res);

    if (res && res.result) {
      wx.config({
        beta: true,
        debug: false,
        appId: corpId, // 必填，企业微信的corpID
        timestamp: res.result.timestamp,
        nonceStr: res.result.noncestr,
        signature: res.result.signature,
        jsApiList: apiList
      });

      wx.ready(function () {
        // ...
      });

      console.info('sdk注册成功');
    };
  });
  return this;
};

// 获取用户数据
init.prototype.getUserInfo = function () {

  let code = this.getUrlParams('code');
  let params = {
    appName: this.appName,
    format: "json",
    param: {
      appName: this.insideAppName,
      code: code,
      dept: true
    },
    sign: "",
    source: "",
    timestamp: "",
    version: ""
  };

  return HTTP('post', '/workwx-api/workwechat/getWorkWXUserByCode', params)
};

export default init;