/*
 * @Author: coldlike 531595924@qq.com 
 * @Date: 2020-07-14 09:12:02 
 * @Last Modified by: coldlike 531595924@qq.com
 * @Last Modified time: 2020-08-10 14:19:35
 */

<!-- 模块 -->
<template>
  <!-- 模块根目录 -->
  <div class="friends">
    <div class="friends-left">
      <displayList
        :list-data="friendsList"
        :activity-id="activityId"
        @clickitem="clickitem"
      />
      <el-button
        type="primary"
        @click="addFriends.visible = true"
      >
        加好友
      </el-button>
    </div>
    <chatWindow
      v-if="activityId && activityId != ''"
      :activity-data="activityData"
    />
    <el-dialog
      width="500px"
      title="添加好友"
      center
      :close-on-click-modal="false"
      :visible.sync="addFriends.visible"
      @closed="closeDialog"
    >
      <el-input
        v-model="addFriends.input"
        v-loading="searchLoading"
        placeholder="请输入 昵称 / 姓名 / 手机号"
        class="input-with-select"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="searchUser"
        />
      </el-input>
      <el-radio-group
        v-if="searchUserList.length != 0"
        v-model="searUserSelect"
        class="searchUserList"
      >
        <el-radio-button
          v-for="i in searchUserList"
          :key="i._id"
          :label="i._id"
          class="searchUserItem"
        >
          <div class="searchUserPortrait">
            <img :src="i.userPortrait">
          </div>
          <p class="searchUserTitle">
            {{ i.nickname }}
          </p>
        </el-radio-button>
      </el-radio-group>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="small"
          @click="addFriends.visible = false"
        >
          取 消
        </el-button>
        <el-button
          type="primary"
          size="small"
          :disabled="!(searUserSelect && searUserSelect != '')"
          @click="innerDialog.visible = true"
        >
          确 定
        </el-button>
      </div>
      <el-dialog
        width="30%"
        :visible.sync="innerDialog.visible"
        append-to-body
        center
      >
        <el-input
          v-model="innerDialog.input"
          placeholder="请输入备注消息（可选）"
        />
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            size="small"
            @click="innerDialog.visible = false"
          >
            取 消
          </el-button>
          <el-button
            type="primary"
            size="small"
            :loading="addBtnLoading"
            @click="addFriendAxios"
          >
            发 送
          </el-button>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>
<!-- 模块脚本 -->
<script>
//载入插件
import displayList from "../../components/displayList";
import chatWindow from "../../components/chatWindow";
export default {
  name: "Friends", // 模块name
  components: {
    displayList,
    chatWindow,
  },
  data() {
    // 模块数据，必须使用 return
    return {
      activityId: "",
      addFriends: {
        visible: false,
        input: "",
      },
      innerDialog: {
        visible: false,
        input: "",
      },
      searchLoading: false,
      searchUserList: [],
      searUserSelect: "",
      addBtnLoading: false,
    };
  },

  //计算属性
  computed: {
    friendsList(){
      return this.$store.state.friendsList;
    },
    activityData() {
      return this.friendsList.find((i) => i._id == this.activityId);
    },
    friendId(){
      return this.$route
    }
  },

  //监视属性
  watch: {
  },

  //生命周期开始
  //页面初始化完成后执行
  mounted() {
    if(this.$route.params){
      this.activityId = this.$route.params.friendId
    }
  },
  //方法属性
  methods: {
    getFriends() {
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
    clickitem(id) {
      this.activityId = id;
    },
    searchUser() {
      let text = this.addFriends.input;
      if (text == "") {
        this.$message.error("请输入 昵称 / 姓名 / 手机号");
        return false;
      } else {
        this.searchLoading = true;
        axios
          .get("user/searchUsers", {
            params: {
              text: text,
            },
          })
          .then((res) => {
            this.searchLoading = false;
            if (res.error == 0) {
              this.searchUserList = res.data;
            } else {
              this.$message.warning(res.message);
            }
          })
          .catch((err) => {
            this.searchLoading = false;
            this.$message.error("搜索错误，请重试");
            console.log(err);
          });
      }
    },
    closeDialog() {
      this.searchUserList = [];
      this.searUserSelect = "";
      this.searchLoading = false;
      this.addFriends.input = "";
    },
    addFriendAxios() {
      if (this.searUserSelect && this.searUserSelect != "") {
        this.addBtnLoading = true;
        let formData = new FormData();
        formData.append("userid", this.searUserSelect);
        formData.append("text", this.innerDialog.input);
        axios
          .post("user/addFriends", formData)
          .then((res) => {
            this.addBtnLoading = false;
            if (res.error == 0) {
              this.$message.success(res.message);
              this.innerDialog.visible = false;
              this.getFriends();
            } else {
              this.$message.error(res.message);
            }
          })
          .catch((err) => {
            this.addBtnLoading = false;
            console.log(err);
            this.$message.error("添加好友失败，请重试");
          });
      } else {
        this.$message.error("系统错误请重试");
        return false;
      }
    },
  },
};
</script>
<style scoped>
/*私有样式*/
.friends {
  width: 100%;
  height: 100%;
  flex-direction: row;
}

.friends-left {
  display: flex;
  flex-direction: column;
}

.displayList {
  flex: 1;
  margin-bottom: 10px;
}

.searchUserList {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  justify-content: space-between;
}

.searchUserItem {
  width: 210px;
  padding: 5px;
}

.searchUserItem >>> .el-radio-button__inner {
  display: flex;
  align-items: center;
  padding: 5px;
  border-left: 1px solid #dcdfe6;
  border-radius: 4px;
  box-shadow: none !important;
}

.searchUserItem.is-active >>> .el-radio-button__inner {
  border-left: 1px solid #409eff;
}

.searchUserPortrait {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  overflow: hidden;
  margin-right: 10px;
}

.searchUserPortrait > img {
  width: 100%;
  height: 100%;
}
</style>
<style>
/*公共样式*/
</style>
