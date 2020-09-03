// 创建单例
export function getSingleton(fn) {
  let result;
  return function() {
    return result || (result = fn.apply(this, arguments));
  };
}