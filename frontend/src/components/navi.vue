<template>
  <div id="Navi">
    <!-- <div 
      :class="isCollapse ? 'nav_logo_min' : 'nav_logo_max' " 
      class="nav_logo"
    /> -->
    <div class="el_menu_box">
      <el-menu 
        v-loading="loading" 
        :collapse="isCollapse" 
        :router="true" 
        :default-active="pathUrl" 
        :unique-opened="true"
        class="el-menu-vertical-demo" 
        background-color="#35343f" 
        text-color="#fff" 
        active-text-color="#00a2ff" 
        element-loading-text="菜单加载中..." 
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <template 
          v-for="i in menudata"
        >
          <el-menu-item 
            v-if="!i.fun || i.fun.length == 0" 
            :key="i.app_id" 
            :index="'/' + i.app_title"
          >
            <i 
              :class="'icon-' + i.app_title" 
              class="iconfont"
            />
            <span slot="title">{{ i.app_name }}</span>
          </el-menu-item>
          <el-submenu 
            v-else 
            :key="i.app_id" 
            :index="'/' + i.app_title"
          >
            <template slot="title">
              <i 
                :class="'icon-'+i.app_title" 
                class="iconfont"
              />
              <span slot="title">{{ i.app_name }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item 
                v-for="o in i.fun" 
                :key="o.app_fun_id" 
                :index="'/' + i.app_title + '/' + o.app_title "
              >
                <i class="iconfont icon-dian" />{{ o.app_title }}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </template>
      </el-menu>
    </div>
  </div>
</template>
<script>
export default {
  name: "Navi",
  props: {
    isCollapse: Boolean,
    menuSwitch: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      loading: false,
      menudata: this.$store.state.menudata
    };
  },
  //计算属性
  computed: {
    getMenudata() {
      if (this.$store.state.menudata) {
        return this.$store.state.menudata;
      } else {
        return [];
      }
    },
    userinfo() {
      return this.$store.state.userInfo;
    },
    pathUrl() {
      var route = this.$route;
      if (route.meta.Jurisdiction) {
        return route.path;
      } else {
        return "/" + route.path.split("/")[1];
      }
    }
  },

  watch: {
    getMenudata(val) {
      this.menudata = val;
    },
    // userinfo(data) {
    //   if (data && data != "") {
    //     this.getMenu();
    //     this.$emit("reset");
    //   }
    // }
  },
  created() {
    this.getMenu();
  },
  methods: {
    getMenu() {
      var _this = this;
      _this.loading = true;
      axios
        .get("user/getMenu")
        .then(function(r) {
          _this.loading = false;
          if (r.error == 0) {
            var data = r.data;
            _this.$store.commit("menudata", data);
            sessionStorage.menudata = JSON.stringify(data);
          } else {
            _this.$message({
              message: r.message,
              type: "error"
            });
          }
        })
        .catch(function(error) {
          _this.loading = false;
          console.log(error);
          _this.$message({
            message: "网络错误",
            type: "error"
          });
        });
    }
  }
};
</script>
<style scoped>
#Navi {
  width: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: 100%;
}

.nav_logo {
  transition: 0.3s all;
  width: auto;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 80%;
  background-color: rgb(0, 162, 255);
  min-height: 50px;
}

.el_menu_box {
  flex: 1;
  overflow-y: auto;
  background-color: rgb(53, 52, 63);
}

.el-menu >>> .is-active {
  background: linear-gradient(
    to left,
    rgba(0, 230, 255, 1) 0%,
    rgba(0, 162, 255, 1) 100%
  );
  color: white !important ;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu-vertical-demo {
  flex: 1;
  border: none;
}

.nav_logo_max {
  width: 100%;
  height: 50px;
  background-image: url(../assets/logo1.svg);
}

.nav_logo_min {
  width: 100%;
  height: 50px;
  background-image: url(../assets/logo2.svg);
}

.el_menu_title {
  font-size: 14px;
  line-height: 50px;
  text-align: center;
  font-weight: 900;
  color: #409eff;
}

.el-menu-item {
  height: 50px;
  line-height: 50px;
}
</style>
<style>
.el-menu-item-group__title {
  display: none;
}
</style>
