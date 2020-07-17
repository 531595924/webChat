<template>
  <div class="IEpop">
    <h2 class="h2">
      您的浏览器版本低
    </h2>
    <p class="tips">
      推荐您使用
    </p>
    <div class="box">
      <a 
        href="https://www.google.cn/chrome/" 
        target="_blank"
      >chrome浏览器</a>
      <a 
        href="http://browser.360.cn/" 
        target="_blank"
      >360浏览器</a>
    </div>
  </div>
</template>
<script>
export default {
  name: "IEpop"
};
</script>
<style scoped>
.IEpop {
  text-align: center;
}

.h2 {
  font-size: 50px;
  padding-top: 180px;
}

.tips {
  font-size: 30px;
  font-weight: 900;
  padding-top: 100px;
}

.box {
  text-align: center;
  padding-top: 100px;
}

.box > a {
  display: inline;
  margin: 20px;
  color: blue;
  cursor: pointer;
}
</style>
