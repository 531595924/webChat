<template>
  <div class="signup">
    <h3 class="login_title">
      注册
    </h3>
    <el-form
      ref="ruleForm"
      :model="formData"
      :rules="rules"
      label-position="top"
      label-width="80px"
      status-icon
      @submit.native.prevent="submitForm('ruleForm')"
    >
      <el-form-item
        label="手机号"
        prop="phone"
      >
        <el-input
          v-model="formData.phone"
          autocomplete="off"
          type="phone"
          placeholder="请输入手机号"
          maxlength="11"
          clearable
        />
      </el-form-item>
      <!-- <el-form-item 
        label="验证码" 
        prop="code"
      >
        <el-input 
          v-model="formData.code" 
          autocomplete="off" 
          type="phone" 
          placeholder="请输入验证码" 
          maxlength="6" 
          clearable
        >
          <el-button 
            slot="append" 
            :disabled="code.type == 'iscode' || code.type == 'codeing'" 
            :loading="code.type == 'codeing'" 
            type="primary" 
            @click="getCode('ruleForm')"
          >
            {{ code.iscodeText }}
          </el-button>
        </el-input>
      </el-form-item>-->
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          v-model="formData.password"
          type="password"
          autocomplete="off"
          placeholder="请输入密码"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="重复密码"
        prop="repeatPassword"
      >
        <el-input
          v-model="formData.repeatPassword"
          type="password"
          autocomplete="off"
          placeholder="请再次密码"
          clearable
        />
      </el-form-item>
      <el-form-item prop="agreement">
        <el-checkbox
          v-model="formData.agreement"
          name="agreement"
        >
          我已阅读并同意遵守&nbsp;&nbsp;
          <router-link to="signin">
            服务条款
          </router-link>
        </el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button
          class="loginBtn"
          type="primary"
          native-type="submit"
        >
          立即注册
        </el-button>
      </el-form-item>
    </el-form>
    <div class="linkBtn">
      <el-button
        type="text"
        @click="$router.go(-1);"
      >
        &#60;&#60; 返回
      </el-button>
    </div>
  </div>
</template>
<script>
import md5 from "md5";

export default {
  name: "Signup",
  components: {},
  data() {
    return {
      formData: {
        phone: "",
        code: "",
        password: "",
        repeatPassword: "",
        agreement: false
      },
      code: {
        type: "code",
        iscodeText: "获取验证码"
      },
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 6, max: 6, message: "验证码为6位", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ],
        repeatPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur"
          },
          { validator: this.validatePass, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //获取验证码
    getCode(formName) {
      var _this = this;

      _this.$refs[formName].validateField(["phone"], function(t) {
        if (t == "") {
          _this.code.type = "codeing";
          var formdata = new FormData();
          formdata.append("phone", _this.formData.phone);
          axios
            .post("Register_v1/checkPhoneAndSendSMS", formdata)
            .then(function(r) {
              _this.code.type = "iscode";
              if (r.error == 0) {
                (function time(num) {
                  num--;
                  _this.code.iscodeText = num + " 秒后重新获取";
                  setTimeout(function() {
                    if (num > 0) {
                      time(num);
                    } else {
                      _this.code.type = "code";
                      _this.code.iscodeText = "获取验证码";
                    }
                  }, 1000);
                })(60);
              } else {
                _this.code.type = "code";
                _this.$message({
                  message: r.message,
                  type: "error"
                });
              }
            })
            .catch(function() {
              _this.code.type = "code";
              _this.$message({
                message: "网络错误",
                type: "error"
              });
            });
        }
      });
    },
    //提交注册信息
    submitForm(formName) {
      var _this = this;
      if (!this.formData.agreement) {
        this.$message({
          message: "请同意协议后再注册",
          type: "error"
        });
      } else {
        this.$refs[formName].validate(valid => {
          if (valid) {
            var password = md5(this.formData.password);
            var repeatPassword = md5(this.formData.repeatPassword);
            var formdata = new FormData();

            formdata.append("username", this.formData.phone);
            // formdata.append("code", this.formData.code);
            formdata.append("password", password);
            formdata.append("repeatPassword", repeatPassword);

            axios
              .post("user/registerByPhone", formdata)
              .then(function(r) {
                if (r.error == 0) {
                  _this.$message({
                    message: "注册成功，请登录",
                    type: "success"
                  });
                  _this.$router.push({ name: "登录" });
                } else {
                  console.log(r);
                  _this.$message({
                    message: r.message,
                    type: "error"
                  });
                }
              })
              .catch(function(error) {
                console.log(error);
              });
          } else {
            return false;
          }
        });
      }
    },
    //表单验证
    validatePass(rule, value, callback) {
      if (value !== this.formData.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    }
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
  color: rgba(102, 177, 255, 1);
}

.el-form {
  width: 300px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  border: 1px rgba(255, 255, 255, 0.6) solid;
}

.loginBtn {
  width: 100%;
}

.linkBtn {
  display: flex;
  justify-content: space-between;
}
</style>
<style>
.el-input-group__append {
  background-color: rgba(102, 177, 255, 1);
  color: white;
  border: 1px solid rgba(102, 177, 255, 1);
}

.el-form-item__label {
  padding: 0;
}
</style>
