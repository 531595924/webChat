<template>
  <div id="rightTop">
    <el-tooltip
      class="item"
      effect="dark"
      content="账户设置"
      placement="bottom"
    >
      <div
        class="userInfo"
        @click="userInfo"
      >
        <div class="userInfo_img">
          <img
            v-if="$store.state.userInfo.userPortrait && $store.state.userInfo.userPortrait != ''"
            :src="$store.state.userInfo.userPortrait"
          >
        </div>
        <el-button
          type="text"
        >
          {{ $store.state.userInfo.nickname ? $store.state.userInfo.nickname : "未设置昵称" }}
        </el-button>
      </div>
    </el-tooltip>
    <el-popover
      placement="bottom"
      width="300"
      trigger="hover"
    >
      <div
        slot="reference"
        class="news"
      >
        <i class="iconfont icon-xiaoxi">
          <el-badge
            v-if="unreadNews.length != 0"
            :value="unreadNews.length"
            :max="9"
            class="news-badge"
          />
        </i>
      </div>
      <el-collapse
        v-if="news.length != 0"
        accordion
        @change="readNews"
      >
        <el-collapse-item
          v-for="(i, index) in news"
          :key="index"
          :name="index"
        >
          <template slot="title">
            <i
              v-if="!i.readStatus"
              class="el-icon-info"
            />
            {{ i.message }}
          </template>
          <div v-if="i.secondType == 'addFriend'">
            <p
              v-if="i.data.text"
              class="addFriend_text"
            >
              备注消息：{{ i.data.text }}
            </p>
            <el-button-group class="addFriend_btn_box">
              <el-button
                type="success"
                size="small"
                @click="passFriend(i.data.sendUserId, 1)"
              >
                同 意
              </el-button>
              <el-button
                type="danger"
                plain
                size="small"
                @click="passFriend(i.data.sendUserId, 0)"
              >
                不同意
              </el-button>
            </el-button-group>
          </div>
        </el-collapse-item>
      </el-collapse>
      <p
        v-else
        class="noNews"
      >
        无未读消息
      </p>
    </el-popover>
    <el-tooltip
      class="item"
      effect="dark"
      content="退出登录"
      placement="bottom"
    >
      <div
        class="signOut"
        @click="signOut"
      >
        <i class="iconfont icon-signOut" />
      </div>
    </el-tooltip>
  </div>
</template>
<script>
import ws from "../plugins/ws";
export default {
  name: "RightTop",
  data() {
    return {
      news: []
    };
  },
  computed: {
    unreadNews(){
      return this.news.filter(i => !i.readStatus)
    }
  },
  watch: {},
  mounted() {
    this.getNews();
    ws.on("news", data => {
      this.news.unshift(data);
      if(data.secondType == "addFriend"){
        this.$notify.success({
        title: data.message,
        message: "备注：" + data.data.text,
        offset: 50
      });
      } else {
        this.$notify.success({
          title: `您有新消息`,
          offset: 50
        });
      }
    })
  },
  methods: {
    signOut() {
      this.$msgbox({
        title: "退出登录",
        message: "确定要退出登录么？",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "退出中...";
            ws.close();
            this.$store.commit("signOut");
            instance.confirmButtonLoading = false;
            done();
          } else {
            done();
          }
        },
      });
    },
    getNews() {
      axios
        .get("user/getNews")
        .then((res) => {
          if (res.error == 0) {
            this.news = res.data.reverse();
            if(this.unreadNews.length != 0){
              this.$notify.warning({
                title: `您有${this.unreadNews.length}条未读消息`,
                offset: 50,
              });
            }
          } else {
            var message = res.message ? res.message : "网络错误，请重试";
            this.$message({
              message: message,
              type: "info",
            });
          }
        })
        .catch((err) => console.log(err));
    },
    readNews(index){
      if(typeof index == "number"){
        let item = this.news[index];
        if(item.readStatus == false){
          item.readStatus = true;
          let formData = new FormData();
          formData.append("newsId", item._id);
          axios.post("user/readNews", formData)
        }
      }
    },
    userInfo() {
      this.$router.push("/User");
    },
    passFriend(friendId, type){
      let formData = new FormData();
      formData.append("friendId", friendId);
      formData.append("pass", type);
      axios.post("user/passAddFriend", formData)
        .then(res => {
          if(res.error == 1){
            this.$message({
              message: res.message,
              type: "error",
            });
          }
        })
        .catch(err => {
          this.$message({
              message: "添加好友失败",
              type: "info",
            });
          console.log(err)
        })
    }
  },
};
</script>
<style scoped>
#rightTop {
  display: flex;
  align-items: center;
  margin-right: 5px;
}

.userInfo_img {
  height: 36px;
  width: 36px;
  border-radius: 50%;
  margin: 7px;
  overflow: hidden;
  background: url("../assets/default_protrait.jpg") no-repeat 100% / 100%;
  border: 1px #ddd solid;
}

.userInfo {
  padding-right: 10px;
  display: flex;
  cursor: pointer;
}

.el-button {
  font-weight: 900;
}

.userInfo_img > img {
  width: 100%;
  height: 100%;
}

.news,
.signOut {
  line-height: 50px;
  width: 50px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  color: #999;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 20px;
}

.news:hover,
.signOut:hover {
  color: rgba(0, 162, 255, 1);
}

.news > i,
.signOut > i {
  font-size: 16px;
  margin: 0;
}

.backAdmin {
  margin-right: 20px;
}

.Administrators_text {
  font-size: 14px;
  margin-right: 20px;
  color: rgba(0, 162, 255, 1);
  font-weight: 900;
}

.Administrators_text > span {
  font-weight: 500;
}

.news-badge {
  margin-top: 5px;
}
.icon-xiaoxi {
  width: 50px;
}

.el-icon-info {
  color: #F56C6C;
  margin-right: 3px;
}

.addFriend_text {
  padding-bottom: 20px;
  color: #999;
}

.addFriend_btn_box {
  width: 100%;
  display: flex;
}

.addFriend_btn_box > .el-button:nth-child(1) {
  flex: 1;
}

.addFriend_btn_box > .el-button:nth-child(2) {
  flex: 0.4;
}

.el-collapse {
  max-height: 500px;
  padding-right: 5px;
  overflow-y: auto;
}
</style>
<style>
</style>
