<template>
  <!-- 已登录 -->
  <div class="my-container">
    <div class="logged-header header" v-if="$store.state.user">
      <div class="base-info">
        <div class="left">
          <van-image
            fit="cover"
            round
            :src="userInfo.photo"
            class="loginImg"
          />
          <span class="nickname">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button round size="mini" class="edit-info">编辑资料 </van-button>
        </div>
      </div>
      <!-- 用户信息 -->
      <div class="user-info">
        <div class="info-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="info-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="info-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="info-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 已登录 -->

    <!-- 未登录头部 -->
    <div class="login-header header" v-else>
      <img src="~@/assets/mobile.png" class="loginImg" />
      <span class="text" @click="logOnBtn('login')">登录 / 注册</span>
    </div>
    <!-- 已登录头部 -->
    <!-- 宫格 -->
    <div class="grid-nav">
      <van-grid :column-num="2" clickable>
        <van-grid-item text="收藏" class="grid-item">
          <i slot="icon" class="toutiao toutiao-shoucang"></i>
          <span slot="text">收藏</span>
        </van-grid-item>
        <van-grid-item text="历史" class="grid-item">
          <i slot="icon" class="toutiao toutiao-lishi"></i>
          <span slot="text">历史</span>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 单元格导航 -->
    <div class="cell-nav">
      <van-cell-group>
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </van-cell-group>
    </div>

    <!-- 退出登录 -->
    <div class="log-out" v-if="$store.state.user">
      <van-button type="default" @click="logOutBtn" class="log-out-btn"
        >退出登录</van-button
      >
    </div>
    <!-- 退出登录 -->
  </div>
</template>

<script>
import { myInfoAPI } from "@/api";
export default {
  name: "myPage",
  data() {
    return {
      userInfo: "", //用户自己的信息
    };
  },
  methods: {
    // 跳转到登录页面
    logOnBtn(targetName) {
      this.$router.push({
        name: targetName,
      });
    },
    // 退出登录
    logOutBtn() {
      this.$dialog
        .confirm({
          message: "确认退出？",
        })
        .then(() => {
          // 清除登录状态
          this.$store.commit("setUser", null);
        })
        .catch(() => {
          console.log("取消退出");
        });
    },
    //获取自己的信息
    async myInfo() {
      try {
        const { data } = await myInfoAPI();
        this.userInfo = data.data;
      } catch (err) {
        if (err.response.status === 404) {
          this.$toast.fail("用户认证失败，请稍后再试", err.message);
        } else {
          this.$toast.fail("请稍后再试", err.message);
        }
      }
    },
  },
  created() {
    // 获取用户自己的信息
    // 初始化时，如果用户已登录则获取用户自己的信息
    if (this.$store.state.user) {
      this.myInfo();
    }
  },
};
</script>

<style scoped lang='less'>
.my-container {
  .header {
    height: 366px;
    background: url(~@/assets/banner.png);
    background-size: cover;
    box-sizing: border-box;
  }
  .login-header {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    span {
      font-size: 28px;
      color: #fff;
      letter-spacing: 2px;
    }
  }
  .loginImg {
    width: 132px;
    height: 132px;
  }
  .logged-header {
    justify-content: left;
    flex-direction: row;
    .base-info {
      padding: 80px 32px 30px 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        align-items: center;
        display: flex;
        .nickname {
          margin-left: 30px;
          font-size: 30px;
          color: #fff;
        }
      }
      .right {
        .edit-info {
          color: #666;
          font-size: 20px;
          font-style: normal;
          width: 116px;
          height: 33px;
        }
      }
    }

    .user-info {
      height: 120px;
      display: flex;
      background-color: #3f9cfa;
      justify-content: space-around;
      align-items: center;
      color: #fff;
      .info-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }

  .grid-nav {
    .grid-item {
      height: 141px;
    }
    i.toutiao {
      color: #eb5253;
      font-size: 45px;
    }
    span {
      font-size: 28px;
      color: #333;
    }
  }

  .log-out {
    text-align: center;
    .log-out-btn {
      width: 100%;
      height: 104px;
      color: #d86262;
      font-size: 30px;
    }
  }
}
</style>