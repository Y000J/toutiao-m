<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ArticleItem  :list='list'/>
      <!-- <van-cell v-for="item in list" :key="item.art_id" :title="item.title" /> -->
    </van-list>
  </div>
</template>

<script>
import { searchResultAPI } from "@/api";
import ArticleItem from "@/components/article-item";
export default {
  name: "SearchResult",
  components: {
    ArticleItem,
  },
  props: {
    // 搜索关键字
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [], //结果列表
      loading: false,
      finished: false,
      page: 1,
      per_page: 10,
    };
  },
  methods: {
    // 获取搜索结果
    async onLoad() {
      try {
        const { data } = await searchResultAPI({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText,
        });
        this.list.push(...data.data.results);

        this.loading = false;
        // 判断是否还有数据，
        if (data.data.results.length) {
          this.page++;
        } else {
          this.finished = true;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
</style>