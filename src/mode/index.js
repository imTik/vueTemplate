// 创建单例
export function getSingleton(fn) {
  let result;
  return function() {
    return result || (result = fn.apply(this, arguments));
  };
}

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
