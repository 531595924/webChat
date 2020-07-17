/*
 * @Author: coldlike 531595924@qq.com 
 * @Date: 2020-06-30 11:37:51 
 * @Last Modified by: coldlike 531595924@qq.com
 * @Last Modified time: 2020-07-15 17:20:30
 */
<!-- 模块 -->
<template>
  <!-- 模块根目录 -->
  <div
    v-loading="loading"
    class="user"
  >
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
    >
      <el-form-item label="头像">
        <el-upload
          v-loading="setPortraitLoading"
          class="head-portrait"
          action="http://localhost:5000/user/setUserPortrait"
          :headers="upDataHeaders"
          name="userPortrait"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-error="handleAvatarError"
          :before-upload="beforeAvatarUpload"
          :on-progress="handleAvatarProgress"
        >
          <img
            v-if="userInfo.userPortrait"
            :src="userInfo.userPortrait"
            class="avatar"
          >
          <img
            v-else
            class="avatar"
            src="../../assets/default_protrait.jpg"
          >
        </el-upload>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="form.nickname" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select
          v-model="form.sex"
          placeholder="请选择性别"
        >
          <el-option
            label="无"
            :value="0"
          />
          <el-option
            label="男"
            :value="1"
          />
          <el-option
            label="女"
            :value="2"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="sumbit"
        >
          保存
        </el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<!-- 模块脚本 -->
<script>
//载入插件
export default {
  name: "User", // 模块name
  data() {
    // 模块数据，必须使用 return
    return {
      loading: false,
      setPortraitLoading: false,
      form: {
        nickname: "",
        sex: undefined
      }
    };
  },

  //计算属性
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    upDataHeaders() {
      return { Authorization: this.$store.state.token };
    }
  },

  //监视属性
  watch: {},

  //生命周期开始
  //页面初始化完成后执行
  mounted() {
    this.form.nickname = this.userInfo.nickname;
    this.form.sex = this.userInfo.sex;
  },

  //方法属性
  methods: {
    handleAvatarSuccess(res) {
      this.setPortraitLoading = false;
      if(res.error == 0){
        this.$message.success("上传头像成功");
        this.$store.commit("setUserPortrait", res.data.url);
      } else {
        this.$message.error(res.message);
      }
    },
    handleAvatarError(err) {
      this.setPortraitLoading = false;
      this.$message.error("上传头像失败，请重试");
      console.log(err)
    },
    handleAvatarProgress() {
      this.setPortraitLoading = true;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    sumbit(){
      let formData = new FormData();
      formData.append("nickname" , this.form.nickname)
      formData.append("sex" , this.form.sex)
      
      axios.post("user/setUserInfo", formData)
        .then(res => {
          if(res.error == 0){
            this.$store.commit("userInfo", res.data);
            this.$message.success("用户信息设置成功");
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(err => {
          console.log(err)
          this.$message.error("用户信息设置错误，请重试");
        })
    }
  }
};
</script>
<style scoped>
/*私有样式*/
.head-portrait >>> .el-upload {
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.head-portrait >>> .el-upload:hover {
  border-color: #409eff;
}

.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>
<style>
/*公共样式*/
</style>
