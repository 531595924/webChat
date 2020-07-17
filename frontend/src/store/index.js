import Vue from "vue";
import Vuex from "vuex";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    token: "",
    userInfo: {},
    menudata: ""
  },
  mutations: {
    //全局方法
    token(state, token) {
      state.token = token;
      sessionStorage.token = JSON.stringify(token);
    },
    userInfo(state, userInfo) {
      state.userInfo = userInfo;
      sessionStorage.userInfo = JSON.stringify(userInfo);
    },
    setUserPortrait(state, portraitUrl){
      state.userInfo.userPortrait = portraitUrl;
      sessionStorage.userInfo = JSON.stringify(state.userInfo);
    },
    menudata(state, menudata) {
      state.menudata = menudata;
      sessionStorage.menudata = JSON.stringify(menudata);
    },
    //退出登录, 重置所有状态
    signOut(state) {
      router.push("/login");
      state.token = "";
      state.userInfo = "";
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userInfo");
    }
  },
  actions: {}
});
