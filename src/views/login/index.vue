<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="登录"
      left-arrow
      @click-left="backBtn"
    />
    <!-- 导航栏 -->
    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        v-model="user.mobile"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        name="code"
        placeholder="验证码"
        v-model="user.code"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <!-- 倒计时 -->
          <van-count-down
            :time="time"
            format="剩余 ss s"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
            class="countDown"
          />
          <!-- send-sms-btn van-button van-button--primary van-button--small -->
          <!-- 验证码 -->
          <van-button
            v-else
            class="send-sms-btn"
            size="small"
            type="primary"
            native-type="button"
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button block type="info" class="login-btn" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
    <!-- 登录表单 -->
  </div>
</template>

<script>
import { loginAPI, sendSmsAPI } from "@/api";
export default {
  name: "loginPage",
  data() {
    return {
      time: 1000 * 60,
      isCountDownShow: false,
      user: {
        mobile: "",
        code: "",
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: "手机号格式错误",
          },
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
    };
  },
  methods: {
    // 获取验证码
    async onSendSms() {
      // 验证手机号
      try {
        await this.$refs.loginForm.validate("mobile");
      } catch (err) {
        return this.$toast("验证失败" + err.message);
      }
      // 验证通过，倒计时
      this.isCountDownShow = true;

      try {
        await sendSmsAPI(this.user.mobile);
        this.$toast("发送成功！");
      } catch (err) {
        this.isCountDownShow = false;
        this.$toast("发送失败，请稍后再试");
      }
    },

    // 登录按钮
    async onSubmit() {
      //登录提示
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0, //持续时间
      });
      // 提交表单请求登录
      try {
        const { data } = await loginAPI(this.user);
        this.$store.commit("setUser", data.data);
        this.$toast.success("登录成功");
        // 登录成功后跳转回我的页面
        this.$router.push({
          name:'my'
        })
      } catch (err) {
        if (err.response.status === 400) {
         
        } else {
          this.$toast.fail("错误，请稍后再试" + err.message);
        }
      }
    },
    // 返回按钮
    backBtn() {
      history.back();
    },
  },
};
</script>

<style scoped lang='less'>
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .countDown {
    margin-top: 12px;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    background-color: #ededed;
    border-radius: 23px;
    font-size: 22px;
    border: none;
    color: #666666;
    line-height: 36px;
  }

  .van-count-down {
    width: 152px;
    height: 46px;
    background-color: pink;
    border: none;
    border-color: #000;
    border-radius: 24px;
    text-align: center;
    line-height: 46px;
    font-size: 24px;
    color: #323233;
    background-color: #ededed;
  }
  .login-btn-wrap {
    margin: 53px 28px;
    .login-btn {
      background-color: #6db4fb;
      border-radius: 10px;
      border: none;
    }
  }
}
</style>