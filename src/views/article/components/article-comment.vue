<template>
  <div class="article-comment">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error="error"
      error-text="加载失败！请稍后再试"
    >
      <CommentItem
        v-for="(item, index) in commentList"
        :key="index"
        :commentItem="item"
      />
      <!-- <van-cell
        v-for="(item, index) in commentList"
        :key="index"
        :title="item.content"
      /> -->
    </van-list>
    <!-- 评论列表 -->
    <!-- 发布评论 -->
    <!-- 发布评论 -->
  </div>
</template>

<script>
import { getCommentAPI } from "@/api";
import CommentItem from "./comment-item.vue";
import JSONBig from "json-bigint";
export default {
  name: "ArticleCommemt",
  components: {
    CommentItem,
  },
  data() {
    return {
      loading: false,
      finished: false,
      offset: null, //评论数据偏移量
      // commentList: [], //评论列表
      error: false, //加载失败提示
    };
  },
  props: {
    articleId: {
      type: [Number, Object, String],
      required: true,
    },
    commentList: {
      trpe: [Object, String],
      default: () => [],
    },
  },
  created() {
    this.onLoad();
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getCommentAPI({
          type: "a",
          source: JSONBig.stringify(this.articleId),
          offset: this.offset,
          limit: 10,
        });
        const { results } = data.data;
        // 将评论数据传递给父组件
        this.$emit("onload-success", data);
        this.commentList.push(...results);
        this.loading = false;
        if (results.length) {
          // 有数据
          this.offset = data.data.last_id;
        } else {
          // 无数据
          this.finished = true;
        }
      } catch (err) {
        this.error = true;
      }
    },
  },
};
</script>

<style>
</style>