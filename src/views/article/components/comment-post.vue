<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入评论"
      show-word-limit
    />
    <van-button class="post-btn" @click="postComment">发布</van-button>
  </div>
</template>

<script>
import { addCommentAPI } from "@/api";
export default {
  name: "CommentPost",
  components: {},
  props: {
    target: {
      type: [Object, Number, String],
      required: true,
    },
    articleId: {
      type: [Object, Number, String],
      default: () => null,
    },
  },
  data() {
    return {
      message: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 评论
    async postComment() {
      try {
        const { data } = await addCommentAPI({
          target: this.target,
          content: this.message,
          art_id: this.articleId,
        });
        // 关闭弹出框,并将添加的数据传给父组件

        this.$emit("postSuccess", false, data.data, this.message);
        this.$emit("replySuccess", false, data.data, this.message);
        this.$toast.success("评论成功！");
        this.message = "";
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>