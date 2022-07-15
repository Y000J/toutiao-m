<template>
  <div class="user-data">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed title="个人资料">
      <span slot="left">返回</span>
    </van-nav-bar>
    <!-- 导航栏 -->
    <!-- 资料 -->
    <van-cell-group class="user-info" :border="true">
      <van-cell title="头像" is-link class="data-item">
        <van-image
          class="user-avatar"
          slot="default"
          round
          fit="cover"
          :src="user.photo"
        />
      </van-cell>
      <van-cell
        title="昵称"
        :value="user.name"
        is-link
        class="data-item"
        @click="nickNameShow = true"
      />
      <van-cell title="介绍" value="" is-link class="data-item" />
      <van-cell
        title="性别"
        :value="user.gender ? '女' : '男'"
        is-link
        @click="genderShow = true"
        class="data-item"
      />
      <van-cell title="生日" :value="user.birthday" is-link class="data-item" />
    </van-cell-group>
    <!-- 资料 -->

    <!-- 昵称弹出层 -->
    <van-popup
      class="nick-popup"
      v-model="nickNameShow"
      position="bottom"
      duration="0.2"
      :style="{
        height: '100%',
      }"
    >
      <UserNickName v-model="nickNameShow" :user="user" />
    </van-popup>
    <!-- 昵称弹出层 -->
    <!-- 性别弹出层 -->

    <van-popup
      v-model="genderShow"
      position="bottom"
      :style="{
        height: '35%',
      }"
    >
      <UserGender v-model="genderShow" :user="user" />
    </van-popup>
    <!-- 性别弹出层 -->
  </div>
</template>

<script>
import UserNickName from "./components/user-nickName.vue";
import UserGender from "./components/user-gender.vue";
import { userDataAPI } from "@/api";
export default {
  name: "UserData",
  data() {
    return {
      user: "", //用户个人信息
      nickNameShow: false, //昵称弹出层
      genderShow: false, //性别弹出层
    };
  },

  components: {
    UserNickName,
    UserGender,
  },
  created() {
    this.userData();
  },
  methods: {
    // 获取用户个人信息
    async userData() {
      try {
        const { data } = await userDataAPI();
        this.user = data.data;
      } catch (err) {
        console.log(err);
        this.$toast.fail("数据加载失败！");
      }
    },
  },
};
</script>

<style scoped lang='less'>
.user-data {
  padding-top: 92px;
  .page-nav-bar {
    background-color: #3296fa;
    button {
      background-color: unset;
      border: unset;
    }
  }
  .user-info {
    .data-item {
      height: 100px;
      &:nth-child(3) {
        border-bottom: 16px solid #f5f7f9;
      }
    }
    .user-avatar {
      width: 45px;
      height: 45px;
    }
  }
  .nick-popup {
    background-color: #f5f7f9;
  }
}
</style>