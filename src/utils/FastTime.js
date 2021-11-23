const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;

export default function FastTime(userConfig) {
  this.config = {
    symbol: '-',
    type: 'FULL',
  };

  if (userConfig && typeof userConfig === 'object') {
    Object.assign(this.config, userConfig);
  }
}

/**
 * 获取当前日期
 */
FastTime.prototype.getDate = function (type = null) {
  const _date = new Date();
  if (!type) type = this.config.type;
  const formatDate = this.format(_date, type);
  return formatDate;
};

/**
 * 格式化时间
 * @param {day} day
 * @param {String} type
 * @returns {String}
 */
FastTime.prototype.format = function (day, type) {
  if (!day) {
    console.error('FastTime Error: 请输入日期');
    return null;
  }
  if (!type) type = this.config.type;

  const _date = new Date(day);
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

  const symbol = this.config.symbol;
  const MODE = {
    TAMP: dateToTamp(_date),
    FULL: `${Y}${symbol}${M}${symbol}${D} ${H}:${Mi}:${S}`,
    YMD: `${Y}${symbol}${M}${symbol}${D}`,
    YMD00: `${Y}${symbol}${M}${symbol}${D} 00:00:00`,
    YM: `${Y}${symbol}${M}`,
    MD: `${M}${symbol}${D}`,
    Y: Y,
    M: M,
    D: D,
    T: `${H}:${Mi}:${S}`,
  };

  return MODE[type];
};

/**
 * 日期加
 * @param {String} _date
 * @param {Number,String} count
 */
FastTime.prototype.add = function (_date, count = 1) {
  const addDay = ONE_DAY * Number(count);
  const tamp = dateToTamp(_date);
  let offsetTimeTamp = tamp + addDay;
  return this.format(offsetTimeTamp);
};

/**
 * 日期按月增加
 * @param {String} _date
 */
FastTime.prototype.addByMonth = function (_date) {
  let _count = this.getDayCount(_date);
  const addDay = ONE_DAY * Number(_count);
  const tamp = dateToTamp(_date);
  let offsetTimeTamp = tamp + addDay;
  return this.format(offsetTimeTamp);
};

/**
 * 日期减
 * @param {Number,String} count
 */
FastTime.prototype.less = function (_date, count = 1) {
  const addDay = ONE_DAY * Number(count);
  const tamp = dateToTamp(_date);
  let offsetTimeTamp = tamp - addDay;
  return this.format(offsetTimeTamp);
};

/**
 * 日期按月增减
 * @param {String} _date
 */
FastTime.prototype.lessByMonth = function (_date) {
  let _count = this.getDayCount(_date);
  const addDay = ONE_DAY * Number(_count);
  const tamp = dateToTamp(_date);
  let offsetTimeTamp = tamp - addDay;
  return this.format(offsetTimeTamp);
};

/**
 * 日期比较 获取日期差
 * @param {String} day1 需要对比的第一个日期 必传
 * @param {String} day2 需要对比的第二个日期，如为空则取当前对象的日期
 * @returns {Object} 返回日期差的对象，包含时分秒日
 */
FastTime.prototype.compare = function (day1, day2) {
  if (!day1) {
    return null;
  }

  let day1Arr = day1.split(' ');
  if (day1Arr.length === 1) {
    day1 += ' 00:00:00';
  }

  if (day2) {
    let day2Arr = day2.split(' ');
    if (day2Arr.length === 1) {
      day2 += ' 00:00:00';
    }
  }

  let day1Tamp = dateToTamp(day1);
  let day2Tamp = day2 ? dateToTamp(day2) : this.timesTamp;

  let start = null;
  let end = null;

  if (day1Tamp > day2Tamp) {
    start = day2Tamp;
    end = day1Tamp;
  } else {
    start = day1Tamp;
    end = day2Tamp;
  }

  let intervalTamp = end - start;
  let intervalDay = parseInt(intervalTamp / ONE_DAY);

  let intervalHourTamp = intervalTamp % ONE_DAY;
  let intervalHour = parseInt(intervalHourTamp / ONE_HOUR);

  let intervalMinuteTamp = intervalHourTamp % ONE_HOUR;
  let intervalMinute = parseInt(intervalMinuteTamp / ONE_MINUTE);

  let intervalSecondTamp = intervalMinuteTamp % ONE_MINUTE;
  let intervalSecond = intervalSecondTamp / ONE_SECOND;

  let result = {
    day: intervalDay,
    hour: intervalHour,
    minute: intervalMinute,
    second: intervalSecond,
  };

  return result;
};

/**
 * 根据日期获取月份天数
 * @param {String} _date 日期
 * @returns {Number} 月份天数
 */
FastTime.prototype.getDayCount = function (_date) {
  try {
    if (!_date) throw '请输入日期';

    let daySet = {
      1: 31,
      2: 28,
      3: 31,
      4: 30,
      5: 31,
      6: 30,
      7: 31,
      8: 31,
      9: 30,
      10: 31,
      11: 30,
      12: 31,
    };

    let dateSplit = null;
    if (_date.indexOf('-') > -1) {
      dateSplit = _date.split('-');
    } else if (_date.indexOf('/') > -1) {
      dateSplit = _date.split('/');
    } else {
      throw '未知的时间格式';
    }

    const YEAR = parseInt(dateSplit[0]);
    const MONTH = parseInt(dateSplit[1]);
    // const DAY = parseInt(dateSplit[2]);

    if (YEAR % 400 === 0 || YEAR % 4 === 0) {
      daySet[2] = 29;
    }

    return daySet[MONTH];
  } catch (e) {
    console.error('getDayCountByMonth', e);
  }
};

/**
 * 日期转换为时间戳
 * @param {String} day 日期
 * @returns {String} 时间戳
 */
function dateToTamp(day) {
  let _date = day ? new Date(day) : new Date();
  return Date.parse(_date);
}

/**
 * 防止2020-11-30T01:46:44.490+0000 格式的日期导致报错、防止ios系统2020-01-01日期报错
 * @param {String} D 日期
 * @returns {String} 修复后的日期
 */
function timeFix(D) {
  if (typeof D === 'string') {
    D = D.split('.')[0];

    const BROWSER_INFO = getBrowserInfo();
    if (BROWSER_INFO.ios && D.indexOf('-') !== -1) {
      D = iosTimeChange(D);
    }
  }

  return D;
}

/**
 * ios系统转换时间 2020-01-01 -> 2020/01/01
 * @param {String} D 日期
 * @returns {String} 转换后的日期
 */
function iosTimeChange(D) {
  return D.replace(/-/g, '/');
}

/**
 * 获取浏览器信息
 * @returns {Object} 浏览器信息
 */
function getBrowserInfo() {
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
    language: (navigator.browserLanguage || navigator.language).toLowerCase(),
  };
}
