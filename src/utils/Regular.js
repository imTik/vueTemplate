function CurryCheck(reg) {
  return function (text) {
    return reg.test(text);
  };
}

/**
地区：[1-9]\d{5}
年的前两位：(18|19|([23]\d))            1800-3999
年的后两位：\d{2}
月份：((0[1-9])|(10|11|12)) 
天数：(([0-2][1-9])|10|20|30|31)        闰年不能禁止29+

三位顺序码：\d{3}
两位顺序码：\d{2}
校验码：[0-9Xx]（注明：15位的校验码没有Xx）
 */
const idCard18 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
const idCard15 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/;

const idCard = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
const isIdCard = CurryCheck(idCard);

// 特殊符号
const specialSymbolReg = /[~!@#$%^&*()_+\-=<>,.\/?:;'"[\]{}|\\`·！￥……（）——《》？：“”]/im;
const hasSpecialSymbol = CurryCheck(specialSymbolReg);

// 纯数字
const numberReg = /^\d*$/im;
const isNumber = CurryCheck(numberReg);

// 空格
const space = /[\s]/im;
const hasSpace = CurryCheck(space);

// 邮箱
const email = /^([a-zA-Z0-9_|\.-]+)(@{1})([a-zA-Z0-9.]+)\.[a-zA-Z]{2,3}$/i;
const isEmail = CurryCheck(email);

// 手机
const phone = /^[1][3,4,5,7,8][0-9]{9}$/i;
const isPhone = CurryCheck(phone);

// 中文
const chinese = /[\u4E00-\u9FA5]/im;
const hasChinese = CurryCheck(chinese);

// 金额
const money = /((^[1-9]\d*)|(^0{1,2}))(\.\d{1,2})?$/;
const isMoney = CurryCheck(money);

export { isIdCard, hasSpecialSymbol, isNumber, hasSpace, isEmail, isPhone, hasChinese, isMoney };
