<template>
  <div class="suggestion-container">
    <van-cell
      icon="search"
      v-for="(item, index) in suggestionList"
      :key="index"
      @click='onSearch(item)'
    >
      <span v-html="highlight(item)"></span>
    </van-cell>
  </div>
</template>

<script type="text/ecmascript-6">
import { getSuggestions } from '@/api/user'
import { debounce } from 'loadsh'

export default {
  name: '',
  data () {
    return {
      suggestionList: []
    }
  },
  props: {
    keyword: {
      type: String,
      required: true
    }
  },
  methods: {
    // 处理高亮
    highlight (val) {
      const reg = new RegExp(this.keyword, 'ig')
      return val.replace(reg, `<span style='color:red'>${this.keyword}</span>`)
    },
    // 搜索
    onSearch (item) {
      this.$emit('searchSuggestion', item)
      console.log('search')
    }
  },
  computed: {

  },
  watch: {
    keyword: {
      handler: debounce(async function (newval) {
        // 请求数据
        const { data } = await getSuggestions({ q: newval })
        // 展示数据
        this.suggestionList = data.options
      }, 500),
      // 监听之后立即调用 防止watch因为组件未渲染不监听第一次
      immediate: true
    }
  },
  components: {

  },
  created () {
  }
}
</script>

<style scoped lang='less'>
.suggestion-container {
}
</style>
