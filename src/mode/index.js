// 创建单例
export function createSingleton(fn) {
  let result;
  return function() {
    return result || (result = fn.apply(this, arguments));
  };
}

// 防抖
export function debounce(fn, delay = 200) {
  let timer = null;

  return function() {
    let arg = arguments;
    clearTimeout(timer);
    timer = null;

    timer = setTimeout(() => {
      fn.apply(this, arg);
    }, delay);
  };
}

// 前置装饰者
export function decoratorBefore(fn, before) {
  return function() {
    before.apply(this, arguments);
    let res = fn.apply(this, arguments);
    return res;
  };
}

// 后置装饰者
export function decoratorAfter(fn, after) {
  return function() {
    let res = fn.apply(this, arguments);
    after.apply(this, arguments);
    return res;
  };
};
