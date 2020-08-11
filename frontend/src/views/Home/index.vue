/*
 * @Author: coldlike 531595924@qq.com 
 * @Date: 2019-04-09 10:52:44 
 * @Last Modified by: coldlike 531595924@qq.com
 * @Last Modified time: 2020-08-10 11:48:08
 */
<template>
  <div class="home">
    <el-container>
      <el-aside width="auto">
        <navi
          :menu-switch="menuClass"
          :is-collapse="isCollapse"
          @reset="menuClass = '1'"
        />
      </el-aside>
      <el-container>
        <el-header style="height: 50px; padding: 0;z-index: 99;">
          <div class="top_left">
            <div
              :class="isCollapse ? 'menu_open' : 'menu_close' "
              class="menu_tab"
              @click="isCollapse = !isCollapse"
            >
              <i class="iconfont icon-deit-a" />
            </div>
          </div>
          <rightTop />
        </el-header>
        <el-main>
          <!-- 面包屑 -->
          <breadcrumb v-if="$route.name != '首页'" />
          <transition
            name="el-fade-in-linear"
            mode="out-in"
          >
            <router-view class="main_box" />
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
// @ is an alias to /src
import navi from "../../components/navi";
import breadcrumb from "../../components/breadcrumb";
import rightTop from "../../components/rightTop";
import ws from "../../plugins/ws";

export default {
  name: "Home",
  components: {
    navi,
    breadcrumb,
    rightTop,
  },
  data() {
    return {
      isCollapse: false,
      menuClass: "",
    };
  },
  watch: {
    $route() {
      this.saveRoute();
    },
  },
  async mounted() {
    var _this = this;
    _this.windowSize();
    window.onresize = function () {
      _this.windowSize();
    };
    var Administrators = sessionStorage.Administrators;
    if (Administrators && Administrators != "") {
      this.$store.commit("Administrators", JSON.parse(Administrators));
    }
    if (sessionStorage.menuClass) {
      this.menuClass = sessionStorage.menuClass;
    } else {
      this.menuClass = "1";
    }
    await this.getFriends();
    await this.linkWS();
    this.watchWs();
  },
  methods: {
    windowSize() {
      if (document.body.clientWidth < 1300) {
        this.isCollapse = true;
      }
    },
    // 保存当前路由地址
    saveRoute() {
      var name = this.$route.name;
      sessionStorage.routeUrl = name;
      sessionStorage.menuClass = this.menuClass;
    },
    async linkWS() {
      await ws.connect();
      ws.on("wsOpen", () => {
        this.$message.success("消息服务器连接成功");
      });
      ws.on("wsClose", () => {
        if (this.$route.meta.mustLogin) {
          this.$message({
            type: "error",
            duration: 2000,
            showClose: false,
            message: "消息服务器连接断开，2秒后自动重连",
          });
          setTimeout(async () => {
            await ws.connect();
          }, 2000);
        }
      });
    },
    async getFriends() {
      axios
        .get("user/getFriendsList")
        .then((res) => {
          if (res.error == 0) {
            this.$store.commit("friendsList", res.data);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message.error("获取好友错误，请刷新重试");
        });
    },
    watchWs() {
      const _this = this;
      ws.on("friendOnlineState", data => {
        let friend = this.$store.state.friendsList.find(i => i._id == data.friendId);
        if(data.state == 1){
          this.$notify.success({
            title: `您的好友 ${friend.nickname} 上线啦`,
            offset: 50
          });
        }
        this.$store.commit("friendOnlineState", {
          id: data.friendId,
          state: data.state,
        })
      });
      ws.on("sendMessage", data => {
        let friend = this.$store.state.friendsList.find(i => i._id == data.data.sendId);
        if(this.$store.state.currentChatId != data.data.sendId){
          this.$notify({
            title: friend.nickname,
            message: data.data.text,
            iconClass: "el-icon-chat-dot-round",
            offset: 50,
            onClick(){
              _this.$router.push({name: "我的好友", params: { friendId:  friend._id}});
            }
          });
        }
      })
    },
  },
};
</script>
<style scoped>
.home {
  height: 100%;
}

.user_box {
  float: right;
  height: inherit;
}

.el-header {
  display: flex;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
  justify-content: space-between;
}

.menu_tab {
  width: 50px;
  transition: 0.3s all;
  cursor: pointer;
}

.menu_tab:hover >>> i {
  color: #4198ff;
}

.menu_tab > .iconfont {
  font-size: 16px;
  color: #666;
  width: 100%;
  text-align: center;
  margin: 0 auto;
  line-height: 50px;
  transition: 0.3s all;
}

.top_left {
  display: flex;
  align-items: center;
}

.el-container {
  height: 100%;
}

.el-aside {
  max-width: 200px;
  height: 100%;
  overflow: hidden;
}

.menu_open {
  transform: rotate(180deg);
}

#breadcrumb {
  margin-bottom: 20px;
}

.el-main {
  flex-direction: column;
  display: flex;
}

.el-header {
  align-items: center;
}

.main_box {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  position: relative;
}
</style>
