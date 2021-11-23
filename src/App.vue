<template>
  <div id="app">
    <keep-alive :include="KEEP_ALIVE_LISTS">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
  export default {
    name: 'app',
    computed: {
      ...mapGetters(['KEEP_ALIVE_LISTS']),
    },
  }
</script>


<style lang="less">
@baseSize: 16px;

#app {
  height: 100%;
  // padding: 15px;
  box-sizing: border-box;
}
body {
  position: relative;
  height: 100%;
  margin: 0;
  padding: 0;
  font-size: @baseSize;
  font-family: '微软雅黑', tahoma, arial, sans-serif;
  color: #333;
  // overflow: hidden;
}
html {
  height: 100%;
  overflow: hidden;
}

h1,
h2,
h3,
h4,
h5,
h6,
hr,
p,
blockquote,
dl,
dt,
dd,
ul,
ol,
li,
pre,
form,
fieldset,
legend,
button,
input,
div,
textarea,
th,
td {
  margin: 0;
  padding: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 100%;
  font-weight: normal;
}

address,
cite,
dfn,
em,
var {
  font-style: normal;
}

code,
kbd,
pre,
samp {
  font-family: couriernew, courier, monospace;
}

small {font-size: 14px;}

ul,
ol {
  list-style: none;
}

a {
  text-decoration: none;
  color: #333;
}

a:hover {
  text-decoration: none;
  color: #333;
}

sup {vertical-align: text-top;}

sub {vertical-align: text-bottom;}

legend {color: #000;}

fieldset,
img {
  border: 0;
}

button,
input,
select,
textarea {
  font-size: 100%;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}
</style>
