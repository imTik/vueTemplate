// import pako from 'pako';
import packageConfig from '../../package';

const RULE_MAP = {
  phone: /^1(3|4|5|7|6|8|9)\d{9}$/, // 手机
  integer: /^[0-9]*[1-9][0-9]*$/ // 整数
};

export function verify(r, v) {
  try {
    if (!RULE_MAP[r]) throw '请输入正确的规则名';
    return RULE_MAP[r].test(v);
  } catch (e) {
    console.error(e);
  }
}

/**
 * @param {String} type FULL(完整日期)/YMD(日期))/YM(年月)/T(时间)/TAMP(时间戳)
 */
export function getNowDate(type = 'FULL', tamp, zone) {
  zone ? (tamp = getZoneTamp(zone)) : (tamp = null);

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
  try {
    if (MODE[type]) {
      return MODE[type];
    } else {
      throw 'getNowDate调用错误，提示：错误的传值，参数参考: "FULL/YMD/YM/T/TAMP"';
    }
  } catch (err) {
    console.error(err);
  }
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
export function paramFormat(params) {
  return {
    appName: packageConfig.name,
    format: '',
    param: params,
    sign: '',
    source: '',
    timestamp: getNowDate('tamp'),
    version: packageConfig.version
  };
}

// 继承父函数的prototype属性
export function Extend(father) {
  function F() {}
  F.prototype = father.prototype;
  return new F();
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
