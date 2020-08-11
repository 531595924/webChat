/*
 * @Author: coldlike 531595924@qq.com 
 * @Date: 2020-07-14 17:38:12 
 * @Last Modified by: coldlike 531595924@qq.com
 * @Last Modified time: 2020-08-10 11:42:27
 */
<!-- 模块 -->
<template>
  <!-- 模块根目录 -->
  <div class="chatWindow">
    <div class="window-title">
      {{ activityData.nickname }}
    </div>
    <div
      ref="window-record"
      class="window-record"
    >
      <el-button
        :disabled="moreListState"
        class="moreList"
        type="text"
        @click="getUserChatRecord(listSkip + 20)"
      >
        {{ moreListText }}
      </el-button>
      <div
        v-for="(i, index) in chatRecordList"
        :key="new Date(i.time).getTime()"
        class="record-item"
      >
        <p
          v-if="timeDisplay(i.time, index)"
          class="record-time"
        >
          {{ getTime(i.time) }}
        </p>
        <div
          v-if="i.sendId == $store.state.userInfo._id"
          class="record-main record-own"
        >
          <div class="record-text">
            {{ i.text }}
          </div>
          <div class="record-portrait">
            <img :src="$store.state.userInfo.userPortrait">
          </div>
        </div>
        <div
          v-else
          class="record-main"
        >
          <div class="record-portrait">
            <img :src="activityData.userPortrait">
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
        maxlength="1000"
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
          @click="sendMessage"
        />
      </div>
    </div>
  </div>
</template>
<!-- 模块脚本 -->
<script>
//载入插件
import ws from "../plugins/ws";
export default {
  name: "ChatWindow", // 模块name
  props: {
    activityData: Object,
  },

  data() {
    // 模块数据，必须使用 return
    return {
      textarea: "",
      chatRecordList: [],
      listSkip: 0,
      moreListState: false,
      moreListText: "查看更多历史记录"
    };
  },

  //计算属性
  computed: {},

  //监视属性
  watch: {},

  //生命周期开始
  //页面初始化完成后执行
  mounted() {
    this.getUserChatRecord();
    ws.on("sendMessage", data => {
      this.chatRecordList.push(data.data);
      this.scrollBottom();
    })
  },

  //方法属性
  methods: {
    scrollBottom() {
      let el = this.$refs["window-record"];
      setTimeout(() => {
        this.$scrollTo(el, el.scrollHeight);
      }, 200);
    },
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
    getStamp(time) {
      let date = new Date(time);
      return date.getTime();
    },
    timeDisplay(time, index) {
      if (index > 0) {
        if (
          this.getStamp(time) -
            this.getStamp(this.chatRecordList[index - 1].time) >
          180000
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
    sendMessage() {
      if (this.textarea && this.textarea != "") {
        let formData = new FormData();
        let time = new Date();
        formData.append("toId", this.activityData._id);
        formData.append("text", this.textarea);
        formData.append("time", time.getTime());
        axios
          .post("user/sendMessage", formData)
          .then((res) => {
            if (res.error == 0) {
              this.chatRecordList.push({
                sendId: this.$store.state.userInfo._id,
                time: time,
                text: this.textarea,
              });
              this.textarea = "";
              this.scrollBottom();
            } else {
              this.$message.error("消息发送失败");
            }
          })
          .catch((err) => {
            console.log(err);
            this.$message.error("发送失败");
          });
      } else {
        this.$message.error("请输入要发送的消息");
      }
    },
    getUserChatRecord(skip = 0) {
      axios
        .get(`user/getUserChatRecord?friendId=${this.activityData._id}&skip=${skip}`)
        .then((res) => {
          if (res.error == 0) {
            this.chatRecordList.unshift(...res.data);
            this.listSkip = Number(res.skip);
            if(this.listSkip == 0){
              this.scrollBottom();
            }
            if(res.data.length < 20){
              this.moreListState = true;
              this.moreListText = "没有更多历史记录";
            }
          } else {
            this.$message.error("获取聊天记录失败，请重试");
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message.error("获取聊天记录失败，请重试");
        });
    },
  },
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
  padding: 10px;
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
  background-color: rgba(38, 131, 245, 1);
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

.moreList {
  margin: 0 auto 20px auto;
  display: block;
}
</style>
<style>
/*公共样式*/
</style>
