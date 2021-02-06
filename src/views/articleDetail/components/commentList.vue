<template>
  <div class="comment-list">
    <!-- 组件滚动到底部时，会触发 load 事件并将 loading 设置成 true。
      此时可以发起异步操作并更新数据，数据更新完毕后，将 loading 设置成 false 即可。
      若数据已全部加载完毕，则直接将 finished 设置成 true 即可 -->
    <van-cell title="全部评论" :border="false"></van-cell>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="已经展示所有评论"
      @load="onLoad"
    >
      <comment-item
        v-for="(item, index) in commentList"
        :key="index"
        :item="item"
        @replay-click="$emit('replay-click', $event)"
      ></comment-item>
    </van-list>
  </div>
</template>

<script type="text/ecmascript-6">
import CommentItem from './commentItem'
import { getComments } from '@/api/user'
export default {
  name: '',
  data () {
    return {
      loading: false,
      finished: false,
      commentList: [],
      limit: 10,
      offset: null // 获取下一页的标识
    }
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    type: {
      type: String,
      default: 'a'
    }
  },
  methods: {
    async onLoad () {
      // 评论类型 a-对文章 c-对评论
      const params = {
        type: this.type,
        source: this.source,
        offset: this.offset,
        limit: this.limit
      }
      const { data } = await getComments(params)
      this.commentList = data.results
      if (data.results.length < this.limit) {
        this.finished = true
      }
      this.loading = false
      this.$emit('update-total-count', data.total_count)
    }
  },
  computed: {

  },
  components: {
    CommentItem
  },
  created () {
  }
}
</script>

<style scoped>
</style>
