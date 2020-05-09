/**
 * 使用方法
 * import BuriedPoint from './utils/buriedPoint';
   let buriedPointConfig = {
     leaveTime: 60000,
   };
   BuriedPoint(router, (buriedData, mark) => {
     console.log('触发埋点的标记: ', mark)
     console.log('获取到的埋点信息: ', buriedData);
   }, buriedPointConfig);
 * @param {router} router 
 * @param {function} cb 
 * @param {object} config 
 * 
 */

function BuriedPointFn (router, cb, config) {
  let pageCount = 0;
  let lastTime = 0;
  let leaveTime = 60000;

  let pageData = {
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

    let enterTime = Date.parse(new Date());
    pageCount ++;
    let fromPagaTitle = '';
    let currentPageTitle = '';
    if(from.meta && from.meta.title) fromPagaTitle = from.meta.title;
    if(to.meta && to.meta.title) currentPageTitle = to.meta.title;

    pageData = {
      pageCount,
      formPagePath: from.path,
      fromPagaTitle,
      currentPagePath: to.path,
      currentPageTitle,
      enterTime,
      lastTime
    };

    // console.log('---这里是埋点', pageData);
    lastTime = enterTime;

    cb(pageData, 'router');
    next();
  });

  // 获取body元素 监听埋点事件 
  const BODY = document.getElementsByTagName('body')[0];

  // 点击埋点
  BODY.addEventListener('click', e => {
    let elPoint = e.target.getAttribute('data-point');
    console.log('元素的埋点标记: ',elPoint);
    if (elPoint === null) return;
    cb(pageData, 'click');
  });

  // 监听用户鼠标移动 离开的埋点
  let mouseInterval = null;
  BODY.addEventListener('mousemove', e => {
    // 防抖
    if (mouseInterval) clearInterval(mouseInterval);
    mouseInterval = setInterval(() => {
      cb(pageData, 'leave');
    }, (config.leaveTime || 30000));
  });
};

export default BuriedPointFn;