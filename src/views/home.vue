<template>
  <div class="home-main">
    <h1 data-dot="title_point">Vue Front 项目模板</h1>
    <global-loading mask="small" v-show="loading" />
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      loading: false,
    }
  },
  async created() {

    try {

      // let userInfo = await this.$store.dispatch('loginByToken');
      let userInfo = await this.$store.dispatch('loginByCode');
      this.$store.dispatch('initSDK');
      console.log('用户信息', userInfo);

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
