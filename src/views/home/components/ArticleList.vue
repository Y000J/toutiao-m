<template>
  <div class="artcle-list">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
    >
      <template #success> </template>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem :list="list"></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '@/components/article-item'
import { articleListAPI } from "@/api";
export default {
  name: "ArticleList",
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: [Object, Number],
      required: true,
    },
  },
  data() {
    return {
      list: [], //文章列表数据
      loading: false,
      finished: false,
      timestamp: null, //请求下一页的时间戳
      isLoading: false, //控制是否加载完成
      refreshSuccessText: "", //刷新成功提示文字
    };
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await articleListAPI({
          timestamp: this.timestamp || "1556789000002",
          channel_id: this.channel.id,
          with_top: 1,
        });
        const { results } = data.data;
        // 将获取到的文章列表添加到文章列表数据中
        this.list.push(...results);
        // 本次加载的loading状态
        this.loading = false;

        // 判断是否加载完成
        if (results.length) {
          // 还有  保存上一页的时间戳
          this.timestamp = data.data.pre_timestamp;
        } else {
          // 没有  设置加载状态 不再加载
          this.finished = true;
        }
      } catch (err) {
        this.$toast("请求失败！稍后再试");
        // 出错后关闭加载效果
        this.loading = false;
      }
    },
    async onRefresh() {
      try {
        let time = Number(Date.now()) - 100304731621;
        const { data } = await articleListAPI({
          channel_id: this.channel.id,
          timestamp: String(time),
          with_top: 1,
        });
        // 将获取到的数据添加到顶部
        const { results } = data.data;
        this.list.unshift(...results);
        this.refreshSuccessText = `刷新成功！更新了${results.length}条数据`;
        // 关闭下拉的loading状态
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        this.$toast("刷新失败！");
      }
    },
  },
};
</script>

<style scoped lang='less'>
.artcle-list {
  overflow-y: auto;
  height: calc(100vh - 274px);
  }
</style>