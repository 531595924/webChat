/*
 * @Author: coldlike 531595924@qq.com 
 * @Date: 2020-07-14 09:12:06 
 * @Last Modified by: coldlike 531595924@qq.com
 * @Last Modified time: 2020-08-10 17:08:40
 */

<!-- 模块 -->
<template>
  <!-- 模块根目录 -->
  <div class="displayList">
    <template v-if="listData.length != 0">
      <div
        v-for="i in listData"
        :key="i._id"
        class="list-item"
        :class="i._id == activityId ? 'item-activity' : ''"
        @click="$emit('clickitem', i._id)"
      >
        <div
          class="item-portrait"
          :class="i.online == 1 ? '' : 'offline'"
        >
          <img :src="i.userPortrait">
        </div>
        <div class="item-right">
          <div class="item-right-top">
            <p class="item-title">
              {{ i.nickname }}
            </p>
            <p class="item-date">
              {{ i.lastRecordTime? getTime(i.lastRecordTime) : '' }}
            </p>
          </div>
          <p
            v-if="i.lastRecord"
            class="item-text"
          >
            {{ i.lastRecord }}
          </p>
        </div>
        <el-badge
          :value="i.unreadNum"
          :max="99"
          class="item"
        />
      </div>
    </template>
    <div
      v-else
      class="listEmpty"
    >
      列表空空如也，请添加
    </div>
  </div>
</template>
<!-- 模块脚本 -->
<script>
//载入插件
export default {
  name: "DisplayList", // 模块name
  props: {
    activityId: String,
    listData: {
      type: Array,
      default(){
        return []
      }
    }
  },
  data() {
    // 模块数据，必须使用 return
    return {
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
  methods: {
    getTime(time) {
      time = new Date(time);
      // let Y = time.getYear() + 1900;
      let M = time.getMonth() + 1;
      let D = time.getDate();
      let h = time.getHours();
      h = h < 10 ? `0` + h : h;
      let m = time.getMinutes();
      m = m < 10 ? `0` + m : m;
      return `${M}-${D}  ${h}:${m}`;
    }
  }
};
</script>
<style scoped>
/*私有样式*/
.displayList {
  width: 350px;
  height: 100%;
  overflow-y: auto;
  background-color: rgba(250, 250, 250, 1);
}

.list-item {
  background-color: rgba(250, 250, 250, 1);
  transition: all 0.3s;
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 70px;
  padding: 0 15px;
  border-bottom: 1px #fff solid;
}

.list-item:nth-last-child(1) {
  border-bottom: none;
}

.list-item:hover {
  background-color: rgba(235, 235, 235, 1);
}

.item-portrait {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  overflow: hidden;
}

.item-portrait > img {
  width: 100%;
  height: 100%;
}

.item-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 5px;
}

.item-right-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-title {
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 210px;
}

.item-date {
  text-align: right;
  font-size: 12px;
  color: #a6a6a6;
}

.item-text {
  margin-top: 8px;
  max-width: 280px;
  font-size: 12px;
  color: #a6a6a6;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-activity {
  background-color: rgba(223, 235, 255, 1);
}

.listEmpty {
  text-align: center;
  font-size: 16px;
  color: #aaa;
  margin-top: 30px;
}

.offline {
  filter: grayscale(100%);
}
</style>
<style>
/*公共样式*/
</style>
