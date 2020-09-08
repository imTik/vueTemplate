// 创建单例
export function getSingleton(fn) {
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
  let moreArgs = Array.from(arguments);
  moreArgs.splice(fn, 2);
  return function() {
    let _args = Array.from(arguments);
    before.apply(this, _args.concat(moreArgs));
    return fn.apply(this, _args.concat(moreArgs));
  };
}
