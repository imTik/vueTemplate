 /**
 * @param {String} type FULL(完整日期)/YMD(日期))/YM(年月)/T(时间)/TAMP(时间戳)
 */
export function getNowDate(type = 'FULL', tamp) {
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

  let dotData = {
    pageCount,
    formPagePath: '',
    fromPagaTitle: '',
    currentPagePath: '',
    currentPageTitle: '',
    enterTime: 0,
    lastTime
  }

  // 路由的埋点
  router.beforeEach((to, from, next) => {

    let enterTime = getNowDate();
    pageCount ++;
    let fromPagaTitle = '';
    let currentPageTitle = '';
    if(from.meta && from.meta.title) fromPagaTitle = from.meta.title;
    if(to.meta && to.meta.title) currentPageTitle = to.meta.title;

    dotData = {
      pageCount,
      formPagePath: from.path,
      fromPagaTitle,
      currentPagePath: to.path,
      currentPageTitle,
      enterTime,
      lastTime
    };

    // console.log('---这里是埋点', dotData);
    lastTime = enterTime;

    cb('router', dotData);
    next();
  });

  // 获取body元素 监听埋点事件 
  const BODY = document.getElementsByTagName('body')[0];

  // 点击埋点
  BODY.addEventListener('click', e => {

    let elPoint = e.target.getAttribute('data-dot');
    console.log('元素的埋点标记: ', elPoint);
    if (elPoint === null) return;

    dotData.el = e.target;
    dotData.elPoint = elPoint;
    cb('click', dotData);

  });

  // 监听用户鼠标移动 离开的埋点
  let mouseInterval = null;
  BODY.addEventListener('mousemove', e => {

    // 防抖
    if (mouseInterval) clearInterval(mouseInterval);

    mouseInterval = setInterval(() => {

      checkDataAttribute();
      cb('leave', dotData);

    }, leaveTime);

  });

  // 检测是否有el字段 有则删除
  function checkDataAttribute () {
    if (dotData.hasOwnProperty('el')) delete dotData.el;
    if (dotData.hasOwnProperty('elPoint')) delete dotData.elPoint;
  }
};

export default BuriedDot;