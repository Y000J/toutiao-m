<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(item, index) in suggestList"
      :key="index"
      icon="search "
      clickable
      @click="suggestBtn(item, searchText)"
    >
      <span slot="title" v-html="highLight(item, searchText)"></span>
    </van-cell>
  </div>
</template>

<script>
import { searchSuggestAPI } from "@/api";
import { debounce } from "loadsh";
export default {
  naem: "SearchSuggestion",
  props: {
    searchText: {
      //输入的文字
      type: String,
      required: true,
    },
  },
  data() {
    return {
      suggestList: [], //联想建议列表
    };
  },
  methods: {
    // 获取联想建议列表
    async getSuggestList() {
      try {
        const { data } = await searchSuggestAPI({
          q: this.searchText,
        });
        this.suggestList = data.data.options;
      } catch (err) {
        console.log(err);
      }
    },

    suggestBtn(val) {
      this.$emit("searchText", val);
    },

    // 高亮文字
    highLight(source, keyword) {
      const reg = new RegExp(keyword, "gi");
      return source.replace(
        reg,
        `<span style='color:#3296fa' >${keyword}</span>`
      );
    },
  },
  watch: {
    searchText: {
      handler: debounce(function () {
        //防抖
        this.getSuggestList(this.searchText);
      }, 800),
      // 立即执行
      immediate: true,
    },
  },
};
</script>

<style>
</style>