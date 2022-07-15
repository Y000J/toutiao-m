<template>
  <div class="user-niacName">
    <div class="head">
      <van-button @click="cancel">取消</van-button>
      <span>昵称</span>
      <van-button @click="editUserNickName">确定</van-button>
    </div>
    <div class="input">
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="10"
        placeholder="请输入昵称"
        show-word-limit
        clearable
      />
    </div>
  </div>
</template>

<script>
import { editUserDataAPI } from "@/api";
export default {
  name: "UserNickName",
  data() {
    return {
      message: "", //输入框内容
    };
  },
  model: {
    prop: "nickNameShow",
    event: "cancelShow",
  },
  props: {
    nickNameShow: {
      type: Boolean,
      required: true,
    },
    user: {
      type: [Object, String, Array],
      required: true,
    },
  },
  created() {
    this.message = this.user.name;
  },
  methods: {
    // 点击确定发起请求修改昵称
    async editUserNickName() {
      try {
        const { data } = await editUserDataAPI({
          name: this.message,
        });
        this.$toast.success("修改成功！");
        this.user.name = data.data.name;
        this.$emit("cancelShow", !this.nickNameShow);
      } catch (err) {
        console.log(err);
        this.$toast.fail("修改失败，请稍后再试！");
      }
    },
    // 点击取消关闭弹出层
    cancel() {
      this.$emit("cancelShow", !this.nickNameShow);
    },
  },
};
</script>

<style scoped lang=less>
.user-niacName {
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    margin-bottom: 16px;
    button {
      width: 200px;
      color: #2778ff;
      border: unset;
    }
  }
}
</style>