<template>
  <div class="history-container">
    <van-cell
      title='搜索历史'
    >
      <div v-if='isDelete'>
        <span @click="$emit('updateHistory', [])">全部删除</span>
        &nbsp;&nbsp;
        <span  @click='isDelete = false'>完成</span>
      </div>
      <van-icon v-else name='delete' @click='isDelete = true'></van-icon>
    </van-cell>
    <van-cell
      :title='item'
      v-for='(item, index) in searchHistoryList'
      :key='index'
      @click='handler(index, item)'
    >
    <van-icon v-if='isDelete'  name='close'/>
    </van-cell>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: '',
  data () {
    return {
      isDelete: false
    }
  },
  props: {
    // 任何prop数据都不能重新赋值 如果要修改prop数据 让父组件修改
    searchHistoryList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    handler (index, item) {
      if (this.isDelete) {
        this.searchHistoryList.splice(index, 1)
      } else {
        this.$emit('searchHistoryFn', item)
      }
    }
  },
  computed: {

  },
  components: {

  },
  created () {
  },
  mounted () {
  }
}
</script>

<style scoped>
</style>
