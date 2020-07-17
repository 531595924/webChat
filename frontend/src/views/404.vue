<template>
  <div class="err404">
    <h2 class="h2">
      404
    </h2>
    <p class="tips">
      页面没有找到
    </p>
    <div class="box">
      <p @click="$router.go(-1)">
        返回上一页
      </p>
      <p @click="$router.push({name: '首页'})">
        返回首页
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "Err404",
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped>
.err404 {
  text-align: center;
}

.h2 {
  font-size: 300px;
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

.box > p {
  display: inline;
  margin: 20px;
  color: blue;
  cursor: pointer;
}
</style>
