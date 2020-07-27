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
      width="400"
      trigger="hover"
    >
      <div
        slot="reference"
        class="news"
      >
        <i class="iconfont icon-xiaoxi">
          <el-badge
            :value="news.length"
            :max="9"
            class="news-badge"
          />
        </i>
      </div>
      <div class="news-box">
        <div
          v-for="i in news"
          :key="i._id"
          class="news-item"
        >
          <p>{{ i.type }}</p>
          <p>{{ i.message }}</p>
        </div>
      </div>
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
export default {
  name: "RightTop",
  data() {
    return {
      news: [],
    };
  },
  watch: {},
  mounted() {
    this.getNews();
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
            this.news = this.news.concat(res.data);
            this.$notify.warning({
              title: `您有${res.data.length}条未读消息`,
              offset: 50,
            });
          } else {
            var message = res.message ? res.message : "网络错误，请重试";
            this.$message({
              message: message,
              type: "error",
            });
          }
        })
        .catch((err) => console.log(err));
    },
    userInfo() {
      this.$router.push("/User");
    },
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
</style>
<style>
</style>
