/*
 * @Author: coldlike 531595924@qq.com 
 * @Date: 2020-07-14 17:38:12 
 * @Last Modified by: coldlike 531595924@qq.com
 * @Last Modified time: 2020-07-14 18:01:04
 */
<!-- 模块 -->
<template>
  <!-- 模块根目录 -->
  <div class="chatWindow">
    <div class="window-title">
      说谎的流星2013
    </div>
    <div class="window-record">
      <div
        v-for="(i, index) in chatRecordList"
        :key="i.time"
        class="record-item"
      >
        <p
          v-if="timeDisplay(i.time, index)"
          class="record-time"
        >
          {{ getTime(i.time) }}
        </p>
        <div
          v-if="i.sender.userId == $store.state.userInfo._id"
          class="record-main record-own"
        >
          <div class="record-text">
            {{ i.text }}
          </div>
          <div class="record-portrait">
            <img :src="i.sender.portraitUrl">
          </div>
        </div>
        <div
          v-else
          class="record-main"
        >
          <div class="record-portrait">
            <img :src="i.sender.portraitUrl">
          </div>
          <div class="record-text">
            {{ i.text }}
          </div>
        </div>
      </div>
    </div>
    <div class="window-send">
      <el-input
        v-model="textarea"
        class="window-send-inputBox"
        type="textarea"
        maxlength="500"
        show-word-limit
        resize="none"
        rows="4"
      />
      <div class="window-send-Btn">
        <el-button
          type="primary"
          size="medium"
          circle
          icon="iconfont icon-Release"
        />
      </div>
    </div>
  </div>
</template>
<!-- 模块脚本 -->
<script>
//载入插件
export default {
  name: "ChatWindow", // 模块name
  props: {
    activityId: String
  },

  data() {
    // 模块数据，必须使用 return
    return {
      textarea: "",
      chatRecordList: [
        {
          sender: {
            nickname: "士大夫",
            userId: "5f0591c594dc751c0434f92c",
            portraitUrl:
              "http://localhost:5000/userUpData/userPortrait/5f0591c594dc751c04d2f92c-1594604640257.jpg"
          },
          time: 1594684730505,
          text: "你好"
        },
        {
          sender: {
            nickname: "士大夫",
            userId: "5f0591c594dc751c0434f92c",
            portraitUrl:
              "http://localhost:5000/userUpData/userPortrait/5f0591c594dc751c04d2f92c-1594604640257.jpg"
          },
          time: 1594685730505,
          text: "你好"
        },
        {
          sender: {
            nickname: "说谎的流星2013",
            userId: "5f0591c594dc751c04d2f92c",
            portraitUrl:
              "http://localhost:5000/userUpData/userPortrait/5f0591c594dc751c04d2f92c-1594604640257.jpg"
          },
          time: 1594686730505,
          text: "你好"
        },
        {
          sender: {
            nickname: "士大夫",
            userId: "5f0591c594dc751c0434f92c",
            portraitUrl:
              "http://localhost:5000/userUpData/userPortrait/5f0591c594dc751c04d2f92c-1594604640257.jpg"
          },
          time: 1594687730605,
          text: "你好"
        }
      ]
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
      let Y = time.getYear() + 1900;
      let M = time.getMonth() + 1;
      let D = time.getDate();
      let h = time.getHours();
      h = h < 10 ? `0` + h : h;
      let m = time.getMinutes();
      m = m < 10 ? `0` + m : m;
      let s = time.getSeconds();
      s = s < 10 ? `0` + s : s;
      return `${Y}-${M}-${D} ${h}:${m}:${s}`;
    },
    timeDisplay(time, index){
      if(index > 0){
        if(time - this.chatRecordList[index - 1].time > 180){
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    }
  }
};
</script>
<style scoped>
/*私有样式*/
.chatWindow {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 5px;
}

.window-title {
  font-size: 18px;
  padding: 8px 10px;
  border-top: 1px solid rgba(234, 234, 234, 1);
  border-bottom: 1px solid rgba(234, 234, 234, 1);
}

.window-record {
  overflow-y: auto;
  padding: 5px;
  margin: 5px 0;
  flex: 1;
}

.window-send {
  height: 150px;
  display: flex;
  flex-direction: column;
}

.window-send-inputBox {
  flex: 1;
}

.window-send-Btn {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.record-time {
  font-size: 14px;
  color: #a6a6a6;
  text-align: center;
  line-height: 20px;
}

.record-main {
  display: flex;
  margin-bottom: 10px;
}

.record-portrait {
  width: 40px;
  height: 40px;
  min-width: 40px;
  min-height: 40px;
  border-radius: 5px;
  overflow: hidden;
}

.record-portrait > img {
  width: 100%;
  height: 100%;
}

.record-text {
  background-color: #eee;
  margin-left: 8px;
  margin-right: 0;
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
}

.record-own > .record-text {
  background-color: rgba(38,131,245,1);
  color: white;
  margin-right: 8px;
  margin-left: 0;
}

.record-own {
  justify-content: flex-end;
}

.el-button >>> .icon-Release {
  width: 18px;
  margin-right: 0;
}
</style>
<style>
/*公共样式*/
</style>
