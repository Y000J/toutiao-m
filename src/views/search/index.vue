<template>
  <div class="search">
    <!-- 搜索框 -->
    <form action="/" slot="title">
      <van-search
        class="ipt"
        v-model="searchText"
        background="#3296fa"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <!-- 搜索框 -->

    <!-- 搜索结果 -->
    <SearchResult v-if="isResultShow" :search-text="searchText" />
    <!-- 搜索结果 -->

    <!-- 联想建议 -->
    <SearchSuggestion
      v-else-if="searchText"
      :search-text="searchText"
      @searchText="editText"
    />
    <!-- 联想建议 -->

    <!-- 搜索历史 -->
    <SearchHistory
      v-else
      :historyItem="historyItem"
      @allDelete="historyItem = []"
      @onSearchs="onSearch"
    />
    <!-- 搜索历史 -->
  </div>
</template>

<script>
import SearchHistory from "./compoennets/search-history.vue";
import SearchSuggestion from "./compoennets/search-suggestion.vue";
import SearchResult from "./compoennets/search-result.vue";
import { setItem, getItem } from "@/utils/storage";
// import { getHistoryAPI } from "@/api";
export default {
  name: "search",
  data() {
    return {
      searchText: "", //搜索文字
      isResultShow: false, //是否显示搜索结果栏
      historyItem: getItem("search-history") || [], //本地历史记录
    };
  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion,
  },
  methods: {
    onSearch(val) {
      this.searchText = val;
      this.isResultShow = true;
      const index = this.historyItem.indexOf(val);
      if (index === -1) {
        this.historyItem.unshift(val);
      } else {
        this.historyItem.splice(index, 1);
        this.historyItem.unshift(val);
      }
    },
    // 取消按钮
    onCancel() {
      this.$router.push({
        name: "home",
      });
    },
    editText(val) {
      this.searchText = val;
      // 点击之后显示搜索框
      this.isResultShow = true;
    },
    // 获取搜索历史
  },
  watch: {
    searchText: {
      immediate: true,
      handler(newval) {
        if (newval.length === 0) {
          this.isResultShow = false;
        }
      },
    },
    historyItem: {
      handler(newval) {
        setItem("search-history", newval);
      },
    },
  },
};
</script>

<style scoped lang='less'>
.ipt {
  padding: 23px 28px 17px 34px;
  .van-search__action {
    padding: 0 0 0 33px;
    height: 56px;
  }
  .van-search__action:hover {
    background-color: unset;
  }
}
</style>