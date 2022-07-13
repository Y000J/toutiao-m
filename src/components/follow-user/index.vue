<template>
  <van-button
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    :loading="isloading"
    size="small"
    icon="plus"
    v-if="!isFollowed"
    @click="followBtn"
    >关注</van-button
  >
  <van-button
    class="follow-btn"
    round
    :loading="isloading"
    size="small"
    v-else
    @click="unfollowBtn"
    >已关注</van-button
  >
</template>

<script>
import { unfollowUserAPI, followUserAPI } from "@/api";
export default {
  name: "FollowUser",
  model: {
    prop: "isFollowed",
    event: "updata-is_followed",
  },
  props: {
    autId: {
      type: [Object, Number, String],
      required: true,
    },
    isFollowed: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isloading: false, //关注按钮加载状态
    };
  },
  methods: {
    // 关注用户按钮
    async followBtn() {
      this.isloading = true;
      try {
        await followUserAPI({
          target: this.autId,
        });
        this.$emit("updata-is_followed", !this.isFollowed);
      } catch (err) {
        if (err.response.status === 410) {
          this.$toast("自己无法关注自己");
        } else {
          this.$toast("操作失败！请稍后再试");
        }
      }
      this.isloading = false;
    },
    // 取消关注用户
    async unfollowBtn() {
      this.isloading = true;
      try {
        await unfollowUserAPI(this.autId);
        this.$emit("updata-is_followed", !this.isFollowed);
      } catch (err) {
        console.log(err);
      }
      this.isloading = false;
    },
  },
};
</script>

<style>
</style>