import store from '../store.js'
import { mapGetters } from 'vuex'
const mixin = {
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'USER_INFO', 
      'STORE_INFO',
      'BATCH_NUMBER',
      'ROLE'
    ]),
  },
  methods: {

    go(path, params, type = 'path') {
      if (type === 'name') {
        this.$router.push({
          name: path,
          params,
        });
      } else {
        this.$router.push({
          path,
          query: params
        })
      }
    },

    /**
     * @param {String} type FULL(完整日期)/YMD(日期))/YM(年月)/T(时间)/TAMP(时间戳)
     */
    getNowDate(type = 'FULL', tamp) {
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
        if (type === 'FULL') {
          return Y + '-' + M + '-' + D + ' ' + H + ':' + Mi + ':' + S;
        } else if (type === 'YMD') {
          return Y + '-' + M + '-' + D;
        } else if (type === 'YM') {
          return Y + '-' + M;
        } else if (type === 'T') {
          return H + ':' + Mi + ':' + S;
        } else if (type === 'TAMP') {
          return Date.parse(_date);
        } else {
          throw('getNowDate调用错误，提示：错误的传值，参数参考: "FULL/YMD/YM/T/TAMP"');
        }
      }
      catch (err) {
        console.error(err);
      }
    },

    // 日期截取
    dateSplice (d) {
      const _date = new Date(d);
      let Y = _date.getFullYear();
      let M = _date.getMonth() + 1;
      if (M < 10) M = '0' + M;
      return Y + '-' + M;
    },

    // 构建URL
    createUrl () {
      let APP_ID = store.getters.APP_ID;
      let corpID = store.getters.CORP_ID;
      let redirectURI = 'http://tik.easy.echosite.cn/';

      let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + 
                 corpID + 
                 '&redirect_uri=' + 
                 redirectURI + 
                 '&response_type=code&scope=snsapi_privateinfo&agentid=' + 
                 APP_ID + 
                 '&state=STATE#wechat_redirect';
      return url;
    },

    // 从url获取指定参数
    getUrlParams (name) {
      try {

        if (window.location.search) {
          let urlParams = window.location.search.substr(1);
          let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
          let dataArr = urlParams.match(reg);
          return dataArr[2];

        } else {
          throw('参数获取错误');
        }
      }
      catch (err) {
        console.error(err);
      }
      
    },
    
    // 对象数据转Form格式
    dataToForm (d) {
      let _form = new FormData();
      for(let i in d) {
        _form.append(i, d[i]);
      }
      return _form;
    },

    // 判断中英
    judgeEn (ZH, EN) {
      if (this.$i18n.locale === 'cn') {
        return ZH;
      } else if (this.$i18n.locale === 'en') {
        return EN;
      };
    }
  }
}

export default mixin;