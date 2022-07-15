<template>
  <div class="reply-popup">
    <!-- 导航栏 -->
    <van-nav-bar :title="`${commentIfo.reply_count}条回复`" class="nav-bar">
      <van-icon slot="left" name="cross" />
    </van-nav-bar>
    <!-- 导航栏 -->
    <div class="repyl-list">
      <!-- 当前评论项 -->
      <CommentItem :commentItem="commentIfo" :isShow="false" />
      <!-- 当前评论项 -->

      <van-divider content-position="left">全部评论</van-divider>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="已加载全部评论"
        @load="onLoad"
      >
        <!-- 当前评论 -->

        <CommentItem
          :commentItem="item"
          v-for="(item, index) in replyList"
          :key="index"
          :isShow="false"
        />
        <!-- /当前评论 -->
      </van-list>
    </div>

    <div class="input">
      <van-button round size="small" class="reply-post" @click="replyBtn"
        >回复评论</van-button
      >
    </div>
  </div>
</template>

<script>
import CommentPost from "./comment-post.vue";
import { getCommentAPI } from "@/api";
import CommentItem from "./comment-item.vue";
export default {
  name: "ReplyComment",
  components: {
    CommentItem,
    CommentPost,
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
    };
  },
  model: {
    value: "replyList",
    event: "replyList",
  },
  props: {

    replyList: {
      type: [Object, String, Array],
      default: () => [],
    },
    commentIfo: {
      //当前评论项信息
      type: [Object],
      required: true,
    },
    articleId: {
      //文章ID
      type: [Number, Object, String],
      required: true,
    },
    isReply: {
      type: [Boolean, String],
      required: true,
    },
  },
  created() {},
  methods: {
    async onLoad() {
      try {
        console.log(123456);
        // 发起请求
        const { data } = await getCommentAPI({
          type: "c",
          source: this.commentIfo.com_id.toString(),
          offset: this.offset,
          limit: 10,
        });
        const { results } = data.data;
        console.log(data);
        this.replyList.push(...results);
        if (results.length) {
          // 有数据
          this.offset = data.data.last_id;
        } else {
          // 无数据
          this.finished = true;
        }
      } catch (err) {
        console.log(err);
      }
      this.loading = false;
    },
    replyBtn() {
      this.$emit("isShow", true);
    },
  },
};
</script >

<style scoped lang='less'>
.reply-popup {
  position: relative;
  .nav-bar {
    height: 92px;
  }
  .repyl-list {
    position: fixed;
    top: 496px;
    bottom: 88px;
    left: 0;
    right: 0;
    overflow-y: auto;
  }
  .input {
    height: 88px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .reply-post {
      width: 60%;
    }
  }
}
</style>