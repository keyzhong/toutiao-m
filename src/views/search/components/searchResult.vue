<template>
  <div class="result-container">
   <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :success-duration="1000"
      @load="onLoad"
    >
      <van-cell v-for='item in resultList' :key='item.aut_id'>
        <span v-html='highlight(item.title)'></span>
      </van-cell>
    </van-list>
  </div>
</template>

<script type="text/ecmascript-6">
import { getSearchResults } from '@/api/user'
export default {
  name: '',
  data () {
    return {
      loading: false,
      finished: false,
      resultList: [],
      params: {
        page: 1,
        pre_page: 10
      }
    }
  },
  props: {
    keyword: {
      type: String,
      required: true
    }
  },
  methods: {
    async onLoad () {
      const params = Object.assign({ q: this.keyword }, this.params)
      const { data } = await getSearchResults(params)
      this.resultList.push(...data.results)
      this.loading = false
      if (data.results.length) { // 判断是否还有数据
        this.params.page++
      } else {
        this.finished = true
      }
    },
    highlight (val) {
      const reg = new RegExp(this.keyword, 'ig')
      return val.replace(reg, `<span style='color:red'>${this.keyword}</span>`)
    }
  },
  computed: {

  },
  components: {

  },
  created () {
  }
}
</script>

<style scoped lang='less'>
.result-container{
  position: fixed;
  top:54px;
  left: 0;
  right: 0;
  bottom:0;
  overflow-y: auto;
}
</style>
