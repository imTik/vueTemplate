// 获取浏览器信息
export function getBrowseInfo() {
  let u = navigator.userAgent;
  return {
    trident: u.indexOf('Trident') > -1, //IE内核
    presto: u.indexOf('Presto') > -1, //opera内核
    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
    iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
    iPad: u.indexOf('iPad') > -1, //是否iPad
    webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
    weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
    qq: u.match(/\sQQ/i) == ' qq', //是否QQ
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  };
}

// 从url截取参数
export function getUrlParams(name) {
  try {
    const urlSplits = window.location.href.split('?');
    if (urlSplits.length <= 1) throw 'URL参数截取错误';

    let hrefParams = urlSplits[1].split('#/')[0];
    if (hrefParams) {
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      let dataArr = hrefParams.match(reg);
      return dataArr[2];
    } else {
      throw '从URL获取' + name + '错误';
    }
  } catch (err) {
    console.error(err);
  }
}

// 对象数据转Form格式
export function dataToForm(d) {
  let _form = new FormData();
  for (let i in d) {
    _form.append(i, d[i]);
  }
  return _form;
}

// 继承父函数的prototype属性
export function Extend(father) {
  function F() {}
  F.prototype = father.prototype;
  return new F();
}

//图片转成Buffer
export function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(',')[1]);
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]; //图片格式类型jpg\jpeg
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], {
    type: mimeString
  });
}

// 下载blob文件
export function downBlobFile(content, fileName) {
  let el = document.createElement('a');
  el.download = fileName;
  el.style.display = 'none';
  let blob = new Blob([content]);
  el.href = URL.createObjectURL(blob);
  document.body.appendChild(el);
  el.click();
  document.body.removeChild(el);
}

// 检测js sdk api
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

// 获取url
export function getUrlNoHash() {
  var href = window.location.href;
  var hash = window.location.hash;
  if (!hash) {
    return href;
  } else if (href) {
    return href.substr(0, href.length - hash.length);
  }
  return null;
}