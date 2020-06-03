// import { Message } from 'element-ui';
import { Toast } from 'vant';

const errCode = {
  '-1': '系统错误'
};

export function errHandler (e) {
  // errCode自定义错误提示
  if (errCode[e]) {
    Toast(errCode[e]);

  } else {
    // 外部输入错误提示: throw('xxxx');
    if (typeof e === 'string') {
      Toast(e);

    } else {
      // 系统错误类型
      const errTips = String(e);
      const code400 = 'code 400';  // 请求语法错误
      const code404 = 'code 404';  // 地址错误
      const code405 = 'code 405';  // 请求方法错误
      const code500 = 'code 500';  // 服务端错误
      const timeout = 'timeout';

      if (errTips.indexOf(code400) !== -1) {
        Toast('错误码: 400, 请求语法错误.');
      } else if (errTips.indexOf(code404) !== -1) {
        Toast('错误码: 404, 请求地址错误.');
      } else if (errTips.indexOf(code405) !== -1) {
        Toast('错误码: 405, 请求方法错误.');
      } else if (errTips.indexOf(code500) !== -1) {
        Toast('错误码: 500, 系统开小差了~');
      } else if (errTips.indexOf(timeout) !== -1) {
        Toast('请求超时.');
      } else {
        Toast('系统开小差了...');
      };
    }
  }
}