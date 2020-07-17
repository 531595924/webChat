<template>
  <div class="login">
    <div class="loginbg" />
    <transition 
      name="el-fade-in-linear" 
      mode="out-in"
    >
      <keep-alive exclude="QRsignin"> 
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>
<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped>
.login {
  display: flex;
  height: 100%;
}

.loginbg {
  width: 61.8%;
  background: url(../../assets/loginbg.jpg) no-repeat center / auto 100%;
}

.signin,
.signup,
.QRsignin,
.forgetpassword {
  padding: 0 50px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
<style>
.login_title {
  text-align: center;
  color: #409eff;
  font-size: 40px;
  margin-bottom: 50px;
}
</style>
