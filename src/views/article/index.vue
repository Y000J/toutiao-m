<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      :title="articleDetails.title"
      @click-left="$router.push({ name: 'home' })"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="articleDetails.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleDetails.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleDetails.aut_photo"
          />
          <div slot="title" class="user-name">
            {{ articleDetails.aut_name }}
          </div>
          <div slot="label" class="publish-date">
            {{ articleDetails.pubdate | relativeTime }}
          </div>
          <FollowUser
            :autId="articleDetails.aut_id"
            v-model="articleDetails.is_followed"
          />
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="articleDetails.content"
          ref="content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 评论区域 -->
        <ArticleCommemt
          :articleId="articleDetails.art_id"
          :commentList="commentList"
          @onload-success="commentCount = $event.total_count"
        />
        <!-- 评论区域 -->
        <!-- 底部区域 -->
        <div class="article-bottom">
          <!-- 评论 -->
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPostShow = true"
            >写评论</van-button
          >
          <!-- 评论数量 -->
          <van-icon name="comment-o" :badge="commentCount" />
          <!-- 收藏 -->
          <van-icon
            name="star"
            @click="collectBtn"
            :class="{ collect: articleDetails.is_collected }"
          />
          <!-- 点赞 -->
          <van-icon
            name="good-job-o"
            @click="praiseBtn"
            :class="{ praise: articleDetails.attitude === 1 }"
          />
          <!-- 转发 -->
          <van-icon name="share"></van-icon>
        </div>
        <!-- /底部区域 -->
        <!-- 评论弹出层 -->
        <van-popup v-model="isPostShow" position="bottom">
          <CommentPost
            :articleId="articleDetails.art_id"
            @postSuccess="postSuccess"
          />
        </van-popup>
        <!-- 评论弹出层 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="getartcileDetails()"
          >点击重试</van-button
        >
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
  </div>
</template>

<script>
import {
  articleDetailsAPI,
  collectArticleAPI,
  praiseAPI,
  removePraiseAPI,
  uncollectArticleAPI,
} from "@/api";
import { ImagePreview } from "vant";
import FollowUser from "@/components/follow-user";
import ArticleCommemt from "./components/article-comment.vue";
import CommentPost from "./components/comment-post.vue";
export default {
  name: "ArticleIndex",
  components: {
    FollowUser,
    ArticleCommemt,
    CommentPost,
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      articleDetails: "", //文章详情
      loading: true, //加载状态
      errStatus: 0, //失败状态码
      isfollow: null, //控制关注按钮
      commentCount: 0, //评论总数
      isPostShow: false, //是否显示评论弹出框
      commentList: [], //评论列表
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getartcileDetails();
  },

  methods: {
    // 获取文章详情
    async getartcileDetails() {
      this.loading = true;
      try {
        const { data } = await articleDetailsAPI(this.articleId);
        this.articleDetails = data.data;
        this.imgBtn();
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404;
        }
      }
      this.loading = false;
    },

    // 给图所有图片添加点击事件
    imgBtn() {
      this.$nextTick(() => {
        const imgs = this.$refs["content"].querySelectorAll("img");
        const img = [];
        imgs.forEach((element, index) => {
          img.push(element.currentSrc);
          element.addEventListener("click", () => {
            // 调用图片预览方法
            ImagePreview({
              images: img,
              closeable: true,
              startPosition: index,
            });
          });
        });
      });
    },

    // 收藏按钮
    async collectBtn() {
      try {
        // 判断是否已收藏
        if (this.articleDetails.is_collected) {
          // 已收藏   ---取消收藏
          await uncollectArticleAPI(this.articleDetails.art_id);
          this.articleDetails.is_collected = false;
        } else {
          // 未收藏   收藏
          await collectArticleAPI({
            target: this.articleDetails.art_id,
          });
          this.articleDetails.is_collected = true;
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 点赞按钮
    async praiseBtn() {
      try {
        // 判断是否已点赞
        if (this.articleDetails.attitude === 1) {
          // 已点赞   ---取消点赞
          await removePraiseAPI(this.articleDetails.art_id);
          this.articleDetails.attitude = -1;
        } else {
          // 未点赞   点赞
          await praiseAPI({
            target: this.articleDetails.art_id,
          });
          this.articleDetails.attitude = 1;
        }
      } catch (err) {
        console.log(err);
      }
      // this.getartcileDetails()
    },
    // 评论成功
    postSuccess(isShow, data, message) {
      this.isPostShow = isShow;
      data.content = message;
      console.log(data);
      this.commentList.unshift(data);
    },
  },
};
</script>

<style scoped lang="less">
@import "./github-markdown.css";

.article-container {
  .page-nav-bar {
    background-color: #ececec;
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      color: #777;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
    .collect {
      color: #3296fa !important;
    }
    .praise {
      color: red;
    }
  }
}
</style>
