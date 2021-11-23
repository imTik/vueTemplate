const UNIT_A = ['', '拾', '佰', '仟'];
const UNIT_B = ['', '万', '亿', '兆'];
const UNIT_C = ['角', '分', '毫', '厘'];
const CN_NUMBER = {
  0: '零',
  1: '壹',
  2: '贰',
  3: '叁',
  4: '肆',
  5: '伍',
  6: '陆',
  7: '柒',
  8: '捌',
  9: '玖'
};
const YUAN = '元';

const filter = {
  // 金钱转中文
  moneyToChinese: val => {
    if (val === '') return '';

    // 去头部零
    let len = val.length;
    while (len > 0) {
      len--;
      let now = val.charAt(len);
      if (len === 0 && now === '0' && val.length > 1) {
        val = val.substring(len + 1);
        len = val.length;
      }
    }

    let intSplit = [];
    let decSplit = [];

    // 判断是否存在小数
    if (val.indexOf('.') > -1) {
      let valArr = val.split('.');
      let int = valArr[0]; // 整数
      let dec = valArr[1]; // 小数
      intSplit = int.split('').reverse(); // 整数 分割 取反
      decSplit = dec.split('');
    } else {
      intSplit = val.split('').reverse(); // 整数 分割 取反
    }
    // console.log('整数与小数', intSplit, decSplit);

    // 整数转换
    let int_chinese = [];
    intSplit.forEach((item, index) => {
      let A = index % 4; // 余数 用余数取小单位 '', '拾', '佰', '仟'
      let B = index / 4; // 整数 每隔4位换一个大单位 '', '万', '亿', '兆'

      let INT_TEXT = '';
      if (A === 0) {
        INT_TEXT = Number(item) != 0
                    ? CN_NUMBER[item] + UNIT_A[A] + UNIT_B[B]
                    : intSplit.length > 1
                      ? UNIT_B[B] // CN_NUMBER[item]
                      : CN_NUMBER[item];
      } else {
        // 判断 0 只取 中文零
        INT_TEXT =
          Number(item) === 0 ? CN_NUMBER[item] : CN_NUMBER[item] + UNIT_A[A];
      }
      int_chinese.push(INT_TEXT);
    });

    // 小数转换
    let dec_chinese = [];
    if (decSplit.length > 0) {
      decSplit.forEach((item, index) => {
        let DEC_TEXT = '';
        DEC_TEXT =
          Number(item) === 0
            ? CN_NUMBER[item]
            : CN_NUMBER[item] + UNIT_C[index];
        dec_chinese.push(DEC_TEXT);
      });
    }

    int_chinese = int_chinese.reverse().join('') + YUAN; // 取反 合并
    dec_chinese = dec_chinese.join('');

    let money_chinese = '';
    if (int_chinese !== '元') money_chinese += int_chinese;
    if (dec_chinese) money_chinese += dec_chinese;
    return money_chinese;
  },

  // 去零格式化
  moneyCNFormat: val => {
    // 去零逻辑 小单位前面保留1个零 / 大单位前面不保留零 后面保留1个零
    let len = val.length;
    while (len > 1) {
      len--;
      let now = val.charAt(len);
      let after = val.charAt(len + 1);
      let before = val.charAt(len - 1);

      if (now === YUAN && before === CN_NUMBER[0]) {
        // 去除元前面的零 now === '元' && before === '零'
        val = val.substring(0, len - 1) + val.substring(len);
        len = val.length;
      }  else if (now === YUAN && after === CN_NUMBER[0]) {
        // 去除元后面的零 now === '元' && after === '零'
        val = val.substring(0, len + 1) + val.substring(len + 2);
        len = val.length;
      } else if (now === before) {
        // 重复的零
        val = val.substring(0, len) + val.substring(len + 1);
        len = val.length;
      } else if (UNIT_B.includes(now) && before === CN_NUMBER[0]) {
        // 大单位前去零 before === '零'
        val = val.substring(0, len - 1) + val.substring(len);
        len = val.length;
      } else if (UNIT_B.includes(now) && UNIT_B.includes(after)) {
        // 去除重复的大单位
        val = val.substring(0, len + 1) + val.substring(len + 2);
        len = val.length;
      } else if (UNIT_C.includes(now) && after === CN_NUMBER[0]) {
        // 小数单位后去零
        val = val.substring(0, len + 1) + val.substring(len + 2);
        len = val.length;
      }
    };
    return val;
  },

  moneyFormat(val) {
    val = String(val);
    return val
      .split('')
      .reverse()
      .join('')
      .replace(/(\d{3})(?=\d)/g, '$1,')
      .split('')
      .reverse()
      .join('');
  },

  iosDate(d) {
    return d.replace(/-/g, '/');
  }
};

export default filter;
