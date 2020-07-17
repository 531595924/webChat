<template>
  <div class="signin">
    <h3 class="login_title">
      登录
    </h3>
    <el-form 
      ref="ruleForm" 
      :model="formData" 
      :rules="rules" 
      label-position="top" 
      label-width="80px" 
      @submit.native.prevent="submitForm('ruleForm')"
    >
      <el-form-item prop="account">
        <el-input 
          v-model="formData.account" 
          prefix-icon="iconfont icon-yonghu" 
          autocomplete="off" 
          placeholder="请输入手机号" 
          type="phone" 
          maxlength="11" 
          clearable
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input 
          v-model="formData.password" 
          type="password" 
          show-password
          prefix-icon="iconfont icon-mima" 
          autocomplete="off" 
          placeholder="请输入密码" 
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button 
          :loading="formData.loading" 
          class="loginBtn" 
          type="primary" 
          native-type="submit"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
    <div class="linkBtn">
      <router-link to="signup">
        <el-button type="text">
          立即注册
        </el-button>
      </router-link>
      <router-link to="forgetpassword">
        <el-button type="text">
          忘记密码
        </el-button>
      </router-link>
    </div>
  </div>
</template>
<script>
import md5 from 'md5'

export default {
  name: "Signin",
  components: {},
  data() {
    return {
      formData: {
        account: "",
        password: "",
        loading: false
      },
      rules: {
        account: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  },
  mounted: function() {
    //登录页验证，如果vuex或本地存储已经有登录信息，则直接返回首页
    if (this.$store.state.token == "") {
      var token = JSON.parse(sessionStorage.getItem("token"));
      var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      //本地存储是否保存有token
      if (token && token != "" && userInfo && userInfo != "") {
        //本地存储如果有token和userinfo，则保存到vuex,并next
        this.$store.commit("token", token);
        this.$store.commit("userInfo", userInfo);
        this.$message({
          message: "您已登录",
          type: "success"
        });
        this.pathUrl();
      }
    } else {
      this.$message({
        message: "您已登录",
        type: "success"
      });
      this.pathUrl();
    }
  },
  methods: {
    //登录
    submitForm(formName) {
      var _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          //前端验证通过
          _this.formData.loading = true;
          var formdata = new FormData();
          var password = md5(this.formData.password);
          formdata.append("username", this.formData.account);
          formdata.append("password", password);
          
          // eslint-disable-next-line no-undef
          axios
            .post("user/login", formdata)
            .then(function(r) {
              _this.formData.loading = false;
              if (r.error == 0) {
                //vuex设置
                _this.$store.commit("token", r.data.token);
                _this.$store.commit("userInfo", r.data.userInfo);
                _this.$message({
                  message: "登录成功",
                  type: "success"
                });
                _this.pathUrl();
              } else {
                var message = r.message ? r.message : "网络错误，请重试";
                _this.$message({
                  message: message,
                  type: "error"
                });
              }
            })
            .catch(function(error) {
              console.log(error);
              _this.formData.loading = false;
              _this.$message({
                message: "网络错误",
                type: "error"
              });
            });
        } else {
          //前端验证失败
          return false;
        }
      });
    },
    // 回原路由(暂保留,登录后没有menu菜单列表)
    pathUrl() {
      // if (sessionStorage.routeUrl && sessionStorage.routeUrl != "") {
      //   console.log(sessionStorage.routeUrl);
      //   this.$router.push({ path: sessionStorage.routeUrl });
      // } else {
      this.$router.push({ name: "首页" });
      // }
    }
  }
};
</script>
<style scoped>
.el-form-item {
  margin-bottom: 40px;
}

.el-form {
  width: 300px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  border: 1px rgba(255, 255, 255, 0.6) solid;
}

.loginBtn {
  width: 100%;
  margin-top: 10px;
}

.linkBtn {
  display: flex;
  justify-content: space-between;
}

.login_title {
  position: relative;
}

.icon-QRLogin {
  position: absolute;
  top: -40px;
  right: 0;
  width: 40px;
  margin: 0;
  font-size: 40px;
  font-weight: 100;
  color: #409eff;
}

.icon-QRLogin:hover {
  color: #66b1ff;
}
</style>
