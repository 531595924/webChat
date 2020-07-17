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
    <el-tooltip
      class="item"
      effect="dark"
      content="消息通知（暂无链接）"
      placement="bottom"
    >
      <div
        class="news"
        @click="news"
      >
        <i class="iconfont icon-xiaoxi" />
      </div>
    </el-tooltip>
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
    return {};
  },
  watch: {},
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
        }
      });
    },
    news() {
      axios.get('miscellaneous/news')
        .then(res => console.log(res))
        .catch(err => console.log(err))
    },
    userInfo() {
      this.$router.push("/User");
    }
  }
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
  width: 40px;
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
</style>
<style>
</style>
