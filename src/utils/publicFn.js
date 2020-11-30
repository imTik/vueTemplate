// import pako from 'pako';
import packageConfig from '../../package';
import SERVER from '../api/serverConfig';

// 正则校验
export const REX_MAP = {
  phone: function(val) {
    let _reg = /^1(3|4|5|7|6|8|9)\d{9}$/;
    return _reg.test(val);
  },

  integer: function(val) {
    let _reg = /^[0-9]*[1-9][0-9]*$/;
    return _reg.test(val);
  },

  email: function(val) {
    let _reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return _reg.test(val);
  },

  id: function(val) {
    let _reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/;
    return _reg.test(val);
  },

  otherId: function(val) {
    let _reg = /(^([a-zA-z]{1,2})([0-9]{7,8})$)/;
    return _reg.test(val);
  },

  componeyId: function(val) {
    if (
      val.length === 15 ||
      val.length === 17 ||
      val.length === 18 ||
      val.length === 20
    ) {
      if (val.length === 18) {
        let regex = /^[0-9A-Z]+$/;
        let regBusinessLicense = new RegExp('[IOZSV]');
        return regex.test(val) && !regBusinessLicense.test(value)
          ? true
          : false;
      } else {
        let regex = /^[0-9A-Z]+$/;
        return regex.test(val) ? true : false;
      }
    } else {
      return false;
    }
  }
};

/**
 * @param {String} type FULL(完整日期)/YMD(日期))/YM(年月)/T(时间)/TAMP(时间戳)
 */
export function getNowDate(type = 'FULL', tamp) {
  if (tamp && typeof tamp === 'string') tamp = tamp.split('.')[0]; // 防止 2020-11-30T01:46:44.490+0000 格式的日期
  const _date = tamp ? new Date(tamp) : new Date();
  let Y = _date.getFullYear();
  let M = _date.getMonth() + 1;
  let D = _date.getDate();
  let H = _date.getHours();
  let Mi = _date.getMinutes();
  let S = _date.getSeconds();

  if (M < 10) M = '0' + M;
  if (D < 10) D = '0' + D;
  if (H < 10) H = '0' + H;
  if (Mi < 10) Mi = '0' + Mi;
  if (S < 10) S = '0' + S;

  const MODE = {
    TAMP: Date.parse(_date),
    FULL: Y + '-' + M + '-' + D + ' ' + H + ':' + Mi + ':' + S,
    YMD: Y + '-' + M + '-' + D,
    YM: Y + '-' + M,
    T: H + ':' + Mi + ':' + S
  };
  type = type.toUpperCase();
  return MODE[type] ? MODE[type] : null;
}

// 获取指定日期
export function getSpecifyTime(day) {
  let oneDayTimesTamp = 1000 * 60 * 60 * 24;
  let forwardTimeTamp = oneDayTimesTamp * day;
  let currentTimesTamp = Date.parse(new Date());

  let targetTimesTamp = currentTimesTamp - forwardTimeTamp;
  return getNowDate('FULL', targetTimesTamp);
}

export function getZoneTamp(zone = 0) {
  const _date = new Date();
  const oneMinute = 1000 * 60;
  const timeZone = _date.getTimezoneOffset();
  const localTamp = Date.parse(_date);
  const localOffset = timeZone * oneMinute;
  const utc = localTamp - localOffset;
  const zoneOffsetTime = -zone * 60 * oneMinute;
  const zoneTamp = utc + zoneOffsetTime;
  return zoneTamp;
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

// 网络请求参数处理
export function reqModel(params, type = '') {
  let _param = {
    appName: store.getters.APP_NAME,
    format: '',
    param: params,
    sign: '',
    source: '',
    timestamp: getNowDate('tamp'),
    version: packageConfig.version
  };
  type === 'sign' && (_param.sign = createdSign(_param));
  return _param;
}

// 创建签名
export function createdSign(p) {
  let sha512 = SHA512.sha512;
  let strA = p.appName + p.source + p.timestamp + p.format + p.version;
  let staB = JSON.stringify(sortJson(p.param));
  let sign = sha512(SERVER.SECRET + strA + staB + SERVER.SECRET).toUpperCase();
  return sign;
}
function sortJson(obj) {
  let type = Object.prototype.toString.call(obj).split(/\s/)[1].split(/\]/)[0];
  if (type === 'Object') {
    let newObj = {};
    Object.keys(obj).sort().map(key => {
      newObj[key] = sortJson(obj[key]);
    });
    return newObj;
  }
  if (type === 'Array') {
    let newArr = [];
    obj.map(key => {
      newArr.push(sortJson(key));
    });
    return newArr;
  }
  return obj;
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

// pako 加密
// export function pakoEncrypt (data) {
//   let dataStr = JSON.stringify(data);
//   let encrypt = pako.gzip(dataStr, {to:'string'}); // deflate gzip
//   let data64 = window.btoa(encrypt);
//   return data64;
// }

// // pako 解密
// export function pakoDecrypt (data) {
//   let dataStr = window.atob(data);
//   let decrypt = pako.inflate(dataStr, {to:'string'});
//   let output = JSON.parse(decrypt);
//   return output;
// }
