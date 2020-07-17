/*
 * @Author: coldlike 531595924@qq.com 
 * @Date: 2020-06-30 11:37:51 
 * @Last Modified by:   coldlike 531595924@qq.com 
 * @Last Modified time: 2020-06-30 11:37:51 
 */
<!-- 模块 -->
<template>
  <!-- 模块根目录 -->
  <div class="homeData" />
</template>
<!-- 模块脚本 -->
<script>
//载入插件
export default {
  name: "HomeData", // 模块name
  data() {
    // 模块数据，必须使用 return
    return {
      listData: ""
    };
  },

  //计算属性
  computed: {},

  //监视属性
  watch: {},

  //生命周期开始
  //页面初始化完成后执行
  // mounted: (){},

  //方法属性
  methods: {}
};
</script>
<style scoped>
/*私有样式*/
</style>
<style>
/*公共样式*/
</style>
