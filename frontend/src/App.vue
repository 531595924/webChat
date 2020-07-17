/*
 * @Author: coldlike 531595924@qq.com 
 * @Date: 2020-06-29 15:32:31 
 * @Last Modified by: coldlike 531595924@qq.com
 * @Last Modified time: 2020-06-29 15:34:12
 */
<template>
  <div id="app">
    <transition
      name="el-fade-in-linear"
      mode="out-in"
    >
      <router-view />
    </transition>
  </div>
</template>
<script>
export default {
  name: "App",
  mounted() {
    // loading 切换
    var loading = document.getElementById("appLoading");
    document.getElementById("app").style.display = "block";
    loading.style.transform = "translateY(-100vh)";
    loading.style.opacity = "0";
    setTimeout(() => {
      loading.style.display = "none";
    }, 600);
    var userAgent = window.navigator.userAgent;
    if (userAgent.indexOf("NET") != -1 && userAgent.indexOf("rv") != -1) {
      /*'IE浏览器提示浏览器版本低'*/
      this.$router.push({ name: "IEpop" });
    }
  }
};
</script>
<style>
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  min-width: 1290px;
}

* {
  margin: 0;
  padding: 0;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

a {
  text-decoration: none;
}

#app {
  height: 100%;
}

/*阿里iconfont*/
.iconfont {
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 18px;
  display: inline-block;
}

/*滚动条样式*/
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 5px;
}

::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  background: rgba(138, 138, 138, 0.6);
  transition: 0.3s background;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(64, 158, 255, 0.8);
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0);
}

ul li {
  list-style-type: none;
}

input:-webkit-autofill {
  box-shadow: 0 0 0 1000px white inset;
  -webkit-text-fill-color: #333;
}
</style>
