<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="commentItem.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ commentItem.aut_name }}</div>
      <van-button
        class="like-btn"
        icon="good-job-o"
        :class="{ liked: commentItem.is_liking }"
        @click="likeBtn"
        >{{ commentItem.like_count || "赞" }}</van-button
      >
    </div>

    <div slot="label">
      <p class="comment-content">{{ commentItem.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{
          commentItem.pubdate | relativeTime
        }}</span>
        <van-button class="reply-btn" round
          >回复 {{ commentItem.reply_count }}</van-button
        >
      </div>
    </div>
  </van-cell>
</template>

<script>
import { commendCommentAPI, delCommendCommentAPI } from "@/api";
export default {
  name: "CommentItem",
  components: {},
  props: {
    commentItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 点赞功能
    async likeBtn() {
      try {
        // 判断是否点赞
        if (this.commentItem.is_liking) {
          // 已点赞  取消
          await delCommendCommentAPI(this.commentItem.com_id);
          this.commentItem.like_count--;
        } else {
          // 未点赞  赞
          await commendCommentAPI({
            target: this.commentItem.com_id,
          });
          this.commentItem.like_count++;
        }

        this.commentItem.is_liking = !this.commentItem.is_liking;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 18px;
    color: #222;
    white-space: nowrap;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
  }
  .liked {
    color: red;
  }
}
</style>