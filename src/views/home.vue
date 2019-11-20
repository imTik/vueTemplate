<template>
  <div class="home-main">

    <h1>Vue 项目模板</h1>
    <global-loading mask="small" v-show="loading" />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { checkApi } from '../utils/WeChatUtil'
export default {
  name: 'home',
  computed: {
    ...mapGetters([
      'APP_ID',
      'APP_NAME',
      'CORP_ID',
    ])
  },
  data () {
    return {
      loading: false,
      wifiLists: [],
    }
  },
  created () {

    localStorage.clear();
    this.initSDK();

  },
  methods: {

    // 初始化企业微信SDK
    initSDK () {
      let _this = this;
      let params = {
        appName: this.APP_NAME,
        format: "",
        param: {
          appName: this.APP_NAME,
          type: 0,
          url: this.getUrlNoHash(),
        },
        version: ""
      };

      this.$http.getSignatureByApp(params).then(res => {
        if (res && res.result) {
          wx.config({
            beta: true,
            debug: false,
            appId: this.CORP_ID, // 必填，企业微信的corpID
            timestamp: res.result.timestamp,
            nonceStr: res.result.noncestr,
            signature: res.result.signature,
            jsApiList: [
              'startWifi',
            ]
          });

          wx.ready(function () {

            // 初始化wifi
            checkApi('startWifi', wx, {
              success: function (res) {
                console.log('初始化wifi模块 ', res);

              },
              fail: function (err) {
                console.log('初始化失败', err);
              }
            });

          });
        };
      });
      
    },

    getUrlNoHash() {
      var href = window.location.href;
      var hash = window.location.hash;
      if (!hash) {
        return href;
      } else if (href) {
        return href.substr(0, href.length - hash.length);
      }
      return null;
    },

  }
}
</script>

<style lang="less" scoped>
.home-main {
  padding-top: 20px;
  text-align: center;
  font-size: @super;
}
</style>