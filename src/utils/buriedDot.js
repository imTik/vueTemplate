/**
 * 使用方法
 * import BuriedDot from './utils/buriedDot';
   BuriedDot(router, (buriedData, mark) => {
     console.log('触发埋点的标记: ', mark)
     console.log('获取到的埋点信息: ', buriedData);
   }, 60000);
 * @param {router} router 
 * @param {function} cb 
 * @param {Number | String} leaveTime 
 * 
 */
function BuriedDot (router, cb, leaveTime = 60000) {
  let pageCount = 0;
  let lastTime = 0;
  let closeTime = 0;
  let firstLoadTime = getNowDate();

  // console.log(window.navigator); // 浏览器属性
  // console.log(window.performance); // 网络属性

  // 设备数据
  let deviceData = {
    system: window.navigator.platform,          // 系统
    browserCode: window.navigator.appCodeName,  // 浏览器内核
    browser: getBrowserName(),                  // 浏览器
    language: window.navigator.language,        // 浏览器语言
    onLine: window.navigator.onLine,            // 在线/脱机
  };

  // 网络数据
  let netData = getNetData();

  // 埋点数据
  let dotData = {
    pageCount,
    formPagePath: '',
    fromPagaTitle: '',
    currentPagePath: '',
    currentPageTitle: '',
    enterTime: 0,
    lastTime,
    closeTime,
    firstLoadTime
  };

  let dotDetail = {
    deviceData,
    netData,
    dotData
  }

  // 路由的埋点
  router.beforeEach((to, from, next) => {

    checkDataAttribute();

    let enterTime = getNowDate();
    pageCount ++;
    let fromPagaTitle = '';
    let currentPageTitle = '';
    if(from.meta && from.meta.title) fromPagaTitle = from.meta.title;
    if(to.meta && to.meta.title) currentPageTitle = to.meta.title;
    
    dotDetail.dotData.pageCount        = pageCount;
    dotDetail.dotData.formPagePath     = from.path;
    dotDetail.dotData.currentPagePath  = to.path;
    dotDetail.dotData.fromPagaTitle    = fromPagaTitle;
    dotDetail.dotData.currentPageTitle = currentPageTitle;
    dotDetail.dotData.enterTime        = enterTime;
    dotDetail.dotData.lastTime         = lastTime;
    lastTime = enterTime;

    // 每次路由刷新都重新获取网络数据
    dotDetail.netData = getNetData();

    cb('router', dotDetail);
    next();
  });

  // 获取body元素 监听埋点事件 
  const BODY = document.getElementsByTagName('body')[0];

  // 点击埋点
  BODY.addEventListener('click', e => {

    let elDotInfo = e.target.getAttribute('data-dot');
    console.log('元素的埋点标记: ', elDotInfo);
    if (elDotInfo === null) return;

    // dotData.el = e.target;
    dotDetail.dotData.elDotInfo = elDotInfo;
    cb('click', dotDetail);

  });

  // 监听用户鼠标移动 离开的埋点
  let mouseInterval = null;
  BODY.addEventListener('mousemove', e => {

    // 防抖
    if (mouseInterval) clearInterval(mouseInterval);

    mouseInterval = setInterval(() => {

      checkDataAttribute();
      cb('leave', dotDetail);

    }, leaveTime);

  });
  
  // 关闭页面埋点
  window.onbeforeunload = function (e) {
    checkDataAttribute();
    dotDetail.dotData.closeTime = getNowDate();
    cb('close', dotDetail);
    return;
  };

  // 检测是否有el字段 有则删除
  function checkDataAttribute () {
    if (dotDetail.dotData.hasOwnProperty('el')) delete dotDetail.dotData.el;
    if (dotDetail.dotData.hasOwnProperty('elDotInfo')) delete dotDetail.dotData.elDotInfo;
  }
};

 /**
 * @param {String} type FULL(完整日期)/YMD(日期))/YM(年月)/T(时间)/TAMP(时间戳)
 */
function getNowDate(type = 'FULL', tamp) {
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

  try {
    if (type.toUpperCase() === 'FULL') {
      return Y + '-' + M + '-' + D + ' ' + H + ':' + Mi + ':' + S;
    } else if (type.toUpperCase() === 'YMD') {
      return Y + '-' + M + '-' + D;
    } else if (type.toUpperCase() === 'YM') {
      return Y + '-' + M;
    } else if (type.toUpperCase() === 'T') {
      return H + ':' + Mi + ':' + S;
    } else if (type.toUpperCase() === 'TAMP') {
      return Date.parse(_date);
    } else {
      throw('getNowDate调用错误，提示：错误的传值，参数参考: "FULL/YMD/YM/T/TAMP"');
    }
  }
  catch (err) {
    console.error(err);
  }
};

// 获取浏览器名字
function getBrowserName () {
  let userAgent = window.navigator.userAgent;
  if (userAgent.indexOf("OPR") > -1 || userAgent.indexOf("Opera") > -1) {
    //判断是否Opera浏览器
    return "Opera"
  } else if (userAgent.indexOf("Firefox") > -1) {
    //判断是否Firefox浏览器
    return "Firefox";
  } else if (userAgent.indexOf("Chrome") > -1){
    return "Chrome";
  } else if (userAgent.indexOf("Safari") > -1) {
    //判断是否Safari浏览器
    return "Safari";
  } else if (userAgent.indexOf("Edge") > -1) {
    return 'Edge'
  } else if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1) {
    return 'IE'
  } else{
    //其他
    return '--'
  };
}

// 获取访问方式 new-地址输入or标签打开/refresh-刷新/back-返回
function getAccessMethod () {
  if (window.performance.navigation.type === 0) {
    return 'new';
  } else if (window.performance.navigation.type === 1) {
    return 'refresh';
  } else if (window.performance.navigation.type === 2) {
    return 'back';
  } else {
    return '--';
  }
}

// 获取网络数据
function getNetData () {
  let accessMethod = getAccessMethod();  // 访问方式
  let tcpTimeConsuming = window.performance.timing.connectEnd - window.performance.timing.connectStart; // TCP连接耗时
  let requestTimeConsuming = window.performance.timing.responseEnd - window.performance.timing.responseStart; // 资源请求耗时
  // let onloadTimeConsuming = window.performance.timing.loadEventEnd - window.performance.timing.fetchStart; // 加载耗时
  let whiteScreenTime = window.performance.timing.domLoading - window.performance.timing.fetchStart; // 白屏时间

  return {
    accessMethod,
    tcpTimeConsuming,
    requestTimeConsuming,
    // onloadTimeConsuming,
    whiteScreenTime
  }
};

export default BuriedDot;