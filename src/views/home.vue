<template>
  <div class="home-main">

    <h1 data-dot="title_point">Vue Front 项目模板</h1>
    <global-loading mask="small" v-show="loading" />

    <div data-dot="test">
      <span>ahaa</span>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { initSDK, getUserInfo } from '@/utils/WX_FN';
import { getUrlParams } from '../utils/publicFn';

export default {
  name: 'home',
  computed: {
    ...mapGetters([
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

      const apiList = ['startWifi']; // 具体参考企业微信API
      const corpId = getUrlParams('state');
      initSDK(this.INSIDE_APP_NAME, corpId, apiList); // 注册SDK

      let { result } = await getUserInfo(this.INSIDE_APP_NAME); // 获取用户信息
      if (!result) throw('用户信息获取失败');
      this.$store.commit('SAVE_USER_INFO', result);

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
