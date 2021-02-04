<template>
  <div class="search-container">
    <!-- 在van-search外层添加form 且action不为空 可在ios中显示搜索按钮 -->
    <form action="/">
      <van-search
        background="#3296fa"
        v-model="keyword"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch(keyword)"
        @focus="isShowResult = false"
        @cancel="$router.back()"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result :keyword="keyword" v-if="isShowResult"></search-result>
    <!-- 搜索结果 -->

    <!-- 联想建议 -->
    <search-suggestion
      @searchSuggestion="onSearch"
      :keyword="keyword"
      v-else-if="keyword"
    ></search-suggestion>
    <!-- 联想建议 -->

    <!-- 历史记录 -->
<!--     这里的$event就是传过来的值 []-->
    <search-history
      v-else
       @searchHistoryFn="onSearch"
       @updateHistory='searchHistoryList = $event'
      :searchHistoryList="searchHistoryList"
    ></search-history>
    <!-- 历史记录 -->
  </div>
</template>

<script type="text/ecmascript-6">
import SearchSuggestion from './components/searchSuggestion'
import SearchHistory from './components/searchHistory'
import SearchResult from './components/searchResult'
import { getItem, setItem } from '@/utils/storage'
import { getUserSearchHistories } from '@/api/user'
export default {
  name: 'searchIndex',
  data () {
    return {
      keyword: '',
      isShowResult: false,
      searchHistoryList: []
    }
  },
  props: {

  },
  watch: {
    // 监听搜索记录的变化 存储到本地
    searchHistoryList () {
      setItem('searchHistoryList', this.searchHistoryList)
    }
  },
  methods: {
    onSearch (val) {
      this.keyword = val
      // 判断 存在相同的记录的话 就先删除 然后在第一个的位置添加
      const index = this.searchHistoryList.indexOf(val)
      if (index !== -1) {
        this.searchHistoryList.splice(index, 1)
      }
      this.searchHistoryList.unshift(val)
      this.isShowResult = true
    },
    async mergeHistories () {
      // 合并用户的历史和本地的历史记录 然后去重
      let localHistories = getItem('searchHistoryList') || []
      if (this.user) {
        const { data } = await getUserSearchHistories()
        // localHistories = localHistories.concat(data.results)
        localHistories = [...localHistories, ...data.result]
      }
      this.searchHistoryList = Array.from(new Set(localHistories))
      // this.searchHistoryList = [...new Set(localHistories)]
    }
  },
  computed: {
  },
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult
  },
  created () {
    this.mergeHistories()
  }
}
</script>

<style scoped lang = 'less'>
.search-container {
  height: 100%;
  background: #fff;
  .van-search {
    .van-search__action {
      color: #fff;
    }
  }
}
</style>
