<template>
  <div class="home-main">

    <h1 data-dot="title_point">Vue Front 项目模板</h1>
    <global-loading mask="small" v-show="loading" />

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import { checkApi } from '../utils/WX_API_CHECK';
import BasicFeatures from '@/utils/WX_BASIC_FEATURES';
import { getUrlParams } from '../utils/publicFn';

export default {
  name: 'home',
  computed: {
    ...mapGetters([
      'APP_NAME',
      'INSIDE_APP_NAME',
    ])
  },
  data () {
    return {
      loading: false,
      wifiLists: [],
      features: null,
    }
  },
  created () {

    try {
      this.features = new BasicFeatures(this.APP_NAME, this.INSIDE_APP_NAME);

      const apiList = ['startWifi']; // 具体参考企业微信API
      const corpId = getUrlParams('state');
      this.features.initSDK(corpId, apiList); // 注册SDK

      // 获取用户信息
      this.features.getUserInfo().then(res => {
        console.log('用户信息', res);
        if (res && res.result) {
          this.$store.commit('SAVE_USER_INFO', res.result);
        }
      });
    }
    catch (e) {
      this.errHandler(e);
    }

  },
  methods: {}
}
</script>

<style lang="less" scoped>
.home-main {
  padding-top: 20px;
  text-align: center;
  font-size: @xl;
}
</style>
