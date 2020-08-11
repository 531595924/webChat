/*
 * @Author: coldlike 531595924@qq.com 
 * @Date: 2020-06-29 15:38:04 
 * @Last Modified by: coldlike 531595924@qq.com
 * @Last Modified time: 2020-08-10 14:46:21
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store"

Vue.use(VueRouter)

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
    path: "/",
    name: "",
    redirect: { name: "首页" }, //路由重定向
    component: () => import("../views/Home/"),
    children: [
      {
        path: "Index",
        name: "首页",
        meta: {
          mustLogin: true
        },
        component: () => import("../views/Home/HomeData")
      },
      {
        path: "User",
        name: "账户设置",
        meta: {
          mustLogin: true
        },
        component: () => import("../views/Home/User")
      },
      {
        path: "Friends",
        name: "我的好友",
        meta: {
          mustLogin: true
        },
        component: () => import("../views/Home/Friends")
      },
      {
        path: "ChatGroup",
        name: "我的群",
        meta: {
          mustLogin: false
        },
        component: () => import("../views/Home/ChatGroup")
      },
    ]
  },
  {
    path: "/Login",
    name: "",
    redirect: { name: "登录" },
    component: () => import("../views/login/"),
    children: [
      {
        path: "signin",
        name: "登录",
        component: () => import("../views/login/signin")
      },
      {
        path: "signup",
        name: "注册",
        component: () => import("../views/login/signup")
      },
      {
        path: "forgetpassword",
        name: "忘记密码",
        component: () => import("../views/login/forgetpassword")
      }
    ]
  },
  {
    path: "/IEpop",
    name: "IEpop",
    component: () => import("../views/IEpop")
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../views/404")
  },
  {
    path: "*",
    name: "error",
    redirect: "/404"
  }
  ]
});

//路由守卫设置
router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    next({ path: "/404" });
  } else {
    //判断to页面是否需要的登录
    if (to.meta.mustLogin) {
      //vuex是否保存有token
      if (store.state.token && store.state.token != "") {
        Jurisdiction();
      } else {
        var token = JSON.parse(sessionStorage.getItem("token"));
        var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        //本地存储是否保存有token
        if (token && token != "" && userInfo && userInfo != "") {
          //本地存储如果有token和userinfo，则保存到vuex,并验证权限后登录
          store.commit("token", token);
          store.commit("userInfo", userInfo);
          Jurisdiction();
        } else {
          next({ path: "/Login" });
        }
      }
    } else {
      next();
    }
  }
  // 权限验证
  function Jurisdiction() {
    // 维护中 跳转
    // next({ path: "/404" });

    // 屏蔽权限验证
    // next();

    // to是否需要权限验证
    if (to.meta.Jurisdiction) {
      // 查找vuex或本地存储的menuData
      var menudata = store.state.menudata
        ? store.state.menudata
        : JSON.parse(sessionStorage.getItem("menudata"));
      // 如果有menuData，则验证权限
      if (menudata && menudata != "") {
        // 递归menuData列表
        var menuArray = [];
        menudata.forEach(function(item) {
          (function each(data) {
            data.forEach(function(i) {
              menuArray.push(i.app_title);
              if (i.fun && i.fun.length != 0) {
                each(i.fun);
              }
            });
          })(item.app);
        });
        // 匹配appname
        var pass = menuArray.some(i => i === to.name);
        // 如果有权限则next,没有转入404
        if (pass) {
          next();
        } else {
          next({ path: "/404" });
        }
      } else {
        //如果没有menuData，则返回登录
        next({ path: "/Login" });
      }
    } else {
      next();
    }
  }
});

export default router
